import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { BackButton, Header } from "@components";
import { useUpload } from "@hooks/upload";
import { CSVLink } from "react-csv";
import { localTypePJ } from "@hooks/upload";
import { createPairingPJ } from "@services/pairing";

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
  const { file } = useUpload();
  const [formattedFile, setFormattedFile] = useState({} as FilePJPropsLocal);

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

  async function handlePairingSubmit() {
    try {
      const pairingCreateBody = {
        name: pairing_name,
        sector_id,
        local_file: Object.values(formattedFile), 
      }
      
      const response = await createPairingPJ(pairingCreateBody);
      console.log(response?.data)
      history.push({
        pathname: `/pairing/view/pj/${response?.data.id}`,
        state: { sector_name, city_name, type: "localPJ", expensesheet_name: response?.data.name },
      });
    } catch (err) {
      console.log(err);
    }

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
          <button onClick={handlePairingSubmit} className="px-[28px] py-[13px] text-white font-bold text-sm mt-10 bg-blue rounded-lg">
            Salvar planilha
          </button>
        </div>
      </div>
    </>
  );
};
