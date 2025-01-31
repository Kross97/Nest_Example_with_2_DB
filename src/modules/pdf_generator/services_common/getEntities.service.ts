
import { Injectable } from "@nestjs/common";
import { ApolloService } from "../../apollo_client/apollo.service";
import { getEntitiesQuery } from "../constants/apollo_query";
import { buildBase64Url } from "../../../common/utils/buildBase64Url";
import { getImageSizeBuffer } from "../../../common/utils/getImageSizeFromBuffer";
import { calculateSourceScale } from "../../../common/utils/calculateSourceScale";
import { EntityPropertiesConvertor } from "../../../common/classes/EntityPropertiesConvertor";

export interface IEntitySourceProp {
  __typename: string;
  name: string;
  units: string;
  value: string;
}

interface IEntitiesFilter {
  project_id: string;
}

interface IEntities {
  type: string;
  properties: IEntitySourceProp[];
}

interface IEntityQuery {
  getEntities: {
    name: string;
    type: string;
    category: string;
    internal_id: string;
    properties: IEntitySourceProp[];
  }[];
}

@Injectable()
export class GetEntitiesService {
  constructor(private apolloService: ApolloService) {}

  private async buildImage(src: string, sizes: { width: number; height: number }) {
    if (src) {
      const currentSrc = await buildBase64Url(src);
      const { width, height } = getImageSizeBuffer(src);

      const { currentHeight, currentWidth } = calculateSourceScale({
        widthCurrent: sizes.width,
        heightCurrent: sizes.height,
        heightSource: height,
        widthSource: width,
      });

      return `<img src="${currentSrc}" width="${currentWidth}" height="${currentHeight}"/>`;
    }
    return "";
  }

  getSourceId(entities?: IEntities[]) {
    const entityExperienceSourceId = entities
      ?.find((entity) => entity.type === "Experience")
      ?.properties?.find((prop) => prop.name === "SourceId");
    return entityExperienceSourceId;
  }

  async getEntitiesData(tokenAuth: string, source?: IEntitySourceProp, filter?: IEntitiesFilter) {
    if (source) {
      const entity = await this.apolloService.query<IEntityQuery>(
        { queryService: "getEntities", bodyQuery: getEntitiesQuery },
        { tokenAuth },
        {
          interfaceFilter: "FilterEntitiesInput!",
          entity_internal_id: source.value,
          ...(filter || {}),
        }
      );

      return entity;
    }
    return null;
  }

  async getHtmlEntityLandView(
    { tokenAuth, areaViewImg }: { tokenAuth: string; areaViewImg: string },
    source?: IEntitySourceProp,
    filter?: IEntitiesFilter
  ) {
    const landNames = new Set(["Area", "LandView"]);
    const entity = await this.getEntitiesData(tokenAuth, source, filter);
    if (entity) {
      const currentEntity = entity.data.getEntities.find((e) => e.internal_id === source.value);
      if (currentEntity) {
        const landViewDictionary = currentEntity.properties.reduce((acc, prop) => {
          if (landNames.has(prop.name)) {
            acc[prop.name] = prop;
          }
          return acc;
        }, {} as Record<"Area" | "LandView", IEntitySourceProp>);

        const areaSize = 395;
        const landSize = 295;
        const imageAreaView = await this.buildImage(areaViewImg, { width: areaSize, height: areaSize * 1.25 });
        const imageLandView = await this.buildImage(landViewDictionary.LandView.value, {
          width: landSize,
          height: landSize,
        });

        return `
            <div> 
                <div style="display: inline-block; width: ${landSize}px">
                   ${imageLandView}
                   <div class="scale_dictionary">
                       <p>Name: ${currentEntity.name}</p>
                       <p>Area: ${EntityPropertiesConvertor.formatProperty(
                         EntityPropertiesConvertor.convertProperty(landViewDictionary.Area)
                       )}</p>
                  </div> 
                </div>
                <div style="display: inline-block; width: ${areaSize}px; margin-left: 15px; vertical-align: top">
                  ${imageAreaView}
                </div>
            </div>`;
      }
      return "";
    }
    return "";
  }
}
