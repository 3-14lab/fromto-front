//  csv = codigo, name, recurso
function csvToObject(csv: any) {
  const lines = csv.split(/\r?\n/g);
  if (!lines.length) { return []; }

  const income = [];
  for (const line of lines) {
    const lineColumns = line.split(/,/g);
    for (const column of lineColumns) {
      const fields = column.split(/,/)[0].split(/;/);

      const incomeFormatted = {
        code_model: fields[0],
        location: fields[1],
        value: fields[2],
      }
      income.push(incomeFormatted);
    }
  }

  income.shift();

  return income.filter(value => value.code_model !== "00" && value.location !== undefined);
}

export { csvToObject };