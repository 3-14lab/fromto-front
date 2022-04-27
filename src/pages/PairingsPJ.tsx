import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { BackButton, FileUploader, Header, ModalFile } from "@components";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useUpload } from "@hooks/upload";

import { localTypePJ } from "@hooks/upload";

import TrashImg from "@image/trash.svg";
import { createPairingPJ, deletePairing, getPairingBySectorPJ } from "@services/pairing";

interface ExpenseSheetData {
  id: string;
  name: string;
  local_file: string;
  sector_id: number;
  createdTime: Date;
}


type FilePropsLocalPJ = {
  [field: string]: localTypePJ;
};

export const PairingsPJ: React.FC = () => {
  const [isNewDataModalOpen, setIsNewDataModalOpen] = useState(false);
  const [expenseSheets, setExpenseSheets] = useState<ExpenseSheetData[]>([]);
  const [popUp, setPopUp] = useState<boolean>(false);
  const history = useHistory();
  const { file } = useUpload();

  const [formattedFilePJ, setFormattedFilePJ] = useState({} as FilePropsLocalPJ);

  const { sector_id } = useParams() as { sector_id: string };
  const {
    state: { sector_name, city_name, type },
  } = useLocation() as {
    state: { sector_name: string; city_name: string; type: string };
  };

  const loadSector = async() => {
    const response = await getPairingBySectorPJ(sector_id);
    setExpenseSheets(response);
  }

  function handleOpenNewDataModal() {
    setIsNewDataModalOpen(true);
    setPopUp(true);
  }

  function handleCloseNewDataModal() {
    setIsNewDataModalOpen(false);
  }

  async function handlePairing(name: string) {
    const pairingCreateBody = {
      name,
      sector_id,
      local_file: Object.values(formattedFilePJ),
    }
    const response = await createPairingPJ(pairingCreateBody);

    history.push({
      pathname: `/pairing/view/pj/${response?.data.id}`,
      state: { pairing_name: name, city_name, sector_name },
    });
  }

  useEffect(() => {
    loadSector();
    setFormattedFilePJ(
      file["localPJ"]?.reduce((p, c) => ({ ...p, [c.stocking_code!]: c }), {})
    );
  }, [file]);

  async function handleDelete(expenseSheet_id: string) {
    await deletePairing(expenseSheet_id);
    await loadSector();
  }

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
          label="Arquivo SICGESP com número de postos"
          type="localPJ"
        />
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
          <strong>Valor Realocado</strong>
          <strong> e Quantidade de Postos </strong>
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
              Serviços de terceiros - PJ
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
                    pathname: `/pairing/view/pj/${expenseSheet.id}`,
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
