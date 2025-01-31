
import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { PdfController } from "./pdf.controller";
import { PdfMainService } from "./pdf.main.service";
import { PdfBaseService } from "./services_template/pdf.base.service";
import { TableCostService } from "./services_common/table.cost.service";
import { TableRiskService } from "./services_common/table.risk.service";

import { GetEntitiesService } from "./services_common/getEntities.service";
import { GetExtendedProjectsService } from "./services_common/getExtendedProjects.service";

@Module({
  imports: [HttpModule],
  controllers: [PdfController],
  providers: [
    PdfMainService,
    PdfBaseService,
    TableCostService,
    TableRiskService,
    GetEntitiesService,
    GetExtendedProjectsService,
  ],
})
export class PdfModules {}
