
import { Injectable } from "@nestjs/common";
import * as path from "node:path";
import * as fs from "node:fs";
import * as pdf from "html-pdf";
import { Response } from "express";
import { MARKS_ITEM_HTML_TEMPLATE } from "../constants";
import { ReadableBufferOnResponse } from "../../../common/classes/ReadableBufferOnResponse";
import { buildBase64Url } from "../../../common/utils/buildBase64Url";
import { TableCostService } from "../services_common/table.cost.service";
import { optionsPdf } from "../constants/options_pdf";
import { TableRiskService } from "../services_common/table.risk.service";
import { ApolloService } from "../../apollo_client/apollo.service";
import { IRequestData } from "../pdf.main.service";
import { GetEntitiesService } from "../services_common/getEntities.service";
import { GetExtendedProjectsService } from "../services_common/getExtendedProjects.service";
import { HTTP_ERROR_DICTIONARY } from "../../../common/constants/httpErrorDictionary";
import { getImageSizeBuffer } from "../../../common/utils/getImageSizeFromBuffer";
import { calculateSourceScale } from "../../../common/utils/calculateSourceScale";

type TViewImg = "AreaView" | "LandView" | "ParkView";

@Injectable()
export class PdfBaseService {
  constructor(
    private tableCostService: TableCostService,
    private tableRiskService: TableRiskService,
    private apolloService: ApolloService,
    private getEntitiesService: GetEntitiesService,
    private getExtendedProjectsService: GetExtendedProjectsService
  ) {}

  private assetsTemplateDirUrl = "./assets/templates/base";

  private buildQueryData(extendProjects) {
    try {
      const namesProps = new Set(["AreaView", "LandView", "ParkView"]);
      const actualProps: Record<TViewImg, string> =
        extendProjects?.data?.getExtendedProject?.generations?.reduce?.((acc, item) => {
          const props = item.properties.filter((prop) => namesProps.has(prop.name));
          props.forEach((p) => {
            acc[p.name] = p.value;
          });
          return acc;
        }, []) || [];

      const generationsData =
        extendProjects?.data?.getExtendedProject?.generations?.reduce?.(
          (acc, item) => {
            if (item.variants) {
              const [collisions, grand_summary, entities, properties] = item.variants
                .map((v) => [v.collisions, v.grand_summary, v.entities, v.properties])
                .flat();

              acc.collisions = [...acc.collisions, ...(collisions || [])];
              acc.grand_summary = [...acc.grand_summary, ...(grand_summary || [])];
              acc.entities = [...acc.entities, ...(entities || [])];
              acc.properties = [...acc.properties, ...(properties || [])];
            }
            return acc;
          },
          {
            grand_summary: [],
            collisions: [],
            entities: [],
            properties: [],
          }
        ) || [];
      return { actualProps, generationsData };
    } catch (err) {
      console.log("err", err);
      throw { message: `Incorrect data in the generations section, reason: ${JSON.stringify(err)}` };
    }
  }

  private async buildImage(src: string) {
    const currentSrc = await buildBase64Url(src);
    const { width, height } = getImageSizeBuffer(src);

    const { currentHeight, currentWidth } = calculateSourceScale({
      widthCurrent: 320,
      heightCurrent: 320,
      heightSource: height,
      widthSource: width,
    });

    return `<div style="display: inline-block; padding: 12px" class="break_page">
                <img  src="${currentSrc}" width="${currentWidth}" height="${currentHeight}" />
            </div>`;
  }

  private buildHtmlStyles() {
    return [
      path.resolve(process.cwd(), `${this.assetsTemplateDirUrl}/template_first.styles.css`),
      path.resolve(process.cwd(), `${this.assetsTemplateDirUrl}/template_second.styles.css`),
    ].reduce((acc, currentPath) => {
      const styleFile = fs.readFileSync(currentPath, { encoding: "utf-8" });
      acc += styleFile;
      return acc;
    }, "");
  }

  private async buildHtmlTemplate(requestData: IRequestData) {
    const extendProjects = await this.getExtendedProjectsService.getExtendedProjects<{
      getExtendedProject: { name: string };
    }>(requestData);

    const { actualProps, generationsData } = this.buildQueryData(extendProjects);

    const entityExperienceSourceId = this.getEntitiesService.getSourceId(generationsData.entities);

    const propAreaView = generationsData.properties.find((prop) => prop.name === "AreaView");

    const entityHtml = await this.getEntitiesService.getHtmlEntityLandView(
      { tokenAuth: requestData.headers.authorization, areaViewImg: propAreaView.value },
      entityExperienceSourceId,
      {
        project_id: requestData.query.project_id,
      }
    );

    const htmlTemplate = fs.readFileSync(path.resolve(process.cwd(), `${this.assetsTemplateDirUrl}/template.html`), {
      encoding: "utf-8",
    });

    const tableCost = await this.tableCostService.buildTableCost(
      {
        projectName: extendProjects?.data?.getExtendedProject?.name || "",
      },
      generationsData.grand_summary
    );
    const tableRisk = await this.tableRiskService.buildTableRisk(generationsData.collisions);

    const headerImagesList = await Promise.all(
      [actualProps.AreaView, actualProps.LandView, actualProps.ParkView].reduce((acc, urlBase64) => {
        const imgPromise = urlBase64 ? this.buildImage(urlBase64) : Promise.resolve("");
        acc.push(imgPromise);
        return acc;
      }, [] as Promise<string>[])
    );

    const htmlTemplateReplaced = htmlTemplate
      .replace(MARKS_ITEM_HTML_TEMPLATE.styles, this.buildHtmlStyles())
      .replace(MARKS_ITEM_HTML_TEMPLATE.headerImages, headerImagesList.join(" "))
      .replace(MARKS_ITEM_HTML_TEMPLATE.mainBlockScale, entityHtml)
      .replace(MARKS_ITEM_HTML_TEMPLATE.mainTableCost, tableCost)
      .replace(MARKS_ITEM_HTML_TEMPLATE.mainTableRisk, tableRisk);

    return htmlTemplateReplaced;
  }

  public async generatePdf(response: Response, requestData: IRequestData) {
    try {
      const templateCompleted = await this.buildHtmlTemplate(requestData);

      pdf.create(templateCompleted, optionsPdf).toBuffer((err, buffer) => {
        const readable = new ReadableBufferOnResponse(buffer);
        readable.onResponse(response);
      });
    } catch (err) {
      throw new HTTP_ERROR_DICTIONARY.BadRequestException(err);
    }
  }
}
