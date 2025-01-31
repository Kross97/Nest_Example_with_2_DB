
import { Controller, Get, Param, Res, Headers, Query, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { PdfMainService } from "./pdf.main.service";
import { TTypesTemplates } from "./types";
import { ApolloService } from "../apollo_client/apollo.service";
import { PdfQueryGuard } from "./guards/pdf_query.guard";

@Controller()
export class PdfController {
  constructor(private readonly pdfMainService: PdfMainService, private readonly apolloService: ApolloService) {}

  @Get("pdf/:type")
  @UseGuards(PdfQueryGuard)
  pdfGenerator(
    @Res() response: Response,
    @Headers() headers: Record<"authorization", string>,
    @Query()
    query: {
      project_id: string;
      generation_ids: string[];
      variant_ids: string[];
    },
    @Param() type?: Record<"type", TTypesTemplates>
  ) {
    return this.pdfMainService.pdfGenerator(response, { headers, query }, type);
  }
}
