import { Injectable } from "@nestjs/common";

import { buildChunkedList } from "../../../common/utils/buildChunkedList";

interface IRiskIem {
  name: string;
  decision_rule_id: string;
  source_entity_id: string;
  target_entity_id: string;
  properties: { name: string; units: string; value: boolean }[];
}

@Injectable()
export class TableRiskService {
  private theadTable = `<thead>
                   <tr>
                       <th style="width: 15%">Name collision</th>
                       <th style="width: 30%">Decision ruleId</th>
                       <th style="width: 15%">Source entityId</th>
                       <th style="width: 15%">Target entityId</th>
                    </tr>
                </thead>`;

  async buildTableRisk(dataRisks?: IRiskIem[]): Promise<string> {
    return dataRisks?.length
      ? buildChunkedList(dataRisks).reduce((acc, items) => {
          acc += `<table class="break_page">
                    <caption class="entity_title">Risks & Considerations</caption>
                      ${this.theadTable}
                    <tbody>
                       ${items.reduce((accRisks, item) => {
                         accRisks += `<tr>
                              <td>${item.name}</td>
                              <td>${item.decision_rule_id}</td>
                              <td>${item.source_entity_id}</td>
                              <td>${item.target_entity_id}</td>
                           </tr>`;
                         return accRisks;
                       }, "")}
                    </tbody>
            </table>`;
          return acc;
        }, "")
      : `<table class="break_page">
            <caption class="entity_title">Table risk</caption>
            ${this.theadTable}
           <tbody>
                     <tr>
                       <td colspan="4">No data available</td>
                    </tr>
             </tbody>
        </table>`;
  }
}
