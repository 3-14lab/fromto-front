import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { BackButton, Header } from "@components";
import { CSVLink } from "react-csv";
import { getPairingById } from "@services/pairing";

interface FieldGroupProps {
  code?: string;
  location?: string;
  base_code?: string;
}

const FieldGroup = ({ code, location }: FieldGroupProps) => {
  return (
    <div>
      <div key={code} className="flex items-center space-x-5">
        <div>
          <p
            className={`lg:w-28 md:w-20 font-roboto font-medium text-[#5429CC] px-3.5 py-2.5 leading-6 border rounded-md text-center bg-[#f0f2f5]`}
          >
            {code}
          </p>
        </div>
        <div>
          <div
            className={`lg:w-96 md:w-72 px-3.5 py-2.5 border rounded-md text-[#D1D5DB] bg-[#f0f2f5]`}
          >
            <p className="font-roboto font-medium text-[#6B7280]">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PairingView: React.FC = () => {
  const [file, setFile] = useState([]);

  const { p_id } = useParams<any>();
  const {
    state: { city_name, sector_name, expensesheet_name },
  } = useLocation<any>();

  useEffect(() => {
    (async () => {
      const response = await getPairingById(p_id);
      setFile(response);
    })();
  }, [p_id]);

  const headers = [
    { label: "Código Lotação", key: "code_base" },
    { label: "Descrição Locação", key: "location" },
    { label: "Valor Realocado", key: "value" },
  ];

  const formatCSV = file?.map((item: any) => {
    return {
      code_base: item.base_code,
      location: item.place_name,
      value: Number(item.value).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      }),
    };
  });

  return (
    <>
      <Header />
      <div className="mx-auto lg:w-[74rem] md:w-[54rem]">
        <BackButton />
        <section className="flex items-end my-10 space-x-8 ">
          <h1 className="text-[#374151] font-roboto font-medium text-4xl">
            Pareamento
          </h1>
          <h3 className="font-roboto font-medium text-2xl	text-[#6B7280]">
            {city_name} | {sector_name} | {expensesheet_name}
          </h3>
        </section>

        <div className="flex mx-10 gap-5 mb-2.5">
          <h4 className="lg:w-24 md:w-20 font-poppins font-normal text-center text-[#5429CC]">
            codigo
          </h4>
          <h4 className="lg:w-96 md:w-72 font-poppins font-normal text-center text-[#5429CC]">
            nome da instituicao
          </h4>
          <div className="lg:mx-7 md:mx"></div>
          <h4 className="lg:w-24 md:w-20 font-poppins font-normal text-center text-[#5429CC]">
            codigo
          </h4>
          <h4 className="lg:w-96 md:w-72 font-poppins font-normal text-center text-[#5429CC]">
            nome da instituicao
          </h4>
        </div>

        <div className="max-h-[400px] overflow-y-scroll pairing-select">
          {file?.map(({ base_code, model_code, place_name }) => (
            <div
              className={`flex justify-center py-5 bg-white rounded-md mb-2.5`}
            >
              <FieldGroup
                key={model_code + "b"}
                code={model_code}
                location={place_name}
              />
              <h4 className="self-center lg:mx-8 md:mx-2 font-poppins font-bold lg:text-2xl md:text-xl text-[#5429CC]">
                =
              </h4>
              <FieldGroup
                key={model_code + "selected"}
                code={base_code}
                location={place_name}
                base_code={base_code}
              />
            </div>
          ))}
        </div>

        <div className="w-fit	mx-auto">
          <button className="px-[28px] py-[13px] text-white font-bold text-sm mt-10 bg-green-800 rounded-lg">
            <CSVLink
              data={formatCSV}
              filename={`${city_name}_${sector_name}_${expensesheet_name}`}
              headers={headers}
            >
              Baixar planilha
            </CSVLink>
          </button>
        </div>
      </div>
    </>
  );
};
