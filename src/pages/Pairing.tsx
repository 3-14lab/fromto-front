import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Header } from '../components';
import { useUpload } from '../hooks/upload';
import { CSVLink } from 'react-csv';
import api from '../services/api';
import { Oval } from 'react-loader-spinner';

import { sicgespType, localType } from '../hooks/upload';

interface LocationState {
  pairing_name: string;
  sector_name: string;
  city_name: string;
  data: [];
}

export type FilePropsSicgesp = {
  [field: string]: sicgespType;
};

type FilePropsLocal = {
  [field: string]: localType;
};

export const Pairing: React.FC = () => {

  const { sector_id } = useParams() as { sector_id: string }
  const history = useHistory();
  const { state: { pairing_name, city_name, sector_name, data } } = useLocation<LocationState>();
  const [isLoading, setIsLoading] = useState(false)

  const { file } = useUpload();
  
  const [formattedFile, setFormattedFile] = useState({} as FilePropsLocal);
  const [sicgespFile, setSicgespFile] = useState({} as FilePropsSicgesp);

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
    setFormattedFile(file['local']?.reduce((p, c) => ({ ...p, [c.model_code]: c }), {}));
    setSicgespFile(file['sicgesp']?.reduce((p, c) => ({ ...p, [c.base_code]: c }), {}));
  }, [file])

  useEffect(() => {
    if (data) {
      setFormattedFile(prev => ({ ...prev, ...data.reduce((p: any, c: any) => ({ ...p, [c.model_code]: c }), {})}))
    }
  }, [data])

  const downloadPairingFilled = useMemo(() => {
    const aux = formattedFile;
    return Object.values(aux).filter(item => item.base_code).map(item => {
      return  { base_code: item.base_code, location: item.place_name, value: item.value }
    })
  }, [formattedFile]) 

  const downloadPairingEmpty = useMemo(() => {
    const aux = formattedFile;
    return Object.values(aux).filter(item => !item.base_code).map(item => {
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
      await api.post('/pairings', { name: pairing_name, sector_id, data: [...Object.values(formattedFile).filter(item => item.base_code)] });
    } catch (err) {
      console.log(err)
    }

    setIsLoading(false);
    history.push({pathname: `/pairings/${sector_id}`, state: { sector_name, city_name }})
  }

  if (!Object.values(file).length) {
    history.push('/pairings');
  }

  return (
    <>
      <Header />
      <div className="mx-auto lg:w-[74rem] md:w-[54rem]">
        <section className="flex items-end my-10 space-x-8 ">
          <h1 className="text-[#374151] font-roboto font-medium text-4xl">Pareamento</h1>
          <h3 className="font-roboto font-medium text-2xl	text-[#6B7280]">{city_name} | {sector_name} | {pairing_name}</h3>
        </section>

        <div className="grid grid-cols-9 w-full px-3">
          <h4 className="font-poppins font-normal text-center text-[#5429CC]">codigo</h4>
          <h4 className="col-span-3 font-poppins font-normal text-center text-[#9a92b1]">nome da instituicao</h4>
          <div className="grid-cols-none"></div>
          <h4 className="font-poppins font-normal text-center text-[#5429CC]">codigo</h4>
          <h4 className="col-span-3 font-poppins font-normal text-center text-[#5429CC]">nome da instituicao</h4>
        </div>

        <div className="max-h-[400px] overflow-y-scroll pairing-select">
          { Object.values(formattedFile).map(({ model_code, place_name, value, base_code}: any) => (
            <div key={model_code} className="grid grid-cols-9 w-full p-5 gap-5 mb-2.5 bg-white">
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
                { (Object.values(sicgespFile)).map(({ base_code, location }) => (
                  <option key={base_code} value={base_code}>{location}</option>
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
