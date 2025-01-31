
import { Injectable } from "@nestjs/common";
import { ApolloService } from "../../apollo_client/apollo.service";
import { getExtendedProjectQuery } from "../constants/apollo_query";
import { IRequestData } from "../pdf.main.service";

@Injectable()
export class GetExtendedProjectsService {
  constructor(private apolloService: ApolloService) {}

  getExtendedProjects<T>(requestData: IRequestData) {
    return this.apolloService.query<T>(
      { queryService: "getExtendedProject", bodyQuery: getExtendedProjectQuery },
      { tokenAuth: requestData.headers.authorization },
      {
        interfaceFilter: "FilterExtendedProjectsInput",
        project_id: requestData.query.project_id,
        generation_ids: requestData.query.generation_ids,
        variant_ids: requestData.query.variant_ids,
      }
    );
  }
}
