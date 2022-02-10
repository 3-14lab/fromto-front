import React, { useState } from "react"

import LogoImg from '../img/logo.svg'
import EditImg from '../img/edit.svg'
import TrashImg from '../img/trash.svg'
import { NewDataModal } from "../components/Modal"
import { Header, Table } from "../components"

const titles = ['Nome', 'Qtde. setores', 'Última Modificação', 'Ação'];
const mock = [{ name: "São sebastião", arq: "sicgesp_pareamento...", local: "educacao_goiania_dez...", updatedAt: "01/12/2021"}, { name: "São sebastião", arq: "sicgesp_pareamento...", local: "educacao_goiania_dez...", updatedAt: "01/12/2021"}];


const Sector: React.FC = () => {

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

      <main className="mx-auto py-4 px-4 w-[74rem] ">

      <NewDataModal
        isOpen={isNewDataModalOpen}
        onRequestClose={handleCloseNewDataModal}
        placeholder="Nome"
        title="Cadastrar setor"
     
      />

        <div className="flex justify-between items-center" >

          <h1 className="text-2xl font-bold text-title ">Meus setores</h1>
          <button onClick={handleOpenNewDataModal} className="text-white font-medium text-xs border rounded-md bg-blue py-3 px-16 hover:brightness-90"  >Novo setor</button>

        </div>


        <div className="mt-4" >

          <table className="w-full" >
            <thead>
              <tr >
                <th className="text-body font-normal py-4 px-8 text-left leading-6">Nome</th>
                <th className="text-body font-normal py-4 px-8 text-left leading-6">Quantidade</th>
                <th className="text-body font-normal py-4 px-8 text-left leading-6">Modificação</th>
                <th className="text-body font-normal py-4 px-8 text-left leading-6">Ação</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="bg-white border-0 rounded py-4 px-8 text-body">São sebastião</td>
                <td className="bg-white rounded py-4 px-8 text-body">12 setores</td>
                <td className="bg-white rounded py-4 px-8 text-body">01/12/2021</td>
                <td className="bg-white rounded py-4 px-8 text-body">
                  <div className="flex">
                    <button >
                      <img  src={EditImg} alt="" />
                    </button>
                    <button>
                      <img className="pl-2" src={TrashImg} alt="" />
                    </button>
                  </div>
                </td>
              </tr>
              
              <tr>
                <td className="bg-white border-0 rounded py-4 px-8 text-body">São sebastião</td>
                <td className="bg-white rounded py-4 px-8 text-body">12 setores</td>
                <td className="bg-white rounded py-4 px-8 text-body">01/12/2021</td>
                <td className="bg-white rounded py-4 px-8 text-body">
                  <div className="flex">
                    <button >
                      <img  src={EditImg} alt="" />
                    </button>
                    <button>
                      <img className="pl-2" src={TrashImg} alt="" />
                    </button>
                  </div>
                </td>
              </tr>
              
              <tr>
                <td className="bg-white border-0 rounded py-4 px-8 text-body">São sebastião</td>
                <td className="bg-white rounded py-4 px-8 text-body">12 setores</td>
                <td className="bg-white rounded py-4 px-8 text-body">01/12/2021</td>
                <td className="bg-white rounded py-4 px-8 text-body">
                  <div className="flex">
                    <button >
                      <img  src={EditImg} alt="" />
                    </button>
                    <button>
                      <img className="pl-2" src={TrashImg} alt="" />
                    </button>
                  </div>
                </td>
              </tr>
              
              <tr>
                <td className="bg-white border-0 rounded py-4 px-8 text-body">São sebastião</td>
                <td className="bg-white rounded py-4 px-8 text-body">12 setores</td>
                <td className="bg-white rounded py-4 px-8 text-body">01/12/2021</td>
                <td className="bg-white rounded py-4 px-8 text-body">
                  <div className="flex">
                    <button >
                      <img  src={EditImg} alt="" />
                    </button>
                    <button>
                      <img className="pl-2" src={TrashImg} alt="" />
                    </button>
                  </div>
                </td>
              </tr>
              
              <tr>
                <td className="bg-white border-0 rounded py-4 px-8 text-body">São sebastião</td>
                <td className="bg-white rounded py-4 px-8 text-body">12 setores</td>
                <td className="bg-white rounded py-4 px-8 text-body">01/12/2021</td>
                <td className="bg-white rounded py-4 px-8 text-body">
                  <div className="flex">
                    <button >
                      <img  src={EditImg} alt="" />
                    </button>
                    <button>
                      <img className="pl-2" src={TrashImg} alt="" />
                    </button>
                  </div>
                </td>
              </tr>
              
            </tbody>
          </table>

          <div className="mt-4" >
          <Table data={mock} titles={titles} />
          </div>

        </div>

      </main>

    </>
  )

}


export {Sector}