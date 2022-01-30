import React, { useEffect, useState } from "react"

import { useParams } from 'react-router-dom'
import LogoImg from '../img/logo.svg'
import TrashImg from '../img/trash.svg'
import { NewDataModal } from "../components/Modal"
import api from "../services/api"
import { useAuth } from "../hooks/auth"


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


  useEffect(()=>{

    async function  loadSector(){
      const response = await api.get(`sector/city/${city_id}`);
      setSectors(response.data)

    }

    loadSector()

  }, [user, city_id])


  function handleOpenNewDataModal(){
    setIsNewDataModalOpen(true)
  }

  function handleCloseNewDataModal(){
    setIsNewDataModalOpen(false)
  }

  async function handleModalSubmit(data: string){

    await api.post('sector', { 
        name: data,
        city_id
    })

    const response = await api.get(`sector/city/${city_id}`);
    setSectors(response.data)
    
  }
  async function handleDeleteSector(sector_id: string) { 
    await api.delete(`sector/${sector_id}`)
    const response = await api.get(`sector/city/${city_id}`);
    setSectors(response.data)
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

              <tr key={sector.id} >
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

            ))}
              
            </tbody>
          </table>

        </div>

      </main>

    </>
  )

}


export {Sector}