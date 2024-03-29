import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { BackButton, FileUploader, Header, ModalFile } from "@components";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";

import TrashImg from "@image/trash.svg";
import { deletePairing, getPairingBySector } from "@services/pairing";

interface PairingData {
  base_code: string;
  model_code: string;
  place_name: string;
  value: string;
}

interface UnpairingData {
  base_code: string;
  location: string;
  value: string;
}

interface ExpenseSheetData {
  id: string;
  sector_id: string;
  name: string;
  createdTime: Date;
  status: boolean;
  pairing_data: PairingData[];
  unpaired_data: UnpairingData[];
}

export const Pairings: React.FC = () => {
  const [isNewDataModalOpen, setIsNewDataModalOpen] = useState(false);
  const [expenseSheets, setExpenseSheets] = useState<ExpenseSheetData[]>([]);
  const [templateSelect, setTemplateSelect] = useState("");

  const history = useHistory();

  const { sector_id } = useParams() as { sector_id: string };
  const {
    state: { sector_name, city_name, type },
  } = useLocation() as {
    state: { sector_name: string; city_name: string; type: string };
  };

  const loadSector = async () => {
    const response = await getPairingBySector(sector_id);

    setExpenseSheets(response);
  };

  useEffect(() => {
    loadSector();
  }, []);

  function handleOpenNewDataModal() {
    setIsNewDataModalOpen(true);
    setPopUp(true);
  }

  function handleCloseNewDataModal() {
    setIsNewDataModalOpen(false);
  }

  function handlePairing(name: string) {
    if (templateSelect !== "") {
      const template = expenseSheets.find(
        (pairing) => String(pairing.id) === templateSelect
      );

      const templ = template ? template.pairing_data : [];

      history.push({
        pathname: `/pairing/${sector_id}`,
        state: { pairing_name: name, data: templ, city_name, sector_name },
      });
      return;
    }

    history.push({
      pathname: `/pairing/${sector_id}`,
      state: { pairing_name: name, city_name, sector_name },
    });
  }

  async function handleDelete(expenseSheet_id: string) {
    await deletePairing(expenseSheet_id);
    await loadSector();
  }

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [popUp, setPopUp] = useState<boolean>(false);

  return (
    <>
      <Header />

      <ModalFile
        isOpen={isNewDataModalOpen}
        onRequestClose={handleCloseNewDataModal}
        placeholder="Nome"
        title="Cadastrar pareamento"
        handleSumit={handlePairing}
      >
        <FileUploader
          placeholder="Clique aqui ou arraste o arquivo .csv no padrão SICGESP"
          label="Arquivo SICGESP"
          type="sicgesp"
        />

        <>
          <FileUploader
            placeholder="Clique aqui ou arraste o arquivo .csv sem padronização"
            label="Arquivo local"
            type="local"
          />

          <div className="flex gap-1 items-center">
            <label className="font-roboto font-medium text-blue text-sm">
              Template de pareamento
            </label>
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <HiInformationCircle color="#5429CC" />
              {isOpen && (
                <div className="w-80 absolute bottom-[-6] left-1 bg-[#0000008e] text-white text-xs font-medium px-2 py-1 border-none rounded">
                  Selecione um pareamento anterior e utilize a mesma paridade de
                  lotações para este novo pareamento!
                </div>
              )}
            </div>
          </div>
          <select
            onChange={({ target }) => {
              setTemplateSelect(target.value);
            }}
            defaultValue={"DEFAULT"}
            id="select-primary"
            className={`lg:w-full md:w-72 px-3.5 py-2.5 mt-0.5 border rounded-md border-[#D1D5DB] text-[#6B7280] bg-[#f0f2f5] text[#fff] ont-roboto font-medium outline-none`}
          >
            <option value="DEFAULT" disabled hidden>
              Nenhum (padrão)
            </option>
            {expenseSheets.map(({ id, name }: any) => (
              <React.Fragment key={id}>
                <option value={id}>{name}</option>
              </React.Fragment>
            ))}
          </select>
        </>
      </ModalFile>

      <Modal
        className="react-modal-content flex flex-col"
        isOpen={popUp}
        overlayClassName="react-modal-overlay"
        onRequestClose={() => setPopUp(false)}
      >
        <h2 className="font-roboto font-medium text-2xl text-blue mb-[30px]">
          Atenção
        </h2>

        <span className="font-roboto text-sm">
          Para que ocorra o funcionamento desejado, certifique que os campos de{" "}
          <strong>Código</strong>, <strong>Descrição da Lotação</strong>,{" "}
          <strong>Valor Realocado </strong>
          estejam presentes nas suas planilhas para importação. Do contrário as
          linhas com qualquer ausência não serão lidas!
        </span>

        <button
          className="text-white font-medium text-base rounded-md bg-blue py-3 mt-[30px]"
          onClick={() => setPopUp(false)}
        >
          Avançar
        </button>
      </Modal>

      <main className="mx-auto py-4 px-4 w-[74rem] ">
        <BackButton />
        <div className="flex justify-between items-center">
          <section className="flex items-end mt-4 mb-10 space-x-8 ">
            <h1 className="text-[#374151] font-roboto font-medium text-4xl">
              Pareamento
            </h1>
            <h3 className="flex font-roboto font-medium text-2xl	text-[#6B7280] items-center">
              {city_name} | {sector_name}
            </h3>
          </section>
          <button
            onClick={handleOpenNewDataModal}
            className="text-white font-medium text-xs border rounded-md bg-blue py-3 px-16 hover:brightness-90"
          >
            Novo Pareamento
          </button>
        </div>

        <div className="w-full">
          <div className="flex flex-1 w-full justify-between py-2 px-8">
            <div className="flex w-full justify-between">
              <div className="text-body font-normal  text-left leading-6">
                Nome
              </div>
              <div className="text-body font-normal text-left leading-6">
                Modificação
              </div>
            </div>
            <div className="flex w-full justify-end  text-body font-normal text-left leading-6">
              Ação
            </div>
          </div>

          {expenseSheets.map((expenseSheet) => (
            <div key={expenseSheet.id} className="w-full mt-5">
              <div className="flex rounded-md flex-1 bg-white hover:bg-text justify-between">
                <Link
                  to={{
                    pathname: `/pairing/view/${expenseSheet.id}`,
                    state: {
                      city_name,
                      sector_name,
                      type,
                      expensesheet_name: expenseSheet.name,
                    },
                  }}
                  className="flex w-full bg-white cursor-pointer hover:bg-text  py-4 px-8 justify-between"
                >
                  <div className="bg-white text-body">{expenseSheet.name}</div>
                  <div className="bg-white text-body">
                    {new Date(expenseSheet.createdTime).toLocaleDateString(
                      "pt-br"
                    )}
                  </div>
                </Link>
                <div className="flex w-full justify-end">
                  <button
                    className="cursor-pointer px-8"
                    onClick={() => handleDelete(expenseSheet.id)}
                  >
                    <img src={TrashImg} alt="" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};
