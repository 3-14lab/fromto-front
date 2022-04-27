import { sicgespType, localType, localTypePJ } from "@hooks/upload";
import { convertNumber } from "./convertNumber";
export type fileObject = sicgespType | localType | localTypePJ;

function csvToObject(csv: any, type: "sicgesp" | "local" | "localPJ"): fileObject[] {
  const lines: [string] = csv.split(/\r?\n/g).splice(2);
  if (!lines.length) {
    return [];
  }

  const income = [];
  for (const line of lines) {
    const columns = line.split(/;/);
    console.log("type ->", type)
    let incomeFormatted;
    if (type === "local") {
      incomeFormatted = {
        model_code: columns[0],
        place_name: columns[1],
        value: convertNumber(columns[2]),
      };

      if (incomeFormatted.model_code) income.push(incomeFormatted);
    } 
    else if(type === "localPJ") {
      console.log("entrou no localPJ")
      incomeFormatted = {
        stocking_code: columns[0],
        description_stocking: columns[1],
        reallocated_value: convertNumber(columns[2]),
        number_posts: convertNumber(columns[3])
      };

      if (incomeFormatted.stocking_code) income.push(incomeFormatted);
    } else {
      console.log("entrou no else do localPJ")
      incomeFormatted = {
        base_code: columns[0],
        location: columns[1],
        value: convertNumber(columns[2]),
      };

      if (incomeFormatted.base_code) income.push(incomeFormatted);
    }
  }

  return income;
}

export { csvToObject };
