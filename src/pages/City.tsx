import React, { useState, useEffect } from "react";
import api from "../services/api";

import { useAuth } from "../hooks/auth";

import { Header, HeaderText, Modal, CityBox } from "@components";

import { Oval } from "react-loader-spinner";

export interface SectorData {
  id: string;
  name: string;
  amount: number;
  created_at: Date;
}

export interface CityData {
  id: string;
  name: string;
  amount: number;
  created_at: Date;
  sectors: SectorData[];
}

const City: React.FC = () => {
  const [isNewCityModalOpen, setIsNewCityModalOpen] = useState(false);
  const [cityIdInModal, setCityIdInModal] = useState<string>();
  const [isNewSectorModalOpen, setIsNewSectorModalOpen] = useState(false);
  const [cities, setCities] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    async function loadCitiesAndSectors() {
      const response = await api.get(`city/user/${user.id}`);
      const citiesWithSectors = await Promise.all(
        response.data?.map(async (city: any) => {
          const response = await api.get(`sector/city/${city.id}`);

          return { ...city, sectors: response.data };
        })
      );

      setCities(citiesWithSectors);
      setLoading(false);
    }

    loadCitiesAndSectors();
  }, [user]);

  function handleOpenNewCityModal() {
    setIsNewCityModalOpen(true);
  }

  function handleCloseNewCityModal() {
    setIsNewCityModalOpen(false);
  }

  function handleOpenNewSectorModal(city_id: string) {
    return () => {
      setIsNewSectorModalOpen(true);
      setCityIdInModal(city_id);
    };
  }

  function handleCloseNewSectorModal() {
    setIsNewSectorModalOpen(false);
  }

  async function handleUpdateCitiesAndSectors() {
    const response = await api.get(`city/user/${user.id}`);
    const citiesWithSectors = await Promise.all(
      response.data?.map(async (city: any) => {
        const response = await api.get(`sector/city/${city.id}`);

        return { ...city, sectors: response.data };
      })
    );

    setCities(citiesWithSectors);
    setLoading(false);
  }

  async function handleModalSubmit(data: string) {
    await api.post("city", {
      name: data,
      user_id: user.id,
    });

    const response = await api.get(`city/user/${user.id}`);
    setCities(response.data);
  }

  async function handleModalSubmitNewSector(data: string) {
    await api.post("sector", {
      name: data,
      city_id: cityIdInModal,
    });
    handleUpdateCitiesAndSectors();
  }

  async function handleDelete(city_id: string) {
    await api.delete(`city/${city_id}`);

    const response = await api.get(`city/user/${user.id}`);
    setCities(response.data);
  }

  async function handleDeleteSector(sector_id: string) {
    await api.delete(`sector/${sector_id}`);
    handleUpdateCitiesAndSectors();
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
        <div className="flex justify-between items-center mt-10">
          <HeaderText>Cidades</HeaderText>
          <button
            onClick={handleOpenNewCityModal}
            className="text-white font-medium text-xs border rounded-md bg-blue py-3 px-16 hover:brightness-90"
          >
            Nova cidade
          </button>
        </div>

        {loading ? (
          <Oval color="#ffffff" height={24} strokeWidth={4} width={24} />
        ) : (
          <>
            <div className="grid grid-cols-5 w-full h-16 mt-4">
              <div className="flex col-span-2	items-center text-title font-poppins font-normal ml-8">
                Nome
              </div>
              <div className="flex items-center text-title font-poppins font-normal">
                Qtde.setores
              </div>
              <div className="flex items-center justify-center text-title font-poppins font-normal">
                Última Modificação
              </div>
              <div className="flex items-center justify-end mr-6 text-title font-poppins font-normal">
                Ação
              </div>
            </div>
            {cities?.map((city) => (
              <CityBox
                key={city.id}
                city={city}
                handleDeleteCity={handleDelete}
                handleDeleteSector={handleDeleteSector}
                handleOpenNewSectorModal={handleOpenNewSectorModal}
              />
            ))}
          </>
        )}
      </main>
    </>
  );
};

export { City };
