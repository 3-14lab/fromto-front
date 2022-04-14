import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { BackButton, Header } from '@components';
import { CSVLink } from 'react-csv';
import api from '@services/api';

interface FieldGroupProps {
  value?: string;
  location?: string;
  base_code?: string;
}

const FieldGroup = ({ value, location }: FieldGroupProps) => {

  return (
    <div>
      <div key={value} className="flex items-center space-x-5">
        <div>
          <p className={`lg:w-28 md:w-20 font-roboto font-medium text-[#5429CC] px-3.5 py-2.5 leading-6 border rounded-md text-center bg-[#f0f2f5]`}>{value}</p>
        </div>
        <div>
            <div className={`lg:w-96 md:w-72 px-3.5 py-2.5 border rounded-md text-[#D1D5DB] bg-[#f0f2f5]`}>
              <p className="font-roboto font-medium text-[#6B7280]">{location}</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export const PJServicesView: React.FC = () => {
  const [file, setFile] = useState([]);

  const { p_id } = useParams<any>();
  const { state: { city_name, sector_name, expensesheet_name } } = useLocation<any>();

  useEffect(() => {
    (async () => {
      const response = await api.get(`pairing?pairing_id=${p_id}`);
      setFile(response.data.pairing_data);
    })();
  }, [p_id]);

  const headers = [
    { label: "Código Lotação", key: "code_base" },
    { label: "Descrição Locação", key: "place_name" },
    { label: "Valor Realocado", key: "value" }
  ]

  const formatCSV = file?.map((item: any) => {
    return { code_base: item.base_code, place_name: item.place_name, value: item.value }
  })

  return (
    <>
      <Header />
      <div className="mx-auto lg:w-[74rem] md:w-[54rem]">
        <div className="flex justify-between items-center">
          <BackButton />
          <h4 className="font-poppins font-normal text-[#5429CC]">Valor total ($)</h4>
        </div>
        <section className="flex items-end my-10 space-x-8 ">
          <h1 className="text-[#374151] font-roboto font-medium text-4xl">Pareamento</h1>
          <h3 className="font-roboto font-medium text-2xl	text-[#6B7280]">{city_name} | {sector_name} | {expensesheet_name}</h3>
        </section>

        <div className="flex mx-10 gap-5 mb-2.5">
          <h4 className="lg:w-24 md:w-20 font-poppins font-normal text-center text-[#5429CC]">codigo</h4>
          <h4 className="lg:w-96 md:w-72 font-poppins font-normal text-center text-[#5429CC]">nome do setor</h4>
          <div className="lg:mx-7 md:mx"></div>
          <h4 className="lg:w-24 md:w-20 font-poppins font-normal text-center text-[#5429CC]">valor</h4>
          <h4 className="lg:w-96 md:w-72 font-poppins font-normal text-center text-[#5429CC]">qtde. de postos</h4>
        </div>

        <div className="max-h-[400px] overflow-y-scroll pairing-select">
          { file?.map(({ base_code, value, place_name }) => (
            <div className={`flex justify-center py-5 bg-white rounded-md mb-2.5 space-x-20`}>
              <FieldGroup key={value + 'b'} value={value} location={place_name} />
              <FieldGroup key={value + 'selected'} value={base_code} location={place_name} base_code={base_code} />
            </div>
          ))}
        </div>

        <div className="w-fit	mx-auto">
          <button className="px-[28px] py-[13px] text-white font-bold text-sm mt-10 bg-green-800 rounded-lg">
            <CSVLink data={formatCSV} filename={`${city_name}_${sector_name}_${expensesheet_name}`} headers={headers} separator={";"}>
              Salvar planilha e Baixar pareados
            </CSVLink>
          </button>
        </div>
      </div>
    </>
  );
}
