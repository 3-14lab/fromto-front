import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { CityData, SectorData } from "@pages/City";
import { FaCheck } from "react-icons/fa";

import EditImg from "@image/edit.svg";
import TrashImg from "@image/trash.svg";
import Add from "@image/Icon.svg";
import { editCity } from "@services/city";

type CityBoxProps = {
  city: CityData;
  handleDeleteCity: (id: string) => void;
  handleDeleteSector: (id: string) => void;
  handleOpenNewSectorModal: (id: string) => () => void;
};

export default function CityBox({
  city,
  handleDeleteCity,
  handleDeleteSector,
  handleOpenNewSectorModal,
}: CityBoxProps) {
  const { name, createdTime, id, sectors, sector_amount } = city;
  const inputRef = useRef(null as any);
  const [editName, setEditName] = useState<string>(name);
  const [editDisable, setEditDisable] = useState<boolean>(true);

  function handleEditName(text: string) {
    setEditName(text);
  }

  async function handleEditDisable(id: string) {
    if (name !== editName) {
      await editCity(id, editName);
    } else {
      inputRef?.current?.focus();
    }
    setEditDisable((prev: boolean) => !prev);
  }

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
              className="flex items-center text-body font-medium p-2 outline-body"
            />
          </div>
          <div className="flex items-center text-body font-normal">{`${sector_amount} ${
            sector_amount === 1 ? "setor" : "setores"
          }`}</div>
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
        {sectors?.map(
          ({
            name: sector_name,
            createdTime,
            type,
            id,
            pairing_amount,
          }: SectorData) => (
            <div
              key={id}
              className="flex bg-gray/100 w-full h-16 rounded-lg mb-2.5 px-5 hover:bg-gray/200"
            >
              <Link
                to={{
                  pathname: `/pairings/${id}`,
                  state: { city_name: name, sector_name, type },
                }}
                className="flex flex-1 justify-between hover:bg-gray/200"
              >
                <div className="grid grid-cols-7 bg-gray/100 w-full hover:bg-gray/200">
                  <div className="flex col-span-1	items-center text-body font-medium">
                    {sector_name}
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
                <button>
                  <img className="w-7 h-5 pl-2" src={EditImg} alt="" />
                </button>
                <button onClick={() => handleDeleteSector(id)}>
                  <img className="w-7 h-7 pl-2" src={TrashImg} alt="" />
                </button>
              </div>
            </div>
          )
        )}
        <div
          className="bg-gray/100 w-full h-16 rounded-lg mb-2.5 hover:bg-gray/200"
          onClick={handleOpenNewSectorModal(id)}
        >
          <div className="flex h-full items-center justify-start mx-5 gap-5  cursor-pointer">
            <img alt="adicionar setor" src={Add} />
            <p className="font-roboto font-medium text-sm	text-blue ">
              Novo Setor
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
