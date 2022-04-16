import React, { useEffect, useState } from "react"
import api from "@services/api"
import { useAuth } from "@hooks/auth"

import { Link, useParams } from 'react-router-dom'
import TrashImg from '@image/trash.svg'
import { Modal } from "@components"
import { Header, Table } from "@components"
import { createSector, deleteSector, getSectorByCity } from "@services/sector"

const titles = ['Nome', 'Qtde. setores', 'Última Modificação', 'Ação'];
const mock = [{ name: "São sebastião", arq: "sicgesp_pareamento...", local: "educacao_goiania_dez...", updatedAt: "01/12/2021"}, { name: "São sebastião", arq: "sicgesp_pareamento...", local: "educacao_goiania_dez...", updatedAt: "01/12/2021"}];

interface SectorData {
  id: string,
  name: string,
  amount: number,
  created_at: Date
}

const Sector: React.FC = () => {

  const [isNewDataModalOpen, setIsNewDataModalOpen] = useState(false)
  const [sectors, setSectors] = useState<SectorData[]>([])

  const { user } = useAuth()
  
  const {city_id} = useParams() as {city_id: string}

  const loadSector = async () => {
    const response = await getSectorByCity(city_id);
    setSectors(response)
  }

  useEffect(()=>{
    loadSector()
  }, [])

  function handleOpenNewDataModal(){
    setIsNewDataModalOpen(true)
  }

  function handleCloseNewDataModal(){
    setIsNewDataModalOpen(false)
  }

  async function handleModalSubmit(name: string, type: string){
    await createSector({name, city_id, type});

    loadSector()
  }

  async function handleDeleteSector(sector_id: string) { 
    await deleteSector(sector_id)
    loadSector()
  }

  return (
    <>
      <Header />

      <main className="mx-auto py-4 px-4 w-[74rem] ">

      <Modal
        isOpen={isNewDataModalOpen}
        onRequestClose={handleCloseNewDataModal}
        placeholder="Nome"
        title="Cadastrar setor"
        handleSubmit={handleModalSubmit}
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
                <th className="text-body font-normal py-4 px-8 text-left leading-6">Modificação</th>
                <th className="text-body font-normal py-4 px-8 text-left leading-6">Ação</th>
              </tr>
            </thead>

            <tbody>

              {sectors.map(sector => (  

                <Link to={`/pairings/${sector.id}`}>
                  <tr key={sector.id} className="bg-white text-body text-sm" >
              
                    <td className="bg-white border-0 rounded py-4 px-8 text-body">{sector.name}</td>
                    <td className="bg-white rounded py-4 px-8 text-body">{new Date(sector.created_at).toLocaleDateString('pt-br')}</td>
                    <td className="bg-white rounded py-4 px-8 text-body">
                      <div className="flex">
                        <button onClick={()=> handleDeleteSector(sector.id)} >
                          <img className="pl-2" src={TrashImg} alt="" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </Link>

            ))}
              
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