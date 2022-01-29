import React, { useState, useEffect } from "react"

import { NewDataModal } from "../components/Modal"
import { Header, HeaderText, Table } from "../components"

import { useAuth } from '../hooks/auth'

import api from '../services/api';

const mock = [{ name: "São sebastião", amount: 12, updatedAt: "01/12/2021"}, { name: "São sebastião", amount: 12, updatedAt: "01/12/2021"}];


interface CityData {
  name: string,
  amount: number,
  updatedAt: Date
}


const City: React.FC = () => {
  const [isNewDataModalOpen, setIsNewDataModalOpen] = useState(false)
  const [cities, setCities] = useState<CityData[]>([])

  const { user } = useAuth()

  useEffect(()=>{

    api.get('city', { data:{ user_id: user.id} }).then(response => {
      setCities(response.data)
    })


  }, [user])

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
          <Table data={cities} />
        </div>
      </main>
    </>
  )
}


export {City}