import React, { useEffect, useState } from "react";
import { BackButton, FileUploader, Header, ModalFile } from "@components"
import api from "@services/api";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";

import TrashImg from '@image/trash.svg'

interface ExpenseSheetData {
  id: string,
  value: number,
  sector_id: string,
  name: string,
  place_name: string,
  base_code: string,
  model_code: string,
  created_at: Date
  data: any;
}

export const Pairings: React.FC = () => {
  const [isNewDataModalOpen, setIsNewDataModalOpen] = useState(false)
  const [expenseSheets, setExpenseSheets] = useState<ExpenseSheetData[]>([])
  const [templateSelect, setTemplateSelect] = useState("");

  const history = useHistory();

  const { sector_id } = useParams() as { sector_id: string };
  const { state: {  sector_name, city_name } } = useLocation() as { state: { sector_name: string, city_name: string } };

  useEffect(() => {

    async function loadSector() {
      const response = await api.get(`pairings/${sector_id}`);
      setExpenseSheets(response.data.reverse())
    }

    loadSector()

  }, [sector_id])

  function handleOpenNewDataModal() {
    setIsNewDataModalOpen(true)
  }

  function handleCloseNewDataModal() {
    setIsNewDataModalOpen(false)
  }

  function handlePairing(name: string) {
    if (templateSelect !== "") {
      const templ = expenseSheets.find(item => item.id === templateSelect)!.data.map((item: any) => {
        delete item.created_at
        delete item.id
        delete item.pairing_id
        delete item.updated_at

        return item;
      })
      history.push({ pathname: `/pairing/${sector_id}`, state: { pairing_name: name, data: templ, city_name, sector_name } })
      return;
    }

    history.push({ pathname: `/pairing/${sector_id}`, state: { pairing_name: name, city_name, sector_name } })
  }

  async function handleDelete(expenseSheet_id: string) {
      await api.delete(`pairings/${expenseSheet_id}`)    
      const response = await api.get(`pairings/${sector_id}`);
      setExpenseSheets(response.data)
  }

  const [isOpen, setIsOpen] = useState<boolean>(false);

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
        <FileUploader placeholder="Clique aqui ou arraste o arquivo .csv no padrão SICGESP" label="Arquivo SICGESP" type="sicgesp" />
        <FileUploader placeholder="Clique aqui ou arraste o arquivo .csv sem padronização" label="Arquivo local" type="local" />

        <div className="flex gap-1 items-center">
          <label className="font-roboto font-medium text-blue text-sm">
            Template de pareamento
          </label>
          <div className="relative cursor-pointer" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <HiInformationCircle color="#5429CC" />
            {isOpen && (
              <div className="w-80 absolute bottom-[-6] left-1 bg-[#0000008e] text-white text-xs font-medium px-2 py-1 border-none rounded">
                Selecione um pareamento anterior e utilize a mesma paridade de lotações para este novo pareamento!
              </div>
            )}
          </div>
        </div>
        <select
          onChange={({ target }) => {
            setTemplateSelect(target.value);
          }}
          defaultValue={'DEFAULT'} id="select-primary" className={`lg:w-full md:w-72 px-3.5 py-2.5 mt-0.5 border rounded-md border-[#D1D5DB] text-[#6B7280] bg-[#f0f2f5] text[#fff] ont-roboto font-medium outline-none`}>
          <option value="DEFAULT" disabled hidden>Nenhum (padrão)</option>
          {expenseSheets.map(({ id, name }: any) => (
            <React.Fragment key={id}>
              <option value={id}>{name}</option>
            </React.Fragment>
          ))}
        </select>
      </ModalFile>

      <main className="mx-auto py-4 px-4 w-[74rem] ">
        <BackButton />
        <div className="flex justify-between items-center" >
          <section className="flex items-end mt-4 mb-10 space-x-8 ">
            <h1 className="text-[#374151] font-roboto font-medium text-4xl">Pareamento</h1>
            <h3 className="font-roboto font-medium text-2xl	text-[#6B7280]">{city_name} | {sector_name}</h3>
          </section>
          <button onClick={handleOpenNewDataModal} className="text-white font-medium text-xs border rounded-md bg-blue py-3 px-16 hover:brightness-90"  >Novo Pareamento</button>
        </div>


        <div className="w-full" >
          <div className="flex flex-1 w-full justify-between py-2 px-8">
            <div className="flex w-full justify-between">
              <div className="text-body font-normal  text-left leading-6">Nome</div>
              <div className="text-body font-normal text-left leading-6">Modificação</div>
            </div>
            <div className="flex w-full justify-end  text-body font-normal text-left leading-6">Ação</div>
          </div>


          {expenseSheets.map(expenseSheet => (
            <div key={expenseSheet.id} className="w-full mt-5">
              <div className="flex rounded-md flex-1 bg-white hover:bg-text justify-between">
                <Link
                  to={{pathname: `/pairing/view/${expenseSheet.id}`, state: { city_name, sector_name, expensesheet_name: expenseSheet.name }}}
                  className="flex w-full bg-white cursor-pointer hover:bg-text  py-4 px-8 justify-between"
                >
                  <div className="bg-white text-body">{expenseSheet.name}</div>
                  <div className="bg-white text-body">{new Date(expenseSheet.created_at).toLocaleDateString('pt-br')}</div>
                </Link>
                <div className="flex w-full justify-end">
                  <button className="cursor-pointer px-8" onClick={() => handleDelete(expenseSheet.id)} >
                    <img src={TrashImg} alt="" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}