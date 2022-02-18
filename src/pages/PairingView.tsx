import React, { ChangeEvent, useEffect, useState } from 'react';
import { Redirect, useHistory, useLocation, useParams } from 'react-router-dom';
import { Header } from '../components';
import { usePairing } from '../hooks/pairing';
import { useUpload } from '../hooks/upload';
import { CSVLink } from 'react-csv';
import api from '../services/api';
import { Oval } from 'react-loader-spinner';
import { format } from 'path/posix';

interface FieldGroupProps {
  code?: string;
  location?: string;
  select?: boolean;
  file?: any;
  value?: string;
  base_code?: string;
}

const FieldGroup = ({ code, location, select, file, value, base_code }: FieldGroupProps) => {

  const { handleAddPairing, allCodeSelect } = usePairing();

  const [error, setError] = useState({
    location: '',
    error: false,
  });


  const [codeSelected, setCodeSelected] = useState(() => base_code ? base_code : "---");
  const [body, setBody] = useState({
    code_model: code,
    code_base: codeSelected,
    location,
    value,
  });

  async function handleCodeSelected(valueCode: any) {

    if (allCodeSelect.includes(valueCode)) {
      setError({ ...error, error: true });
      return;
    }

    setError({ location: '', error: false });

    setCodeSelected(valueCode);

    setBody({ ...body, code_base: valueCode })

    handleAddPairing({ ...body, code_base: valueCode }, code);
  }

  function update(event?: ChangeEvent<HTMLSelectElement>) {
    // eslint-disable-next-line array-callback-return
    const item: any = (Object.values(file).filter((item: any) => {
      if (item?.code_model === event?.target.options[event?.target.options.selectedIndex].value) {
        return item;
      }
    }))

    if (item) {
      setError({ ...error, location: item.location })
    }

    handleCodeSelected(event?.target.options[event?.target.options.selectedIndex].value)
  }

  return (
    <div>
      <div key={code} className="flex items-center space-x-5">
        <div>
          <p className={`lg:w-28 md:w-20 font-roboto font-medium text-[#5429CC] px-3.5 py-2.5 leading-6 border rounded-md text-center bg-[#f0f2f5] ${select && "text-[#6B7280]"}`}>{select ? codeSelected : code}</p>
        </div>
        <div>
          {select ? (
            <select defaultValue={base_code ? base_code : 'DEFAULT'} id="select-primary" onChange={(event) => update(event)} className={`lg:w-96 md:w-72 px-3.5 py-2.5 border rounded-md border-[#D1D5DB] text-[#6B7280] bg-[#f0f2f5] text[#fff] ont-roboto font-medium outline-none`}>
              {mock.map(({ code_model, location: place_name }: any) => (
                <>
                  <option value={base_code ? base_code : "DEFAULT"} disabled hidden>{base_code ? location : "Nome da instituição"}</option>
                  <option key={code_model + 'c'} value={code_model}>{place_name}</option>
                </>
              ))}
            </select>
          ) : (
            <div className={`lg:w-96 md:w-72 px-3.5 py-2.5 border rounded-md text-[#D1D5DB] bg-[#f0f2f5]`}>
              <p className="font-roboto font-medium text-[#6B7280]">{location}</p>
            </div>
          )
          }
        </div>
      </div>
    </div>
  )
}

interface LocationState {
  view: any;
  pairingName: string;
  // pathname: string;
  data: any;
  state: {
    view: boolean;
    data: any;
  }
}

