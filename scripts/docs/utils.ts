import fs from "node:fs";
import path from "node:path";

export function tableToJson(table) {
  if (!table) {
    return [];
  }
  const data: HTMLTableCellElement[][] = [];
  for (let i = 1; i < table.rows.length; i++) {
    const tableRow: HTMLTableRowElement = table.rows[i];
    const rowData: HTMLTableCellElement[] = [];
    for (let j = 0; j < tableRow.cells.length; j++) {
      rowData.push(tableRow.cells[j]);
    }
    data.push(rowData);
  }
  return data;
}

export async function readDirRecursively(dir, handler) {
  const files = fs.readdirSync(dir);
  files.forEach(async file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      readDirRecursively(filePath, handler);
    } else {
      handler && handler(filePath);
    }
  });
}
