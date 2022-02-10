import React, { useState } from "react"

import LogoImg from '../img/logo.svg'
import EditImg from '../img/edit.svg'
import TrashImg from '../img/trash.svg'
import Add from '../img/Icon.svg'

import { NewDataModal } from "../components/Modal"
import { Header, HeaderText, Table } from "../components"

const titles = ['Nome', 'Qtde. setores', 'Última Modificação', 'Ação'];
const mock = [{ name: "São sebastião", amount: 12, updatedAt: "01/12/2021"}, { name: "São sebastião", amount: 12, updatedAt: "01/12/2021"}];


const Item: React.FC = () => {
  const [open, setOpen] = useState(false);
const [isNewDataModalOpen, setIsNewDataModalOpen] = useState(false)

  function handleOpenNewDataModal(){
    setIsNewDataModalOpen(true)
  }

  function handleCloseNewDataModal(){
    setIsNewDataModalOpen(false)
  }

  return (
    <>
    <NewDataModal
          isOpen={isNewDataModalOpen}
          onRequestClose={handleCloseNewDataModal}
          placeholder="Insira o nome do setor"
          title="Cadastrar setor"
          firstLabelText="Nome"
      />
    <div className={` overflow-hidden px-5 pb-5 bg-white rounded-lg cursor-pointer transition-height duration-500 ease-in-out h-16 hover:h-72 mb-5`} onClick={() => setOpen(prev => !prev)}>
      <div className="grid grid-cols-5 w-full h-16  	">
        <div className="flex col-span-2	items-center text-body font-medium">Goiânia - GO</div>
        <div className="flex items-center text-body font-normal">2 setores</div>
        <div className="flex items-center text-body font-normal justify-center">01/12/2021</div>
        <div className="flex justify-end">
          <button>
            <img className="w-5 h-5" src={EditImg} alt="" />
          </button>
          <button>
            <img className="w-7 h-7 pl-2" src={TrashImg} alt="" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-5 bg-gray/100 w-full h-16 rounded-lg mb-2.5 px-5 hover:bg-gray/200">
        <div className="flex col-span-2	items-center text-body font-normal font-medium">Educação</div>
        <div className="flex items-center text-body font-normal">12 pareamentos</div>
        <div className="flex items-center text-body font-normal justify-center">01/12/2021</div>
        <div className="flex justify-end">
          <button>
            <img className="w-5 h-5" src={EditImg} alt="" />
          </button>
          <button>
            <img className="w-7 h-7 pl-2" src={TrashImg} alt="" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-5 bg-gray/100 w-full h-16 rounded-lg mb-2.5 px-5 hover:bg-gray/200">
      <div className="flex col-span-2	items-center text-body font-medium">Saúde</div>
        <div className="flex items-center text-body font-normal">12 pareamentos</div>
        <div className="flex items-center text-body font-normal justify-center">01/12/2021</div>
        <div className="flex justify-end">
          <button>
            <img className="w-5 h-5" src={EditImg} alt="" />
          </button>
          <button>
            <img className="w-7 h-7 pl-2" src={TrashImg} alt="" />
          </button>
        </div>
      </div>
      <div className="bg-gray/100 w-full h-16 rounded-lg mb-2.5 hover:bg-gray/200" onClick={handleOpenNewDataModal}>
        <div className="flex h-full items-center justify-start mx-5 gap-5 ">
          <img alt="adicionar setor"src={Add} />
          <p className="font-roboto font-medium text-sm	text-blue " >Novo Setor</p>
        </div>
      </div>
    </div>
    <div className={` overflow-hidden px-5 pb-5 bg-white rounded-lg cursor-pointer transition-height duration-500 ease-in-out h-16 hover:h-72	`} onClick={() => setOpen(prev => !prev)}>
    <div className="grid grid-cols-5 w-full h-16  	">
      <div className="flex col-span-2	items-center text-body font-medium">Goiânia - GO</div>
      <div className="flex items-center text-body font-normal">2 setores</div>
      <div className="flex items-center text-body font-normal justify-center">01/12/2021</div>
      <div className="flex justify-end">
        <button>
          <img className="w-5 h-5" src={EditImg} alt="" />
        </button>
        <button>
          <img className="w-7 h-7 pl-2" src={TrashImg} alt="" />
        </button>
      </div>
    </div>
    <div className="grid grid-cols-5 bg-gray/100 w-full h-16 rounded-lg mb-2.5 px-5 hover:bg-gray/200">
      <div className="flex col-span-2	items-center text-body font-normal font-medium">Educação</div>
      <div className="flex items-center text-body font-normal">12 pareamentos</div>
      <div className="flex items-center text-body font-normal justify-center">01/12/2021</div>
      <div className="flex justify-end">
        <button>
          <img className="w-5 h-5" src={EditImg} alt="" />
        </button>
        <button>
          <img className="w-7 h-7 pl-2" src={TrashImg} alt="" />
        </button>
      </div>
    </div>
    <div className="grid grid-cols-5 bg-gray/100 w-full h-16 rounded-lg mb-2.5 px-5 hover:bg-gray/200">
    <div className="flex col-span-2	items-center text-body font-medium">Saúde</div>
      <div className="flex items-center text-body font-normal">12 pareamentos</div>
      <div className="flex items-center text-body font-normal justify-center">01/12/2021</div>
      <div className="flex justify-end">
        <button>
          <img className="w-5 h-5" src={EditImg} alt="" />
        </button>
        <button>
          <img className="w-7 h-7 pl-2" src={TrashImg} alt="" />
        </button>
      </div>
    </div>
    <div className="bg-gray/100 w-full h-16 rounded-lg mb-2.5 hover:bg-gray/200">
      <div className="flex h-full items-center justify-start mx-5 gap-5 " onClick={handleOpenNewDataModal}>
        <img alt="adicionar setor"src={Add} />
        <p className="font-roboto font-medium text-sm	text-blue ">Novo Setor</p>
      </div>
    </div>
  </div>
  </>
  )
}
const City: React.FC = () => {
  

  return (
    <>
        <Header />

        

        <main className="mx-auto w-[70rem] ">
          <div className="flex justify-between items-center mt-10" >

            <HeaderText>Cidades</HeaderText>
            <button className="text-white font-medium text-xs border rounded-md bg-blue py-3 px-16 hover:brightness-90"  >Nova cidade</button>

          </div>


          <div className="mt-4" >
            <Item />
          </div>
        </main>
    </>
  )
}


export {City}