import React, { useState } from "react"

import LogoImg from '../img/logo.svg'
import EditImg from '../img/edit.svg'
import TrashImg from '../img/trash.svg'
import { NewDataModal } from "../components/Modal"
import { FileUploader, Header, HeaderText, Table } from "../components"
import { useUpload } from "../hooks/upload"

const titles = ['Nome', 'Arq. SICGESP', 'Arq. local', 'Modificação', 'Ação'];
const mock = [{ name: "São sebastião", arq: "sicgesp_pareamento...", local: "educacao_goiania_dez...", updatedAt: "01/12/2021"}, { name: "São sebastião", arq: "sicgesp_pareamento...", local: "educacao_goiania_dez...", updatedAt: "01/12/2021"}];

export const Pairings: React.FC = () => {
  const [isNewDataModalOpen, setIsNewDataModalOpen] = useState(false)

  function handleOpenNewDataModal(){
    setIsNewDataModalOpen(true)
  }

  function handleCloseNewDataModal(){
    setIsNewDataModalOpen(false)
  }

  const { files } = useUpload();
  console.log(files)

  return (
    <>
      <Header />
        
      <NewDataModal
        isOpen={isNewDataModalOpen}
        onRequestClose={handleCloseNewDataModal}
        placeholder="Nome"
        title="Cadastrar pareamento"
      >
        <FileUploader placeholder="Clique aqui ou arraste o arquivo .csv no padrão SICGESP" label="Arquivo SICGESP" type="sicgesp" />
        <FileUploader placeholder="Clique aqui ou arraste o arquivo .csv sem padronização" label="Arquivo local" type="local" />
      </NewDataModal>

      <main className="mx-auto py-4 px-4 w-[74rem] ">
        <div className="flex justify-between items-center" >
          <section className="flex items-end my-10 space-x-8 ">
                <h1 className="text-[#374151] font-roboto font-medium text-4xl">Pareamento</h1>
                <h3 className="font-roboto font-medium text-2xl	text-[#6B7280]">Goiânia - GO | Educação | Dezembro</h3>
          </section>
          <button onClick={handleOpenNewDataModal} className="text-white font-medium text-xs border rounded-md bg-blue py-3 px-16 hover:brightness-90"  >Novo Pareamento</button>
        </div>


        <div className="mt-4" >
          <Table data={mock} titles={titles} />
        </div>
      </main>
    </>
  )
}