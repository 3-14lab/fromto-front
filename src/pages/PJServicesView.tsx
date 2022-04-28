import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { BackButton, Header } from "@components";
import { CSVLink } from "react-csv";
import api from "@services/api";

interface FieldGroupProps {
  code: string;
  location?: string;
  value: string;
}

const FieldGroup = ({ code, location, value }: FieldGroupProps) => {
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
            <p className="font-roboto font-medium text-[#6B7280]">
              {location}
            </p>
          </div>
        </div>
        <div>
          <p
            className={`lg:w-28 md:w-20 font-roboto font-medium text-[#5429CC] px-3.5 py-2.5 leading-6 border rounded-md text-center bg-[#f0f2f5]`}
          >
            {Number(value).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
          </p>
        </div>
      </div>
    </div>
  );
};

interface SheetsFileProps {
  stocking_code: string;
  description_stocking: string;
  reallocated_value: string;
}

export const PJServicesView: React.FC = () => {
  const [file, setFile] = useState<SheetsFileProps[]>([]);
  const [amount, setAmount] = useState<number>(0);

  const { p_id } = useParams<any>();
  const { state: { city_name, sector_name, expensesheet_name } } = useLocation<any>();

  useEffect(() => {
    (async () => {
      const response = await api.get(`service_third?service_third_id=${p_id}`);
      setFile(response.data.local_file.reverse());
      setAmount(file.map((item) => item.reallocated_value).reduce((prev, curr) => Number(prev) + Number(curr), 0));
    })();
  }, [p_id, file]);

  const headers = [
    { label: "Código Lotação", key: "stocking_code" },
    { label: "Descrição Locação", key: "description_stocking" },
    { label: "Valor Realocado", key: "reallocated_value" },
  ];

  const formatCSV = file?.map((item: any) => {
    return {
      stocking_code: item.stocking_code,
      description_stocking: item.description_stocking,
      reallocated_value: item.reallocated_value,
    };
  });

  return (
    <>
      <Header />
      <div className="mx-auto lg:w-[74rem] md:w-[54rem]">
        <div className="flex justify-between items-center">
          <BackButton />
          <h4 className="bg-white leading-6 border rounded-md text-center font-poppins font-normal text-[#5429CC] lg:w-28 md:w-20 font-roboto ">
            Valor total {` `} 
            <strong>
              {amount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
            </strong>
          </h4>
        </div>
        <section className="flex items-end my-10 space-x-8 ">
          <h1 className="text-[#374151] font-roboto font-medium text-4xl">
            Serviços de Terceiros - PJ
          </h1>
          <h3 className="font-roboto font-medium text-2xl	text-[#6B7280]">
            {city_name} | {sector_name} | {expensesheet_name}
          </h3>
        </section>

        <div className="flex justify-center mx-10 gap-5 mb-2.5">
          <h4 className="lg:w-24 md:w-20 font-poppins font-normal text-center text-[#5429CC]">
            codigo
          </h4>
          <h4 className="lg:w-96 md:w-72 font-poppins font-normal text-center text-[#5429CC]">
            nome do setor
          </h4>
          <div className="lg:mx-7 md:mx"></div>
          <h4 className="lg:w-24 md:w-20 font-poppins font-normal text-center text-[#5429CC]">
            valor
          </h4>
        </div>

        <div className="max-h-[400px] overflow-y-scroll pairing-select">
          {file?.map(
            ({ stocking_code, reallocated_value, description_stocking }) => (
              <div
                className={`flex justify-center py-5 bg-white rounded-md mb-2.5 space-x-20`}
              >
                <FieldGroup
                  key={stocking_code + "b"}
                  code={stocking_code}
                  location={description_stocking}
                  value={reallocated_value}
                />
              </div>
            )
          )}
        </div>

        <div className="w-fit	mx-auto">
          <button className="px-[28px] py-[13px] text-white font-bold text-sm mt-10 bg-green-800 rounded-lg">
            <CSVLink data={formatCSV} filename={`planilha teste`} headers={headers} separator={";"}>
              Baixar planilha
            </CSVLink>
          </button>
        </div>
      </div>
    </>
  );
};
