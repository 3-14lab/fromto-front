import { sicgespType, localType } from '../hooks/upload';
import { convertNumber } from './convertNumber';
export type fileObject = sicgespType | localType;

function csvToObject(csv: any, type: 'sicgesp' | 'local'): fileObject[] {
  const lines: [string] = csv.split(/\r?\n/g).splice(2);
  if (!lines.length) { return []; }

  const income = [];
  for (const line of lines) {
      const columns = line.split(/;/);

      let incomeFormatted;
      if (type === 'local') {
        incomeFormatted = {
          model_code: columns[0],
          place_name: columns[1],
          value: convertNumber(columns[2]),
        }

        if (incomeFormatted.model_code) income.push(incomeFormatted);
      } else {
        incomeFormatted = {
          base_code: columns[0],
          location: columns[1],
          value: convertNumber(columns[2]),
        }

        if (incomeFormatted.base_code) income.push(incomeFormatted);
      }
  }

  return income;
}

export { csvToObject };