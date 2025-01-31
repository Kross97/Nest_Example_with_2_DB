
import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { PdfBaseService } from "./services_template/pdf.base.service";
import { TTypesTemplates } from "./types";

export interface IRequestData {
  headers: Record<"authorization", string>;
  query: Record<string, any>;
}

@Injectable()
export class PdfMainService {
  private dispatcherPdfGenerators: Record<
    TTypesTemplates,
    { generatePdf: (res: Response, requestData: IRequestData) => void }
  >;

  /**
   * A place where you can further scale the number of templates for PDF rendering
   * */
  constructor(private pdfBaseService: PdfBaseService) {
    this.dispatcherPdfGenerators = {
      base: this.pdfBaseService,
    };
  }

  pdfGenerator(res: Response, requestData: IRequestData, typeDictionary?: Record<"type", TTypesTemplates>) {
    return this.dispatcherPdfGenerators[typeDictionary.type || "base"].generatePdf(res, requestData);
  }
}
