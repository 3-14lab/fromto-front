import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { CityData } from "@pages/City";
import { FaCheck } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";

import EditImg from "@image/edit.svg";
import TrashImg from "@image/trash.svg";
import { editCity } from "@services/city";
import { editSector } from "@services/sector";

type props = {
  city: CityData;
  labelTextButton: string;
  pathname: string;
  handleDeleteCity: (id: string) => void;
  handleDeleteSector: (id: string) => void;
  handleOpenNewSectorModal: (id: string) => void;
};

function SectorList({
  sector: { name: sector_name, type, id, pairing_amount, createdTime },
  pathname,
  labelTextButton,
  name,
}: any) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [editName, setEditName] = useState(sector_name);
  const [isEditing, setEditing] = useState(false);

  async function handleEditDisable(id: string) {
    if (sector_name !== editName) await editSector(id, type, editName);
    setEditing((prev: boolean) => !prev);
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="flex bg-gray/100 w-full h-16 rounded-lg mb-2.5 px-5 hover:bg-gray/200">
      <Link
        to={{
          pathname: `${pathname}/${id}`,
          state: { city_name: name, sector_name, type },
        }}
        className="flex flex-1 justify-between hover:bg-gray/200"
      >
        <div className="grid grid-cols-7 bg-gray/100 w-full hover:bg-gray/200">
          <div className="flex items-center">
            <input
              ref={inputRef}
              value={editName}
              onChange={({ target }) => setEditName(target.value)}
              disabled={!isEditing}
              className="outline-body flex items-center text-body font-medium p-2 bg-transparent"
            />
          </div>
          <small className="flex items-center col-span-2 text-body font-roboto font-light text-sm m-auto">
            {type === "DEFAULT_SECTOR"
              ? "Demais setores"
              : "Serviços de terceiros"}
          </small>
          <div className="flex col-span-2 items-center text-body font-normal">
            {`${pairing_amount} ${
              pairing_amount > 1 ? "pareamentos" : "pareamento"
            }`}
          </div>
          <div className="flex items-center text-body font-normal">
            {new Date(createdTime).toLocaleDateString("pt-br")}
          </div>
        </div>
      </Link>
      <div className="flex justify-end pl-2">
        {isEditing ? (
          <button onClick={() => handleEditDisable(id)}>
            <FaCheck size={24} color="green" className="mr-2" />
          </button>
        ) : (
          <button
            onClick={() => {
              handleEditDisable(id);
            }}
          >
            <img className="w-7 h-5 pl-2" src={EditImg} alt="" />
          </button>
        )}
        <button
          onClick={() => {
            //handleDeleteSector(id)
          }}
        >
          <img className="w-7 h-7 pl-2" src={TrashImg} alt="" />
        </button>
      </div>
    </div>
  );
}

function CityBox({
  city,
  labelTextButton,
  pathname,
  handleDeleteCity,
  handleDeleteSector,
  handleOpenNewSectorModal,
}: props) {
  const { name, createdTime, id, sectors, sector_amount } = city;
  const inputRef = useRef<HTMLInputElement>(null);
  const [editName, setEditName] = useState<string>(name);
  const [editDisable, setEditDisable] = useState<boolean>(true);

  function handleEditName(text: string) {
    setEditName(text);
  }

  async function handleEditDisable(id: string) {
    if (name !== editName) await editCity(id, editName);
    setEditDisable((prev: boolean) => !prev);
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [editDisable]);

  return (
    <div key={id} className="grid gap-y-0.5">
      <div
        className={`overflow-hidden px-5 pb-5 bg-white rounded-lg transition-height duration-500 ease-in-out h-16 mb-5 hover:h-fit`}
      >
        <div className={`grid grid-cols-5 w-full h-16`}>
          <div className="flex items-center col-span-2">
            <input
              ref={inputRef}
              value={editName}
              onChange={({ target }) => handleEditName(target.value)}
              disabled={editDisable}
              className="outline-body flex items-center text-body font-medium p-2 bg-transparent"
            />
          </div>
          <div className="flex items-center text-body font-normal">
            {`${sector_amount} ${sector_amount === 1 ? "setor" : "setores"}`}
          </div>
          <div className="flex items-center text-body font-normal justify-center">
            {new Date(createdTime).toLocaleDateString("pt-br")}
          </div>
          <div className="flex justify-end">
            {!editDisable ? (
              <button onClick={() => handleEditDisable(id)}>
                <FaCheck size={24} color="green" className="mr-2" />
              </button>
            ) : (
              <button onClick={() => handleEditDisable(id)}>
                <img className="w-5 h-5" src={EditImg} alt="" />
              </button>
            )}
            <button onClick={() => handleDeleteCity(id)}>
              <img className="w-7 h-7 pl-2" src={TrashImg} alt="" />
            </button>
          </div>
        </div>
        {sectors.map((sector) => (
          <SectorList
            name={name}
            pathname={pathname}
            labelTextButton={labelTextButton}
            sector={sector}
            handleOpenNewSectorModal={handleOpenNewSectorModal}
          />
        ))}
        <div
          className="bg-gray/100 w-full h-16 rounded-lg mb-2.5 hover:bg-gray/200"
          onClick={() => {
            handleOpenNewSectorModal(id);
          }}
        >
          <div className="flex h-full items-center justify-start mx-5 gap-2 cursor-pointer">
            <IoMdAddCircle size={32} className="text-blue" />
            <p className="font-roboto font-medium text-sm	text-blue ">
              {labelTextButton}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CityBox;
