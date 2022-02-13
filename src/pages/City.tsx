import React, { useState, useEffect } from "react"
import api from '../services/api';

import { useAuth } from '../hooks/auth'

import EditImg from '../img/edit.svg'
import TrashImg from '../img/trash.svg'
import Add from '../img/Icon.svg'

import { Header, HeaderText, Modal } from "../components"


import { Oval } from 'react-loader-spinner'
import { Link } from "react-router-dom"

interface SectorData {
  id: string,
  name: string,
  amount: number,
  created_at: Date
}

interface CityData {
  id: string,
  name: string,
  amount: number,
  created_at: Date
  sectors: SectorData[]
}


const City: React.FC = () => {
  const [isNewCityModalOpen, setIsNewCityModalOpen] = useState(false)
  const [cityIdInModal, setCityIdInModal] = useState<string>()
  const [isNewSectorModalOpen, setIsNewSectorModalOpen] = useState(false)
  const [cities, setCities] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const { user } = useAuth()

  useEffect(() => {

    async function loadCitiesAndSectors() {
      const response = await api.get(`city/user/${user.id}`);
      const citiesWithSectors = await Promise.all(response.data?.map(async (city: any) => {
        const response = await api.get(`sector/city/${city.id}`);

        return { ...city, sectors: response.data }
      }))

      setCities(citiesWithSectors)
      setLoading(false);
    }

    loadCitiesAndSectors()

  }, [user])

  console.log(JSON.stringify(cities, null, 2))

  function handleOpenNewCityModal() {
    setIsNewCityModalOpen(true)
  }

  function handleCloseNewCityModal() {
    setIsNewCityModalOpen(false)
  }

  function handleOpenNewSectorModal(city_id: string) {
    return () => {
      setIsNewSectorModalOpen(true)
      setCityIdInModal(city_id)
    }
  }

  function handleCloseNewSectorModal() {
    setIsNewSectorModalOpen(false)
  }

  async function handleUpdateCitiesAndSectors() {
    const response = await api.get(`city/user/${user.id}`);
    const citiesWithSectors = await Promise.all(response.data?.map(async (city: any) => {
      const response = await api.get(`sector/city/${city.id}`);

      return { ...city, sectors: response.data }
    }))

    setCities(citiesWithSectors)
    setLoading(false);
  }

  async function handleModalSubmit(data: string) {

    await api.post('city', {
      name: data,
      user_id: user.id
    })

    const response = await api.get(`city/user/${user.id}`);
    setCities(response.data)

  }

  async function handleModalSubmitNewSector(data: string) {

    await api.post('sector', {
      name: data,
      city_id: cityIdInModal
    })
    handleUpdateCitiesAndSectors()
  }

  async function handleDelete(city_id: string) {

    await api.delete(`city/${city_id}`)

    const response = await api.get(`city/user/${user.id}`);
    setCities(response.data)

  }

  async function handleDeleteSector(sector_id: string) {
    await api.delete(`sector/${sector_id}`)
    handleUpdateCitiesAndSectors()
  }

  return (
    <>
      <Header />

      <Modal
        isOpen={isNewCityModalOpen}
        onRequestClose={handleCloseNewCityModal}
        placeholder="Nome"
        title="Cadastrar cidade"
        handleSubmit={handleModalSubmit}
      />

      <Modal
        isOpen={isNewSectorModalOpen}
        onRequestClose={handleCloseNewSectorModal}
        placeholder="Nome"
        title="Cadastrar setor"
        handleSubmit={handleModalSubmitNewSector}
      />
      <main className="mx-auto w-[70rem] ">
        <div className="flex justify-between items-center mt-10" >

          <HeaderText>Cidades</HeaderText>
          <button onClick={handleOpenNewCityModal} className="text-white font-medium text-xs border rounded-md bg-blue py-3 px-16 hover:brightness-90"  >Nova cidade</button>

        </div>

        {loading ? (<Oval color="#ffffff" height={24} strokeWidth={4} width={24} />) : (
          <>
            <div className="grid grid-cols-5 w-full h-16 mt-4">
              <div className="flex col-span-2	items-center text-title font-poppins font-normal ml-8">Nome</div>
              <div className="flex items-center text-title font-poppins font-normal">Qtde.setores</div>
              <div className="flex items-center justify-center text-title font-poppins font-normal">Última Modificação</div>
              <div className="flex items-center justify-end mr-6 text-title font-poppins font-normal">Ação</div>
            </div>
            {cities?.map(({ name, amount, created_at, id, sectors }) => (
              <div className="grid gap-y-0.5">
                <div className={`overflow-hidden px-5 pb-5 bg-white rounded-lg transition-height duration-500 ease-in-out h-16 hover:h-72 mb-5`} onClick={() => setOpen(prev => !prev)}>
                  <div className="grid grid-cols-5 w-full h-16">
                    <div className="flex col-span-2	items-center text-body font-medium">{name}</div>
                    <div className="flex items-center text-body font-normal">{`${amount} ${amount === 1 ? "setor" : "setores"}`}</div>
                    <div className="flex items-center text-body font-normal justify-center">{new Date(created_at).toLocaleDateString('pt-br')}</div>
                    <div className="flex justify-end">
                      <button>
                        <img className="w-5 h-5" src={EditImg} alt="" />
                      </button>
                      <button onClick={() => handleDelete(id)}>
                        <img className="w-7 h-7 pl-2" src={TrashImg} alt="" />
                      </button>
                    </div>
                  </div>
                  {sectors?.map(({ name, created_at, id }: SectorData) => (
                    <div className="flex bg-gray/100 w-full h-16 rounded-lg mb-2.5 px-5 hover:bg-gray/200">
                      <Link to={{ pathname: `/pairings/${id}`, state: { view: true } }} className="flex flex-1 justify-between hover:bg-gray/200">
                        <div className="grid grid-cols-7 bg-gray/100 w-full hover:bg-gray/200">
                          <div className="flex col-span-3	items-center text-body font-medium">{name}</div>
                          <div className="flex col-span-2 items-center text-body font-normal">12 pareamentos</div>
                          <div className="flex items-center text-body font-normal">{new Date(created_at).toLocaleDateString('pt-br')}</div>
                        </div>
                      </Link>
                      <div className="flex justify-end pl-2">
                        <button>
                          <img className="w-7 h-5 pl-2" src={EditImg} alt="" />
                        </button>
                        <button onClick={() => handleDeleteSector(id)}>
                          <img className="w-7 h-7 pl-2" src={TrashImg} alt="" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="bg-gray/100 w-full h-16 rounded-lg mb-2.5 hover:bg-gray/200" onClick={handleOpenNewSectorModal(id)}>
                    <div className="flex h-full items-center justify-start mx-5 gap-5  cursor-pointer">
                      <img alt="adicionar setor" src={Add} />
                      <p className="font-roboto font-medium text-sm	text-blue " >Novo Setor</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </main>
    </>
  )
}

export { City }