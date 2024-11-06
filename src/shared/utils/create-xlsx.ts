"use client"
import * as XLSX from 'xlsx';

export function xlsx(
    data: any,
    worksheetName: string,
    headers: string[],
    fileName: string,
    startDate: string,
    endDate: string
    ): any {
    const rows = startDate ?
    data.filter((a: any) =>
    a.createdAt >= startDate &&
    a.createdAt <= endDate) :
    data

    console.log("startDate--->: ", startDate);
    console.log("endDate--->: ", endDate);
    // console.log("data: ", data);
    // console.log("worksheet: ", worksheet);
    const worksheet = XLSX.utils.json_to_sheet(rows)
    console.log("worksheet: ", worksheet);
    // const worksheet = XLSX.utils.json_to_sheet([
        // {id: '5ce7c1fa-5045-4739-bdc1-73a61269e04f', name: 'victor Sandoval'},
        // {id: 'ed323582-a18e-4174-8b8a-a76797f1b3c0',name: 'Ulises Vargas',}
    // ]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
    XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });

    const colWidths = headers.map(header => {
        const maxLength = Math.max(
            header.length,
            ...rows.map((row: any) => row[header]?.toString().length || 0)
        );
        return { wch: maxLength };
    });
    worksheet["!cols"] = colWidths;

    XLSX.writeFile(workbook, `${fileName}Dara.xlsx`, { compression: true });
    // const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer", compression: true });

    // return new NextResponse(buffer, {
        // status: 200,
        // headers: {
        //   "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        //   "Content-Disposition": "attachment; filename=test.xlsx",
        // },
    //   });
  }

// export async function xlsx(form: FormData) {
//     console.log("form: ", form);
// }
