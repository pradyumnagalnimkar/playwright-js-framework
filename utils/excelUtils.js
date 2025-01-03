const ExcelJs = require("exceljs")

export default async function readExcel(file_path, search_text){
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(file_path);
    const worksheet = workbook.getWorksheet('Sheet1')
    let output = {row:-1, col: -1}
    await worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if(cell.value == search_text){
                output.row = rowNumber;
                output.col = colNumber;
            }
        })
    })
    return output
}

export async function readExcelFile(excelFilePath, sheetName){
    let output = []
    let headers = []
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(excelFilePath);
    const worksheet = workbook.getWorksheet(sheetName);
    await worksheet.eachRow((row, rowNumber) => {
        if(rowNumber === 1){
            row.eachCell((cell, colNumber) => {
                headers.push(cell.value);
            })
        }
        else{
            let rowData = {}
            row.eachCell((cell, colNumber) => {
                rowData[headers[colNumber-1]] = cell.value
            })
            output.push(rowData)
        }
    })
    return output
}

export async function writeExcel(file_path, rowNumber, colNumber, updated_text){
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(file_path);
    const worksheet = workbook.getWorksheet('Sheet1')
    const cell = worksheet.getCell(rowNumber, colNumber)
    cell.value = updated_text
    workbook.xlsx.writeFile(file_path)
}