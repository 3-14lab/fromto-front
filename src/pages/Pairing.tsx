import React, { ChangeEvent, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Header } from '../components';
import { usePairing } from '../hooks/pairing';
import { useUpload } from '../hooks/upload';
import {CSVLink} from 'react-csv';
import api from '../services/api';

interface FieldGroupProps {
  code?: string;
  location?: string;
  select?: boolean;
  file?: any;
  value?: string;
}

const FieldGroup = ({ code, location, select, file, value }: FieldGroupProps) => {

  const { handleAddPairing } = usePairing();

  const [codeSelected, setCodeSelected] = useState("---" as any);
  const [body, setBody] = useState({
    code_model: code,
    code_base: codeSelected,
    location,
    value,
  });

  async function handleCodeSelected(valueCode: string | undefined) {
    setCodeSelected(valueCode);
    setBody({ ...body, code_base: valueCode })

    handleAddPairing({...body, code_base: valueCode}, code);
  } 

  function update(event?: ChangeEvent<HTMLSelectElement>) {
    handleCodeSelected(event?.target.options[event?.target.options.selectedIndex].value)
  }

  return (
    <div className="flex items-center space-x-5">
      <div>
        <p className={`lg:w-28 md:w-20 font-roboto font-medium text-[#5429CC] px-3.5 py-2.5 leading-6 border rounded-md text-center bg-[#f0f2f5] ${select && "text-[#6B7280]"}`}>{ select ? codeSelected : code}</p>
      </div>
      <div>
        { select ? (
          <select id="select-primary" onChange={(event) => update(event)} className="lg:w-96 md:w-72 px-3.5 py-2.5 border rounded-md border-[#D1D5DB] text-[#6B7280] bg-[#f0f2f5] ont-roboto font-medium outline-none">
            {file.map(({ code_model, location }: any) => (
              <>
  
                <option selected disabled hidden>Nome da instituição</option>
                <option key={code_model} value={code_model}>{location}</option>
              </>
            ))}
          </select>
          ) : (
            <div className="lg:w-96 md:w-72 px-3.5 py-2.5 border rounded-md text-[#D1D5DB] bg-[#f0f2f5]">
              <p className="font-roboto font-medium text-[#6B7280]">{ location }</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

const Row = ({ code, location, file, value }: any) => {
  return (
    <div className="flex justify-center py-5 bg-white rounded-md mb-2.5">
      <FieldGroup code={code} location={location} />
      <h4 className="self-center lg:mx-8 md:mx-2 font-poppins font-bold lg:text-2xl md:text-xl text-[#5429CC]">=</h4>
      <FieldGroup code={code} location={location} value={value} select file={file} />
    </div>
  )
}

export const Pairing: React.FC = () => {
  const { files } = useUpload();
  const { allBody, formatCSV } = usePairing();
  console.log(formatCSV);
   const headers = [
    { label: "Código base (sicgesp)", key: "code_base" },
    { label: "Locação", key: "location" },
    { label: "Valor", key: "value" }
  ]

  if (!files.sicgesp) return <Redirect to="/pairings" />


  async function handlePairinglSubmit(){

      await api.post('sector', { 
        allBody
      })
    
    
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
          { files?.sicgesp.map(({ code_model, location, value}: any) => (
            <Row key={code_model} code={code_model} location={location} file={files?.local} value={value} />
          ))}
        </div>
        <div className="w-[382px] mx-auto flex items-center justify-around">
          <button onClick={handlePairinglSubmit} className="px-[28px] py-[13px] text-white font-bold text-sm mt-10 bg-blue rounded-lg">Atualizar planilha</button>
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
