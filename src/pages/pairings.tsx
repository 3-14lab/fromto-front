import React, { useEffect, useState } from "react"

import { FileUploader, Header, ModalFile } from "../components"
import { useUpload } from "../hooks/upload"
import api from "../services/api";
import { useHistory, useParams } from "react-router-dom";

import TrashImg from '../img/trash.svg'


const titles = ['Nome', 'Arq. SICGESP', 'Arq. local', 'Modificação', 'Ação'];
const mock = [{ name: "São sebastião", arq: "sicgesp_pareamento...", local: "educacao_goiania_dez...", updatedAt: "01/12/2021"}, { name: "São sebastião", arq: "sicgesp_pareamento...", local: "educacao_goiania_dez...", updatedAt: "01/12/2021"}];

interface ExpenseSheetData {
  id: string,
  value: number,
  sector_id: string,
  place_name: string,
  base_code: string,
  model_code: string,
  created_at: Date
}

export const Pairings: React.FC = () => {
  const [isNewDataModalOpen, setIsNewDataModalOpen] = useState(false)
  const [expenseSheets, setExpenseSheets] = useState<ExpenseSheetData[]>([])
  const history = useHistory();

  const {sector_id} = useParams() as {sector_id: string}

  useEffect(()=>{

    async function  loadSector(){
      const response = await api.get(`expense_sheet/${sector_id}`);
      setExpenseSheets(response.data)

    }

    loadSector()

  }, [sector_id])

  function handleOpenNewDataModal(){
    setIsNewDataModalOpen(true)
  }

  function handleCloseNewDataModal(){
    setIsNewDataModalOpen(false)
  }

  function handlePairing(){
    history.push(`/pairing/${sector_id}`)
  }

  async function handleDelete(expenseSheet_id: string){
    await api.delete(`expense_sheet/${expenseSheet_id}`)
    const response = await api.get(`expense_sheet/${sector_id}`);
    setExpenseSheets(response.data)
  }

  const { files } = useUpload();
  console.log(files)

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
        <FileUploader placeholder="Clique aqui ou arraste o arquivo .csv no padrão SICGESP" label="Arquivo SICGESP" type="sicgesp" />
        <FileUploader placeholder="Clique aqui ou arraste o arquivo .csv sem padronização" label="Arquivo local" type="local" />
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

              <tr key={expenseSheet.id} >
                <td className="bg-white border-0 rounded py-4 px-8 text-body">{expenseSheet.place_name}</td>
                <td className="bg-white rounded py-4 px-8 text-body">{new Date(expenseSheet.created_at).toLocaleDateString('pt-br')}</td>
                <td className="bg-white rounded py-4 px-8 text-body">
                  <div className="flex">
                    <button onClick={() => handleDelete(expenseSheet.id)} >
                      <img className="pl-2" src={TrashImg} alt="" />
                    </button>
                  </div>
                </td>
              </tr>

            ))}
              
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}