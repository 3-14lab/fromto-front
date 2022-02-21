import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Redirect, useHistory, useLocation, useParams } from 'react-router-dom';
import { Header } from '../components';
import { usePairing } from '../hooks/pairing';
import { useUpload } from '../hooks/upload';
import { CSVLink } from 'react-csv';
import api from '../services/api';
import { Oval } from 'react-loader-spinner';
import { sicgesp } from '../mock/file';

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
  data: [];
}

interface FileProps {
  [field: string]: {
    model_code?: string;
    place_name: string;
    value: string;
    base_code?: string | undefined;
  }
}


export const Pairing: React.FC = () => {

  const { sector_id } = useParams() as { sector_id: string }
  const history = useHistory();
  const { state } = useLocation<LocationState>();
  const [isLoading, setIsLoading] = useState(false)

  const { file } = useUpload();
  const [formattedFile, setFormattedFile] = useState({} as FileProps);
  const [formattedTemplate, setFormattedTemplate] = useState({});

  const headers = [
    { label: "Código Lotação", key: "base_code" },
    { label: "Descrição Locação", key: "location" },
    { label: "Valor Realocado", key: "value" }
  ]

  const headersSecondary = [
    { label: "Código Lotação", key: "model_code" },
    { label: "Descrição Locação", key: "location" },
    { label: "Valor Realocado", key: "value" },
    { label: "Adicional", key: "add"}
  ]

  useEffect(() => {
    setFormattedFile(file.reduce((p, c) => ({ ...p, [c.model_code]: c }), {}));
  }, [file])

  useEffect(() => {
    if (state?.data) {
      setFormattedFile(prev => ({ ...prev, ...state.data.reduce((p: any, c: any) => ({ ...p, [c.model_code]: c }), {})}))
    }
  }, [state?.data])

  const downloadPairingFilled = useMemo(() => {
    const aux = formattedFile;
    return Object.values(aux).filter(item => item.base_code).map(item => {
      return  { base_code: item.base_code, location: item.place_name, value: item.value }
    })
  }, [formattedFile]) 

  const downloadPairingEmpty = useMemo(() => {
    const aux = formattedFile;
    return Object.values(aux).filter(item => !item.base_code).map(item => {
      console.log(item);
      return  { model_code: item.model_code, location: item.place_name, value: item.value }
    })
  }, [formattedFile]) 

  function update(code: string) {
    return ({ target }: ChangeEvent<HTMLSelectElement>) => {
      const { value } = target;

      const pairingAlreadySelect = Object.values(formattedFile).find(item => value === item.base_code);
      
      if (pairingAlreadySelect) { 
        target.value = "DEFAULT";
        setFormattedFile(prev => ({ ...prev, [code]: { ...prev[code], base_code: undefined} }))
        return;
      }

      const newPairingSelect = formattedFile[code];
      setFormattedFile((prev) => ({ ...prev, [code]: { ...newPairingSelect, base_code: value }}))
    }
  }

  async function handlePairingSubmit() {
    setIsLoading(true);
    try {
      await api.post('/pairings', { name: state.pairingName, sector_id, data: [...Object.values(formattedFile).filter(item => item.base_code)] });
    } catch (err) {
      console.log(err)
    }

    setIsLoading(false);
    history.push(`/pairings/${sector_id}`)
  }


  if (!file) return <Redirect to="/pairings" />


  return (
    <>
      <Header />
      <div className="mx-auto lg:w-[74rem] md:w-[54rem]">
        <section className="flex items-end my-10 space-x-8 ">
          <h1 className="text-[#374151] font-roboto font-medium text-4xl">Pareamento</h1>
          <h3 className="font-roboto font-medium text-2xl	text-[#6B7280]">Goiânia - GO | Educação | Dezembro</h3>
        </section>

        <div className="grid grid-cols-9 w-full px-3">
          <h4 className="font-poppins font-normal text-center text-[#5429CC]">codigo</h4>
          <h4 className="col-span-3 font-poppins font-normal text-center text-[#5429CC]">nome da instituicao</h4>
          <div className="grid-cols-none"></div>
          <h4 className="font-poppins font-normal text-center text-[#5429CC]">codigo</h4>
          <h4 className="col-span-3 font-poppins font-normal text-center text-[#5429CC]">nome da instituicao</h4>
        </div>

        <div className="max-h-[400px] overflow-y-scroll pairing-select">
          { Object.values(formattedFile).map(({ model_code, place_name, value, base_code}: any) => (
            <div className="grid grid-cols-9 w-full p-5 gap-5 mb-2.5 bg-white">
              <div className="font-roboto font-medium text-[#5429CC] px-3.5 py-2.5 leading-6 border rounded-md text-center bg-[#f0f2f5]">
                { model_code }
              </div>
              <div className="col-span-3 px-3.5 py-2.5 border rounded-md bg-[#f0f2f5] font-roboto font-medium text-[#6B7280]">
                { place_name }
              </div>
              <div className="self-center mx-auto font-poppins font-bold lg:text-2xl md:text-xl text-[#5429CC]">
                =
              </div>
              <div className="font-roboto font-medium text-[#292438] px-3.5 py-2.5 leading-6 border rounded-md text-center bg-[#f0f2f5]">
                { base_code || "---"}
              </div>
              <select onChange={update(model_code)} value={base_code || 'DEFAULT'} id="select-primary" className="col-span-3 w-full px-3.5 py-2.5 border rounded-md border-[#D1D5DB] text-[#6B7280] bg-[#f0f2f5] text[#fff] ont-roboto font-medium outline-none">
                <option value="DEFAULT" disabled hidden>Nome da instituição</option>
                { (Object.values(sicgesp)).map(({ base_code, location }: any) => (
                  <option value={base_code}>{location}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="w-[700px] mx-auto flex items-center justify-around">
          <button onClick={handlePairingSubmit} className="px-[28px] py-[13px] text-white font-bold text-sm mt-10 bg-blue rounded-lg flex justify-center items-center">
            {
              isLoading ? (<Oval color="#ffffff" height={24} strokeWidth={4} width={24} />) : 'Atualizar planilha'
            }
          </button>
          <button className="px-[28px] py-[13px] text-white font-bold text-sm mt-10 bg-green-800 rounded-lg">
            <CSVLink data={downloadPairingFilled as []} filename={"from_to.csv"} headers={headers} separator={";"}>
              Baixar planilha
            </CSVLink>
          </button>
          <button className="px-[28px] py-[13px] text-white font-bold text-sm mt-10 bg-red-400 rounded-lg">
            <CSVLink data={downloadPairingEmpty as []} filename={"from_to.csv"} headers={headersSecondary} separator={";"}>
              Baixar não pareados
            </CSVLink>
          </button>
        </div>
      </div>
    </>
  );
}
