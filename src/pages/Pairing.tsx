import React, { ChangeEvent, useState } from 'react';
import { Redirect, useHistory, useLocation, useParams } from 'react-router-dom';
import { Header } from '../components';
import { usePairing } from '../hooks/pairing';
import { useUpload } from '../hooks/upload';
import { CSVLink } from 'react-csv';
import api from '../services/api';
import { Oval } from 'react-loader-spinner';

interface FieldGroupProps {
  code?: string;
  location?: string;
  select?: boolean;
  file?: any;
  value?: string;
}

const FieldGroup = ({ code, location, select, file, value }: FieldGroupProps) => {

  const { handleAddPairing, allCodeSelect } = usePairing();

  const [error, setError] = useState({
    location: '',
    error: false,
  });

  const [codeSelected, setCodeSelected] = useState("---" as any);
  const [locationSelected, setLocationSelected] = useState(location);

  const [body, setBody] = useState({
    code_model: code,
    code_base: codeSelected,
    location: locationSelected,
    value,
  });

  async function handleCodeSelected(valueCode: any, textCode: any) {
    console.log(allCodeSelect)
    if (allCodeSelect.includes(valueCode)) {
      // setError({ ...error, error: true });
      // console.log(allCodeSelect)
      return;
    }

    setBody(prev => ({ ...prev, code_base: valueCode, location: textCode }))

    handleAddPairing({ ...body, code_base: valueCode, location: textCode }, code);

    setCodeSelected(valueCode);
    setLocationSelected(textCode);
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

    handleCodeSelected(event?.target.options[event?.target.options.selectedIndex].value, event?.target.options[event?.target.options.selectedIndex].text)
  }

  return (
    <div>
      <div key={code} className="flex items-center space-x-5">
        <div>
          <p className={`lg:w-28 md:w-20 font-roboto font-medium text-[#5429CC] px-3.5 py-2.5 leading-6 border rounded-md text-center bg-[#f0f2f5] ${select && "text-[#6B7280]"}`}>{select ? codeSelected : code}</p>
        </div>
        <div>
          {select ? (
            <select defaultValue={'DEFAULT'} id="select-primary" onChange={(event) => update(event)} className={`lg:w-96 md:w-72 px-3.5 py-2.5 border rounded-md border-[#D1D5DB] text-[#6B7280] bg-[#f0f2f5] text[#fff] ont-roboto font-medium outline-none`}>
              {file && file?.map(({ model_code, place_name }: any) => (
                <>
                  <option value="DEFAULT" disabled hidden>Nome da instituição</option>
                  <option key={model_code + 'c'} value={model_code}>{place_name}</option>
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
  state: {
    view: boolean;
  }
}

export const Pairing: React.FC = () => {

  const { sector_id } = useParams() as { sector_id: string }
  const history = useHistory();
  const { state } = useLocation<LocationState>();
  const [isLoading, setIsLoading] = useState(false)

  const { files } = useUpload();
  const { allBody, setAllBody, setAllCodeSelect, formatCSV } = usePairing();
  
  const headers = [
    { label: "Código Lotação", key: "code_base" },
    { label: "Descrição Locação", key: "location" },
    { label: "Valor Realocado", key: "value" }
  ]

  if (!files.sicgesp && !state?.view) return <Redirect to="/pairings" />

  // console.log(allBody);
  async function handlePairinglSubmit() {
    console.log(allBody);
    const data = allBody.map((item: any) => (
      (Number(item.value)) && {
        sector_id,
        base_code: item.code_base,
        value: item.value,
        place_name: item.location,
        model_code: item.code_model,
      }
    )).filter((item: any) => item);

      console.log("FormattedData ", { name: state.pairingName, sector_id, data: data })

    setIsLoading(true)

    try {
      await api.post('pairing', { name: state.pairingName, sector_id, data: [...data] })
      setAllBody([]);
      setAllCodeSelect([]);
    } catch (err) {
      console.log('caiu no catch')
      console.log(err)
    }

    setIsLoading(false)
    history.push(`/pairings/${sector_id}`)
  }

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

        <div className="max-h-[400px] overflow-y-scroll">
          { files && files?.local.map(({ model_code, place_name, value}: any) => (
            <div className={`flex justify-center py-5 bg-white rounded-md mb-2.5`}>
              <FieldGroup key={model_code + 'b'} code={model_code} location={place_name} />
              <h4 className="self-center lg:mx-8 md:mx-2 font-poppins font-bold lg:text-2xl md:text-xl text-[#5429CC]">=</h4>
              <FieldGroup key={model_code + 'selected'} code={model_code} location={place_name} value={value} select file={files?.sicgesp} />
            </div>
          ))}
        </div>

        {/* <div className="w-[72] mx-auto flex items-center justify-center gap-5">
          <button className="px-[28px] py-[13px] text-white font-bold text-sm mt-10 bg-blue rounded-lg">Atualizar planilha</button> */}

        <div className="w-[700px] mx-auto flex items-center justify-around">
          <button onClick={handlePairinglSubmit} className="px-[28px] py-[13px] text-white font-bold text-sm mt-10 bg-blue rounded-lg flex justify-center items-center">

            {
              isLoading ? (<Oval color="#ffffff" height={24} strokeWidth={4} width={24} />) : 'Atualizar planilha'
            }
          </button>
          <button className="px-[28px] py-[13px] text-white font-bold text-sm mt-10 bg-green-800 rounded-lg">
            <CSVLink data={formatCSV} filename={"from_to.csv"} headers={headers} separator={";"}>
              Baixar planilha
            </CSVLink>
          </button>
          <button className="px-[28px] py-[13px] text-white font-bold text-sm mt-10 bg-red-400 rounded-lg">
            <CSVLink data={formatCSV} filename={"from_to.csv"} headers={headers} separator={";"}>
              Baixar não pareados
            </CSVLink>
          </button>
        </div>
      </div>
    </>
  );
}