// const data = [
//   {
//     "base_code": "12",
//     "created_at": "Mon, 14 Feb 2022 16:15:15 GMT",
//     "id": "23f4c609-21bf-4b88-9249-59fbc2b40a07",
//     "model_code": "0000",
//     "pairing_id": "4902204a-97b5-4b8d-8093-203d967ff2b0",
//     "place_name": "Casa de outro",
//     "updated_at": "Mon, 14 Feb 2022 16:15:15 GMT",
//     "value": 1235.0
//   },
//   {
//     "base_code": "12",
//     "created_at": "Mon, 14 Feb 2022 16:15:15 GMT",
//     "id": "dd85d08a-b329-4b13-9e93-1286619b1185",
//     "model_code": "0000",
//     "pairing_id": "4902204a-97b5-4b8d-8093-203d967ff2b0",
//     "place_name": "Casa de um",
//     "updated_at": "Mon, 14 Feb 2022 16:15:15 GMT",
//     "value": 1235.0
//   },
//   {
//     "base_code": "12",
//     "created_at": "Mon, 14 Feb 2022 16:15:15 GMT",
//     "id": "1bfe822e-5918-4ee9-8e58-2f502b3b23fa",
//     "model_code": "0000",
//     "pairing_id": "4902204a-97b5-4b8d-8093-203d967ff2b0",
//     "place_name": "Casa de um",
//     "updated_at": "Mon, 14 Feb 2022 16:15:15 GMT",
//     "value": 1235.0
//   },
//   {
//     "base_code": "12",
//     "created_at": "Mon, 14 Feb 2022 16:15:15 GMT",
//     "id": "451e065f-5f53-4169-8c8a-e079cd906a9c",
//     "model_code": "0000",
//     "pairing_id": "4902204a-97b5-4b8d-8093-203d967ff2b0",
//     "place_name": "Casa de um",
//     "updated_at": "Mon, 14 Feb 2022 16:15:15 GMT",
//     "value": 1235.0
//   },
//   {
//     "base_code": "12",
//     "created_at": "Mon, 14 Feb 2022 16:15:15 GMT",
//     "id": "7e03773a-18a3-45c8-b2e5-7a73e14d6f5b",
//     "model_code": "0000",
//     "pairing_id": "4902204a-97b5-4b8d-8093-203d967ff2b0",
//     "place_name": "Casa de um",
//     "updated_at": "Mon, 14 Feb 2022 16:15:15 GMT",
//     "value": 1235.0
//   }
// ]

const mock = [
  {
    "code_model": "5",
    "location": "EDUCA�AO",
    "value": "0.00"
  },
  {
    "code_model": "17",
    "location": "\"EMEB ALTO BONITO\"",
    "value": "0.00"
  },
  {
    "code_model": "18",
    "location": "\"EMEB HENRIQUE JULIO BERGER\"",
    "value": "0.00"
  },
  {
    "code_model": "19",
    "location": "\"EMEB HILDA GRANEMANN\"",
    "value": "0.00"
  },
  {
    "code_model": "20",
    "location": "\"EMEB CASTELHANO\"",
    "value": "0.00"
  },
  {
    "code_model": "21",
    "location": "\"EMEB CHAMOT\"",
    "value": "0.00"
  },
  {
    "code_model": "22",
    "location": "\"EMEB ESPERAN�A\"",
    "value": "0.00"
  },
  {
    "code_model": "23",
    "location": "\"EMEB IRM�O VENANCIO\"",
    "value": "0.00"
  },
  {
    "code_model": "24",
    "location": "\"EMEB MARIA LUIZA BARBOSA\"",
    "value": "0.00"
  },
  {
    "code_model": "26",
    "location": "\"EMEB MORADA DO SOL\"",
    "value": "0.00"
  },
  {
    "code_model": "27",
    "location": "\"EMEB PIERINA\"",
    "value": "0.00"
  },
  {
    "code_model": "28",
    "location": "\"EMEB NOSSA SENHORA SALETE\"",
    "value": "0.00"
  },
  {
    "code_model": "29",
    "location": "\"EMEB TABAJARA\"",
    "value": "0.00"
  },
  {
    "code_model": "30",
    "location": "\"EMEB ALCIDES TOMBINI\"",
    "value": "0.00"
  },
  {
    "code_model": "31",
    "location": "\"EMEB ULYSSES GUIMAR�ES\"",
    "value": "0.00"
  },
  {
    "code_model": "32",
    "location": "\"EMEB VEREDA DOS TREVOS\"",
    "value": "0.00"
  },
  {
    "code_model": "33",
    "location": "\"EMEB WALSIN\"",
    "value": "0.00"
  },
  {
    "code_model": "47",
    "location": "\"CMEI SANTA CLARA\"",
    "value": "0.00"
  },
  {
    "code_model": "54",
    "location": "SEMEC",
    "value": "0.00"
  },
  {
    "code_model": "99",
    "location": "\"EMEB RODOLFO NICKEL\"",
    "value": "0.00"
  },
  {
    "code_model": "113",
    "location": "\"CMEI PIERINA ADAMI\"",
    "value": "0.00"
  },
  {
    "code_model": "201",
    "location": "\"CMEI MARINES LOPES\"",
    "value": "0.00"
  },
  {
    "code_model": "300",
    "location": "\"EMEB MARCOS OLSEN\"",
    "value": "0.00"
  },
  {
    "code_model": "333",
    "location": "\"CMEI MARINEI LOPES\"",
    "value": "0.00"
  },
  {
    "code_model": "400",
    "location": "\"CMEI ELMAR PEREIRA ROSA\"",
    "value": "0.00"
  }
]

