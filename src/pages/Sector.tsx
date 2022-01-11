import React, { useState } from "react"

import LogoImg from '../img/logo.svg'
import EditImg from '../img/edit.svg'
import TrashImg from '../img/trash.svg'
import { NewDataModal } from "../components/Modal"

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
      <header className="bg-blue" >

        <div className="mx-auto py-4 px-4 w-[74rem] flex items-center justify-between">
          <div className="flex items-center">
            <img  className="h-16" src={LogoImg} alt="logo" />
            <h1 className="text-white font-semibold text-xl ml-4" >DePara</h1>
          </div>
          <div>
            <h1 className="text-white font-semibold text-sm" >Paulo Henrique Rosa</h1>
            <p className="text-white font-light text-xs mt-0" >paulohenriquerosa@gmail.com</p>
          </div>
        </div>

      </header>

      <main className="mx-auto py-4 px-4 w-[74rem] ">

      <NewDataModal
        isOpen={isNewDataModalOpen}
        onRequestClose={handleCloseNewDataModal}
        placeholder="Nome"
        title="Criar novo setor"
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

        </div>

      </main>

    </>
  )

}


export {Sector}