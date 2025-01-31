
import { Injectable } from "@nestjs/common";

import { ICostItem } from "../types";
import { buildChunkedList } from "../../../common/utils/buildChunkedList";
import { EntityPropertiesConvertor } from "../../../common/classes/EntityPropertiesConvertor";

interface IRow {
  title: string;
  bold?: boolean;
  col?: number;
  value?: string | number;
}

@Injectable()
export class TableCostService {
  constructor() {}

  private rowSeparator() {
    return [{ title: "" }, { title: "" }, { title: "" }, { title: "" }, { title: "" }];
  }

  private buildTemplateRows() {
    return [
      [
        { title: "Project Location:", bold: true },
        { title: "get from API", col: 2 },
        { title: "Prepared for:", bold: true },
        { title: "" },
      ],
      [
        { title: "Project Manager:", bold: true },
        { title: "get from API" },
        { title: "" },
        { title: "Estimate Rivision:", bold: true },
        { title: "" },
      ],
      [
        { title: "Prepared by:", bold: true },
        { title: "get from API" },
        { title: "" },
        { title: "Estimate Rivision:", bold: true },
        { title: "" },
      ],
      [...this.rowSeparator()],
      [
        { title: "" },
        { title: "" },
        { title: "Attraction", bold: true },
        { title: "Totals", bold: true },
        { title: "" },
      ],
    ];
  }

  private theadTable = (projectName: string) => `<thead>
                           <tr> 
                               <th colspan="5">GRAND SUMMARY</th>
                            </tr>
                            <tr> 
                               <th colspan="5">PROJECT ${projectName}</th>
                            </tr> 
                    </thead>`;

  private buildTableCostBody(costs?: ICostItem[]) {
    const costMapperData = (costs || []).reduce((dictionary, itemCost) => {
      const rowBody = [
        [{ title: itemCost.area, bold: true }, { title: "" }, { title: "" }, { title: "" }, { title: "" }],
        [
          { title: itemCost.name },
          { title: "" },
          {
            title: `${EntityPropertiesConvertor.formatProperty({
              name: "Cost",
              units: "$",
              value: itemCost.cost,
            })}`,
            value: itemCost.cost,
          },
          {
            title: `${EntityPropertiesConvertor.formatProperty({
              name: "Cost",
              units: "$",
              value: itemCost.cost,
            })}`,
            value: itemCost.cost,
          },
          { title: "" },
        ],
      ];

      if (itemCost._id in dictionary) {
        dictionary[itemCost._id] = [...dictionary[itemCost._id], ...rowBody];
      } else {
        dictionary[itemCost._id] = [...rowBody];
      }
      return dictionary;
    }, {} as Record<string, IRow[][]>);

    return Object.entries(costMapperData)
      .map(([id, rows]) => {
        const { costAttraction, costTotals } = rows.reduce(
          (accCosts, row) => {
            accCosts.costAttraction += Number(row[2].value || 0);
            accCosts.costTotals += Number(row[3].value || 0);
            return accCosts;
          },
          { costAttraction: 0, costTotals: 0 }
        );

        return [
          [{ title: id, bold: true }, { title: "" }, { title: "" }, { title: "" }, { title: "" }],
          ...rows,
          this.rowSeparator(),
          [
            { title: `${id} Subtotal`, bold: true },
            { title: "" },
            {
              title: EntityPropertiesConvertor.formatProperty({
                name: "Cost",
                units: "$",
                value: costAttraction,
              }),
            },
            {
              title: EntityPropertiesConvertor.formatProperty({
                name: "Cost",
                units: "$",
                value: costTotals,
              }),
            },
            { title: "" },
          ],
        ];
      })
      .flat();
  }

  private scopeTotal(costs?: ICostItem[]): IRow[] {
    const currentScopeTotal = costs?.reduce((acc, item) => (acc += item.cost), 0) || 0;
    return [
      { title: "Scope Total", bold: true },
      { title: "" },
      { title: "" },
      {
        title: EntityPropertiesConvertor.formatProperty({
          value: currentScopeTotal,
          units: "$",
          name: "Cost",
        }),
      },
      { title: "" },
    ];
  }

  async buildTableCost(
    tableData: {
      projectName: string;
    },
    costs?: ICostItem[]
  ): Promise<string> {
    const bodyRows = this.buildTableCostBody(costs);
    return costs?.length
      ? buildChunkedList(bodyRows, 15).reduce((acc, rows, index, array) => {
          const tableBody: IRow[][] = [...this.buildTemplateRows(), ...rows];
          acc += `<div class="break_page">
                <div class="entity_title">Cost Estimate</div>
                    <table>
                    ${this.theadTable(tableData.projectName)}
                    <tbody>
                       ${[...tableBody, ...(index === array.length - 1 ? [this.scopeTotal(costs)] : [])].reduce(
                         (accRow, row) => {
                           accRow += `<tr>
                                   ${row.reduce((accCell, itemCell) => {
                                     accCell += `<td style="font-weight: ${
                                       itemCell.bold ? "bold" : "initial"
                                     }" colspan="${itemCell.col ? itemCell.col : 1}">${itemCell.title}
                                    </td>`;
                                     return accCell;
                                   }, "")}
                                </tr>`;
                           return accRow;
                         },
                         ""
                       )}
                    </tbody>
                </table>
            </div>`;
          return acc;
        }, "")
      : `<table class="break_page">
            <caption class="entity_title">Table cost</caption>
             ${this.theadTable(tableData.projectName)}
             <tbody>
                     <tr>
                       <td colspan="5">No data available</td>
                    </tr>
             </tbody>
         </table>`;
  }
}
