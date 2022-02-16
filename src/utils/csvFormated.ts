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
        model_code: fields[0],
        place_name: fields[1],
        value: fields[2],
      }
      income.push(incomeFormatted);
    }
  }

  income.shift();
  income.shift();

  return income.filter(value => value.model_code !== "00" && value.place_name !== undefined);
}

export { csvToObject };