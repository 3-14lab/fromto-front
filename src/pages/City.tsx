import React, { useState } from "react"

import LogoImg from '../img/logo.svg'
import EditImg from '../img/edit.svg'
import TrashImg from '../img/trash.svg'
import { NewDataModal } from "../components/Modal"
import { Header, HeaderText, Table } from "../components"

const mock = [{ name: "São sebastião", amount: 12, updatedAt: "01/12/2021"}, { name: "São sebastião", amount: 12, updatedAt: "01/12/2021"}];

const City: React.FC = () => {
  const [isNewDataModalOpen, setIsNewDataModalOpen] = useState(false)

  function handleOpenNewDataModal(){
    setIsNewDataModalOpen(true)
  }

  function handleCloseNewDataModal(){
    setIsNewDataModalOpen(false)
  }

  return (
    <>
      <Header />

      <NewDataModal
        isOpen={isNewDataModalOpen}
        onRequestClose={handleCloseNewDataModal}
        placeholder="Nome"
        title="Criar nova cidade"
      />

      <main className="mx-auto py-4 px-4 w-[74rem] ">
        <div className="flex justify-between items-center" >

          <HeaderText>Minhas cidades</HeaderText>
          <button onClick={handleOpenNewDataModal} className="text-white font-medium text-xs border rounded-md bg-blue py-3 px-16 hover:brightness-90"  >Nova cidade</button>

        </div>


        <div className="mt-4" >
          <Table data={mock} />
        </div>
      </main>
    </>
  )
}


export {City}