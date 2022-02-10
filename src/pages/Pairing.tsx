import React, { ChangeEvent, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { Header } from '../components';
import { usePairing } from '../hooks/pairing';
import { useUpload } from '../hooks/upload';
import {CSVLink} from 'react-csv';
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
  const [body, setBody] = useState({
    code_model: code,
    code_base: codeSelected,
    location,
    value,
  });

  async function handleCodeSelected(valueCode: any) {

    if (allCodeSelect.includes(valueCode)) {
      setError({...error, error: true});
      return;
    }

    setError({ location: '', error: false });

    setCodeSelected(valueCode);

    setBody({ ...body, code_base: valueCode })

    handleAddPairing({...body, code_base: valueCode}, code);
  } 

  function update(event?: ChangeEvent<HTMLSelectElement>) {
    // eslint-disable-next-line array-callback-return
    const item: any = (Object.values(file).filter((item: any) => {
      if (item?.code_model === event?.target.options[event?.target.options.selectedIndex].value) {
        return item;
      }
    }))

    if (item) {
      setError({ ...error, location: item.location})
    }

    handleCodeSelected(event?.target.options[event?.target.options.selectedIndex].value)
  }

  return (
    <div>
      <div key={code} className="flex items-center space-x-5">
        <div>
          <p className={`lg:w-28 md:w-20 font-roboto font-medium text-[#5429CC] px-3.5 py-2.5 leading-6 border rounded-md text-center bg-[#f0f2f5] ${select && "text-[#6B7280]"}`}>{ select ? codeSelected : code}</p>
        </div>
        <div>
          { select ? (
            <select defaultValue={'DEFAULT'} id="select-primary" onChange={(event) => update(event)} className={`lg:w-96 md:w-72 px-3.5 py-2.5 border rounded-md border-[#D1D5DB] text-[#6B7280] bg-[#f0f2f5] text[#fff] ont-roboto font-medium outline-none`}>
              {file.map(({ code_model, location }: any) => (
                <>
                  <option value="DEFAULT" disabled hidden>Nome da instituição</option>
                  <option key={code_model + 'c'} value={code_model}>{location}</option>
                </>
              ))}
            </select>
            ) : (
              <div className={`lg:w-96 md:w-72 px-3.5 py-2.5 border rounded-md text-[#D1D5DB] bg-[#f0f2f5]`}>
                <p className="font-roboto font-medium text-[#6B7280]">{ location }</p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export const Pairing: React.FC = () => {

  const {sector_id} = useParams() as {sector_id: string}
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false)




  const { files } = useUpload();
  const { allBody, formatCSV } = usePairing();
  
  const headers = [
    { label: "Código base (sicgesp)", key: "code_base" },
    { label: "Locação", key: "location" },
    { label: "Valor", key: "value" }
  ]

  if (!files.sicgesp) return <Redirect to="/pairings" />


  async function handlePairinglSubmit(){


    const data = allBody.map((item: any) => {
      return {
        sector_id,
        base_code: item.code_base,
        value: item.value,
        place_name: item.location,
        model_code: "0000"
       }
    })

    console.log("FormattedData ")

    setIsLoading(true)

    await api.post('expense_sheet', data)

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
          { files?.local.map(({ code_model, location, value}: any) => (
            // <Row key={code_model} code={code_model} location={location} file={files?.sicgesp} value={value} />
            <div className={`flex justify-center py-5 bg-white rounded-md mb-2.5`}>
              <FieldGroup key={code_model + 'b'} code={code_model} location={location} />
              <h4 className="self-center lg:mx-8 md:mx-2 font-poppins font-bold lg:text-2xl md:text-xl text-[#5429CC]">=</h4>
              <FieldGroup key={code_model + 'selected'} code={code_model} location={location} value={value} select file={files?.sicgesp} />
          </div>
          ))}
        </div>

        {/* <div className="w-[72] mx-auto flex items-center justify-center gap-5">
          <button className="px-[28px] py-[13px] text-white font-bold text-sm mt-10 bg-blue rounded-lg">Atualizar planilha</button> */}

        <div className="w-[382px] mx-auto flex items-center justify-around">
          <button onClick={handlePairinglSubmit} className="px-[28px] py-[13px] text-white font-bold text-sm mt-10 bg-blue rounded-lg flex justify-center items-center">
            
            { 
              isLoading ? (<Oval color="#ffffff" height={24} strokeWidth={4} width={24} />) :'Atualizar planilha' 
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
