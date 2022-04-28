import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { BackButton, Header } from "@components";
import { useUpload } from "@hooks/upload";
import { CSVLink } from "react-csv";
//import api from "@services/api";
import { Oval } from "react-loader-spinner";
import { localTypePJ, pairingCodesType } from "@hooks/upload";
import SearchableSelector from "@components/SearchableSelector";
import { createPairing, createPairingPJ } from "@services/pairing";

interface LocationState {
  pairing_name: string;
  sector_name: string;
  city_name: string;
  data: [];
}

type FilePJPropsLocal = {
  [field: string]: localTypePJ;
};

export const PairingPJ: React.FC = () => {
  const { sector_id } = useParams() as { sector_id: string };
  const history = useHistory();
  const {
    state: { pairing_name, city_name, sector_name, data },
  } = useLocation<LocationState>();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { file } = useUpload();

  const [formattedFile, setFormattedFile] = useState({} as FilePJPropsLocal);

  const headers = [
    { label: "Código Lotação", key: "stocking_code" },
    { label: "Descrição Locação", key: "description_stocking" },
    { label: "Valor Realocado", key: "reallocated_value" },
    { label: "Postos", key: "number_posts" },
  ];

  useEffect(() => {
    setFormattedFile(
      file["localPJ"]?.reduce((p, c) => ({ ...p, [c.stocking_code!]: c }), {})
    );
  }, [file]);

  useEffect(() => {
    if (data) {
      setFormattedFile((prev) => ({
        ...prev,
        ...data.reduce((p: any, c: any) => ({ ...p, [c.stocking_code]: c }), {}),
      }));
    }
  }, [data]);

  const downloadPairingFilled = useMemo(() => {
    const aux = formattedFile;
    return Object.values(aux)
      .map((item) => {
        return {
          stocking_code: item.stocking_code,
          description_stocking: item.description_stocking,
          reallocated_value: item.reallocated_value,
          number_posts: item.number_posts
        };
      });
  }, [formattedFile]);

  function update(model_code: string, target: string | null) {
    const pairingAlreadySelect = Object.values(formattedFile).find(
      (item) => target === item.stocking_code
    );

    if (!target) {
      return false;
    }

    if (pairingAlreadySelect) {
      setFormattedFile((prev) => ({
        ...prev,
        [model_code]: { ...prev[model_code], base_code: undefined },
      }));

      return false;
    }

    const newPairingSelect = formattedFile[model_code];
    setFormattedFile((prev) => ({
      ...prev,
      [model_code]: { ...newPairingSelect, base_code: target },
    }));

    return true;
  }

  async function handlePairingSubmit() {
    setIsLoading(true);

    try {
      const pairingCreateBody = {
        name: pairing_name,
        sector_id,
        local_file: Object.values(formattedFile), 
      }
      
      await createPairingPJ(pairingCreateBody);
      
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
    
    history.push({
      pathname: `/pairings/pj/${sector_id}`,
      state: { sector_name, city_name },
    });
  }

  if (!Object.values(file).length) {
    history.push("/pairings");
  }

  return (
    <>
      <Header />
      <div className="mx-auto lg:w-[74rem] md:w-[54rem]">
        <BackButton />
        <section className="flex items-end mb-10 space-x-8 ">
          <h1 className="text-[#374151] font-roboto font-medium text-4xl">
            Serviço de Terceiro - PJ
          </h1>
          <h3 className="font-roboto font-medium text-2xl	text-[#6B7280]">
            {city_name} | {sector_name} | {pairing_name}
          </h3>
        </section>

        <div className="grid grid-cols-9 w-full px-3">
          <h4 className="col-span-1 font-poppins font-normal text-center text-[#5429CC]">
            código lotação
          </h4>
          <h4 className="col-span-4 font-poppins font-normal text-center text-[#5429CC]">
            descrição lotação
          </h4>
          <div className="grid-cols-none"></div>
          <h4 className="col-span-2 font-poppins font-normal text-center text-[#5429CC]">
            valor realocado
          </h4>
          <h4 className="col-span-1 font-poppins font-normal text-center text-[#292438]">
            postos
          </h4>
        </div>

        <div className="max-h-[400px] overflow-y-scroll pairing-select">
          {Object.values(formattedFile).map(
            ({ stocking_code, description_stocking, reallocated_value, number_posts }: any) => (
              <div
                key={stocking_code}
                className="grid grid-cols-9 w-full p-5 gap-5 mb-2.5 bg-white"
              >
                <div className="col-span-1 font-roboto font-medium text-[#5429CC] px-3.5 py-2.5 leading-6 border rounded-md text-center bg-[#f0f2f5]">
                  {stocking_code}
                </div>
                <div className="col-span-5 px-3.5 py-2.5 border rounded-md bg-[#f0f2f5] font-roboto font-medium text-[#5429CC]">
                  {description_stocking}
                </div>
                <div className="col-span-2 font-roboto font-medium text-[#5429CC] px-3.5 py-2.5 leading-6 border rounded-md text-center bg-[#f0f2f5]">
                  {Number(reallocated_value).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                </div>
                <div className="col-span-1 font-roboto font-medium text-[#292438] px-3.5 py-2.5 leading-6 border rounded-md text-center bg-[#f0f2f5]">
                  {number_posts}
                </div>
              </div>
            )
          )}
        </div>
        <div className="w-[700px] mx-auto flex items-center justify-around">
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <button
              onClick={handlePairingSubmit}
              className="px-[28px] py-[13px] text-white font-bold text-sm mt-10 bg-blue rounded-lg flex justify-center items-center"
            >
              {isLoading ? (
                <Oval color="#ffffff" height={24} strokeWidth={4} width={24} />
              ) : (
                "Salvar planilha"
              )}
            </button>

            {isOpen && (
              <div className="w-fit absolute bottom-[-6] left-0 bg-[#0000008e] text-white text-xs font-medium px-2 py-1 border-none rounded mt-2">
                Salve o serviço de terceiro - PJ e use-o como template.
              </div>
            )}
          </div>
          <button className="px-[28px] py-[13px] text-white font-bold text-sm mt-10 bg-green-800 rounded-lg">
            <CSVLink
              data={downloadPairingFilled as []}
              filename={`${city_name}_${sector_name}_${pairing_name}`}
              headers={headers}
              separator={";"}
            >
              Baixar planilha
            </CSVLink>
          </button>
        </div>
      </div>
    </>
  );
};
