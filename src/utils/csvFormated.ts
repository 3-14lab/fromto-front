import { sicgespType, localType } from '../hooks/upload';
export type fileObject = sicgespType | localType;

function csvToObject(csv: any, type: 'sicgesp' | 'local'): fileObject[] {
  const lines = csv.split(/\r?\n/g);
  if (!lines.length) { return []; }

  const income = [];
  for (const line of lines) {
    const lineColumns = line.split(/,/g);
    for (const column of lineColumns) {
      const fields = column.split(/,/)[0].split(/;/);

      let incomeFormatted;
      if (type === 'local') {
        incomeFormatted = {
          model_code: fields[0],
          place_name: fields[1],
          value: fields[2],
        }
        if (incomeFormatted.model_code && incomeFormatted.value) {
          income.push(incomeFormatted);
        }
      } else {
        incomeFormatted = {
          base_code: fields[0],
          location: fields[1],
          value: fields[2],
        }
        if (incomeFormatted.base_code) {
          income.push(incomeFormatted);
        }
      }
    }
  }

  income.shift();

  return income;
}

export { csvToObject };