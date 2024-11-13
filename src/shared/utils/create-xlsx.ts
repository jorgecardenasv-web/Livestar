import * as XLSX from "xlsx";

export async function xlsx(
  url: string,
  worksheetName: string,
  headers: string[],
  fileName: string,
  startDate: string,
  endDate: string
): Promise<any> {
  const date = new Date();
  const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;

  const res = await fetch(`${url}?startDate=${startDate}&endDate=${endDate}`);
  const rows = await res.json();
  const worksheet = XLSX.utils.json_to_sheet(rows);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
  XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });

  const colWidths = headers.map((header) => {
    const maxLength = Math.max(
      header.length,
      ...rows.map((row: any) => row[header]?.toString().length || 0)
    );
    return { wch: maxLength };
  });
  worksheet["!cols"] = colWidths;
  XLSX.writeFile(workbook, `${fileName}-${formattedDate}.xlsx`, {
    compression: true,
  });
}