export const PairingView: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const headers = [
    { label: "Código Lotação", key: "code_base" },
    { label: "Descrição Locação", key: "location" },
    { label: "Valor Realocado", key: "value" }
  ]

  const { state: { data }} = useLocation<LocationState>();

  const { allBody } = usePairing();


  const formatCSV = data.map((item: any) => {
    return { code_base: item.base_code, location: item.place_name, value: item.value }
  })

  return (
    <>
      <Header />
      <div className="mx-auto lg:w-[74rem] md:w-[54rem]">
        <section className="flex items-end my-10 space-x-8 ">
          <h1 className="text-[#374151] font-roboto font-medium text-4xl">Pareamento</h1>
          <h3 className="font-roboto font-medium text-2xl	text-[#6B7280]">Goiânia - GO | Educação | Dezembro</h3>
        </section>

        <div className="flex mx-10 gap-5 mb-2.5">
          <h4 className="lg:w-24 md:w-20 font-poppins font-normal text-center text-[#5429CC]">codigo</h4>
          <h4 className="lg:w-96 md:w-72 font-poppins font-normal text-center text-[#5429CC]">nome da instituicao</h4>
          <div className="lg:mx-7 md:mx"></div>
          <h4 className="lg:w-24 md:w-20 font-poppins font-normal text-center text-[#5429CC]">codigo</h4>
          <h4 className="lg:w-96 md:w-72 font-poppins font-normal text-center text-[#5429CC]">nome da instituicao</h4>
        </div>

        <div className="max-h-[400px] overflow-y-scroll pairing-select">
          { data.map(({ base_code, model_code, place_name, value}: any) => (
            <div className={`flex justify-center py-5 bg-white rounded-md mb-2.5`}>
              <FieldGroup key={model_code + 'b'} code={model_code} location={place_name} />
              <h4 className="self-center lg:mx-8 md:mx-2 font-poppins font-bold lg:text-2xl md:text-xl text-[#5429CC]">=</h4>
              <FieldGroup key={model_code + 'selected'} code={model_code} location={place_name} value={value} base_code={base_code} select file={[]} />
            </div>
          ))}
        </div>

        {/* <div className="w-[72] mx-auto flex items-center justify-center gap-5">
          <button className="px-[28px] py-[13px] text-white font-bold text-sm mt-10 bg-blue rounded-lg">Atualizar planilha</button> */}

        <div className="w-fit	mx-auto">
          <button className="px-[28px] py-[13px] text-white font-bold text-sm mt-10 bg-green-800 rounded-lg">
            <CSVLink data={formatCSV} filename={"from_to.csv"} headers={headers} separator={";"}>
              Baixar planilha
            </CSVLink>
          </button>
        </div>
      </div>
    </>
  );
}
