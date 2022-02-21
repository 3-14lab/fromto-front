import React, { useEffect, useState } from "react";
import { FileUploader, Header, ModalFile } from "../components"
import { useUpload } from "../hooks/upload"
import api from "../services/api";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";

import TrashImg from '../img/trash.svg'

interface ExpenseSheetData {
  id: string,
  value: number,
  sector_id: string,
  name: string,
  place_name: string,
  base_code: string,
  model_code: string,
  created_at: Date
  data: any;
}


const templates = [{
  id: '123423432fasdfdsf',
  name: 'Janeiro',
}]

export const Pairings: React.FC = () => {
  const [isNewDataModalOpen, setIsNewDataModalOpen] = useState(false)
  const [expenseSheets, setExpenseSheets] = useState<ExpenseSheetData[]>([])
  const [templateSelect, setTemplateSelect] = useState("");

  const history = useHistory();

  const {sector_id} = useParams() as {sector_id: string}
  const location = useLocation();
  
  useEffect(()=>{

    async function  loadSector(){
      const response = await api.get(`pairings/${sector_id}`);
      setExpenseSheets(response.data)
      console.log(response.data)
    }

    loadSector()

  }, [sector_id])

  function handleOpenNewDataModal(){
    setIsNewDataModalOpen(true)
  }

  function handleCloseNewDataModal(){
    setIsNewDataModalOpen(false)
  }

  function handlePairing(name: string){
    if (templateSelect !== "") {
      const templ = expenseSheets.find(item => item.id === templateSelect)!.data.map((item: any) => {
        delete item.created_at
        delete item.id
        delete item.pairing_id
        delete item.updated_at
        
        return item;
       })
      history.push({pathname: `/pairing/${sector_id}`, state: { pairingName: name, data: templ }})
      return;
    }

    history.push({pathname: `/pairing/${sector_id}`, state: { pairingName: name }})
  }

  async function handleDelete(expenseSheet_id: string){
    await api.delete(`pairings/${expenseSheet_id}`)
    const response = await api.get(`pairing/${sector_id}`);
    setExpenseSheets(response.data)
  }

  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  function handleNextPage(id: string, data: any) {
    history.push({ pathname: `/pairing/view/${id}`, state: { data }});
  }

  return (
    <>
      <Header />
        
      <ModalFile
        isOpen={isNewDataModalOpen}
        onRequestClose={handleCloseNewDataModal}
        placeholder="Nome"
        title="Cadastrar pareamento"
        handleSumit={handlePairing}
      >
        {/* <FileUploader placeholder="Clique aqui ou arraste o arquivo .csv no padrão SICGESP" label="Arquivo SICGESP" type="sicgesp" /> */}
        <FileUploader placeholder="Clique aqui ou arraste o arquivo .csv sem padronização" label="Arquivo local" type="local" />

        <div className="flex gap-1 items-center">
          <label className="font-roboto font-medium text-blue text-sm">
              Template de pareamento
          </label>
          <div className="relative cursor-pointer" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <HiInformationCircle color="#5429CC"/>
            {isOpen && (
              <div className="w-80 absolute bottom-[-6] left-1 bg-[#0000008e] text-white text-xs font-medium px-2 py-1 border-none rounded">
                Selecione um pareamento anterior e utilize a mesma paridade de lotações para este novo pareamento!
              </div>
            )}
          </div>
        </div>
        <select 
          onChange={({ target }) => {
            setTemplateSelect(target.value);
          }} 
          defaultValue={'DEFAULT'} id="select-primary" className={`lg:w-full md:w-72 px-3.5 py-2.5 mt-0.5 border rounded-md border-[#D1D5DB] text-[#6B7280] bg-[#f0f2f5] text[#fff] ont-roboto font-medium outline-none`}>
          {expenseSheets.map(({ id, name }: any) => (
            <>
              <option value="DEFAULT" disabled hidden>Nenhum (padrão)</option>
              <option key={id} value={id}>{name}</option>
            </>
          ))}
        </select>
      </ModalFile>

      <main className="mx-auto py-4 px-4 w-[74rem] ">
        <div className="flex justify-between items-center" >
          <section className="flex items-end my-10 space-x-8 ">
                <h1 className="text-[#374151] font-roboto font-medium text-4xl">Pareamento</h1>
                <h3 className="font-roboto font-medium text-2xl	text-[#6B7280]">Goiânia - GO | Educação | Dezembro</h3>
          </section>
          <button onClick={handleOpenNewDataModal} className="text-white font-medium text-xs border rounded-md bg-blue py-3 px-16 hover:brightness-90"  >Novo Pareamento</button>
        </div>


        <div className="mt-4" >
        <table className="w-full" >
            <thead>
              <tr >
                <th className="text-body font-normal py-4 px-8 text-left leading-6">Nome</th>
                <th className="text-body font-normal py-4 px-8 text-left leading-6">Modificação</th>
                <th className="text-body font-normal py-4 px-8 text-left leading-6">Ação</th>
              </tr>
            </thead>

            <tbody>

              {expenseSheets.map(expenseSheet => (  
                // <Link to={`/pairing/view/${expenseSheet.id}`}>
                  <tr key={expenseSheet.id} onClick={() => handleNextPage(expenseSheet.id, expenseSheet.data)} className="w-full cursor-pointer hover:bg-text">
                    <td className="bg-white border-0 rounded py-4 px-8 text-body">{expenseSheet.name}</td>
                    <td className="bg-white  py-4 px-8 text-body">{new Date(expenseSheet.created_at).toLocaleDateString('pt-br')}</td>
                    <td className="bg-white rounded py-4 px-8 text-body">
                      <div className="z-50">
                        <button onClick={() => handleDelete(expenseSheet.id)} >
                          <img className="pl-2" src={TrashImg} alt="" />
                        </button>
                      </div>
                    </td>
                  </tr>
              // </Link>
            ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}