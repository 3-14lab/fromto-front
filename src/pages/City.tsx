import React, { useState, useEffect } from "react";
import api from "@services/api";

import { useAuth } from "@hooks/auth";

import { Header, HeaderText, Modal, CityBox } from "@components";

import { Oval } from "react-loader-spinner";

export interface SectorData {
  id: string;
  name: string;
  type: string;
  createdTime: Date;
  pairing_amount: number;
}

export interface CityData {
  id: string;
  name: string;
  createdTime: Date;
  sectors: SectorData[];
  sector_amount: number;
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
      const response = await api.get("user/cities");
      const citiesWithSectors = await Promise.all(
        response.data?.map(async (city: any) => {
          const response = await api.get(`city/sectors/?city_id=${city.id}`);
          console.log(response)
          
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
    const response = await api.get("user/cities");
    const citiesWithSectors = await Promise.all(
      response.data?.map(async (city: any) => {
        const response = await api.get(`city/sectors/?city_id=${city.id}`);

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

    handleUpdateCitiesAndSectors();
  }

  async function handleModalSubmitNewSector(data: string, typeSector: string) {
    await api.post("sector", {
      name: data,
      type: typeSector,
      city_id: cityIdInModal,
    });
    handleUpdateCitiesAndSectors();
  }

  async function handleDelete(city_id: string) {
    await api.delete(`city/?city_id=${city_id}`);

    handleUpdateCitiesAndSectors();
  }

  async function handleDeleteSector(sector_id: string) {
    await api.delete(`sector/?sector_id=${sector_id}`);
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
        sector={false}
      />

      <Modal
        isOpen={isNewSectorModalOpen}
        onRequestClose={handleCloseNewSectorModal}
        placeholder="Nome"
        title="Cadastrar setor"
        firstLabelRadio="Demais setores"
        secondLabelRadio="Serviços de Terceiros - PJ"
        handleSubmit={handleModalSubmitNewSector}
        sector={true}
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
                labelTextButton="Novo Setor"
                pathname="/pairings"
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
