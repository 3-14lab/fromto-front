import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { BackButton, Header } from "@components";
import { useUpload } from "@hooks/upload";
import { CSVLink } from "react-csv";
import { Oval } from "react-loader-spinner";
import { sicgespType, localType, pairingCodesType } from "@hooks/upload";
import SearchableSelector from "@components/SearchableSelector";
import { createPairing } from "@services/pairing";

interface LocationState {
  pairing_name: string;
  sector_name: string;
  city_name: string;
  data: {
    base_code: string;
    model_code: string;
    place_name: string;
    value: string;
  }[];
}

export type FilePropsSicgesp = {
  [field: string]: sicgespType;
};

type FilePropsLocal = {
  [field: string]: localType;
};

export const Pairing: React.FC = () => {
  const { sector_id } = useParams() as { sector_id: string };
  const history = useHistory();
  const {
    state: { pairing_name, city_name, sector_name, data },
  } = useLocation<LocationState>();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { file } = useUpload();

  const [formattedFile, setFormattedFile] = useState({} as FilePropsLocal);
  const [sicgespFile, setSicgespFile] = useState({} as FilePropsSicgesp);
  const [pairingCodes, setPairingCodes] = useState<pairingCodesType[]>([]);

  const headers = [
    { label: "Código Lotação", key: "base_code" },
    { label: "Descrição Locação", key: "location" },
    { label: "Valor Realocado", key: "value" },
  ];

  const headersSecondary = [
    { label: "Código Lotação", key: "model_code" },
    { label: "Descrição Locação", key: "location" },
    { label: "Valor Realocado", key: "value" },
    { label: "Adicional", key: "add" },
  ];

  useEffect(() => {
    setFormattedFile(
      file["local"]?.reduce((p, c) => ({ ...p, [c.model_code!]: c }), {})
    );
    setSicgespFile(
      file["sicgesp"]?.reduce((p, c) => ({ ...p, [c.base_code]: c }), {})
    );
  }, [file]);

  useEffect(() => {
    if (data) {
      setFormattedFile((prev) => ({
        ...prev,
        ...data.reduce((p: any, c: any) => ({ ...p, [c.model_code]: c }), {}),
      }));

      setPairingCodes((prev) => [
        ...prev,
        ...data.map((pairedData) => ({
          model_code: pairedData.model_code,
          base_code: pairedData.base_code,
        })),
      ]);
    }
  }, [data]);

  const downloadPairingFilled = useMemo(() => {
    const aux = formattedFile;
    return Object.values(aux)
      .filter((item) => item.base_code)
      .map((item) => {
        return {
          base_code: item.base_code,
          location: item.place_name,
          value: Number(item.value)
            .toLocaleString("pt-br", { style: "currency", currency: "BRL" })
            .toString()
            .split("R$")
            .join("")
            .trim(),
        };
      });
  }, [formattedFile]);

  const downloadPairingEmpty = useMemo(() => {
    const aux = formattedFile;
    return Object.values(aux)
      .filter((item) => !item.base_code)
      .map((item) => {
        return {
          model_code: item.model_code,
          location: item.place_name,
          value: Number(item.value)
            .toLocaleString("pt-br", { style: "currency", currency: "BRL" })
            .toString()
            .split("R$")
            .join("")
            .trim(),
        };
      });
  }, [formattedFile]);

  function update(model_code: string, target: string | null) {
    const pairingAlreadySelect = Object.values(formattedFile).find(
      (item) => target === item.base_code
    );

    const pairingRepeated = pairingCodes.find((item) => {
      return item.base_code === target;
    });

    if (!target) {
      return false;
    }

    if (pairingRepeated) {
      return false;
    }

    setPairingCodes([
      ...pairingCodes,
      {
        model_code,
        base_code: target,
      },
    ]);

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
    const pairingCreateBody = {
      sector_id,
      name: pairing_name,
      pairingCodes: pairingCodes,
      local_file: Object.values(formattedFile),
      sicgesp_file: Object.values(sicgespFile),
    };

    await createPairing(pairingCreateBody);

    setIsLoading(false);

    const button = document.getElementById(
      "buttonPareamento"
    ) as HTMLButtonElement | null;
    button!.disabled = true;
    button!.style.backgroundColor = "#C4C4C4";
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
            Pareamento
          </h1>
          <h3 className="font-roboto font-medium text-2xl	text-[#6B7280]">
            {city_name} | {sector_name} | {pairing_name}
          </h3>
        </section>

        <div className="grid grid-cols-9 w-full px-3">
          <h4 className="font-poppins font-normal text-center text-[#5429CC]">
            codigo
          </h4>
          <h4 className="col-span-3 font-poppins font-normal text-center text-[#9a92b1]">
            nome da instituicao
          </h4>
          <div className="grid-cols-none"></div>
          <h4 className="font-poppins font-normal text-center text-[#5429CC]">
            codigo
          </h4>
          <h4 className="col-span-3 font-poppins font-normal text-center text-[#5429CC]">
            nome da instituicao
          </h4>
        </div>

        <div className="max-h-[400px] overflow-y-scroll pairing-select">
          {Object.values(formattedFile).map(
            ({ model_code, place_name, value, base_code }: any) => (
              <div
                key={model_code}
                className="grid grid-cols-9 w-full p-5 gap-5 mb-2.5 bg-white"
              >
                <div className="font-roboto font-medium text-[#5429CC] px-3.5 py-2.5 leading-6 border rounded-md text-center bg-[#f0f2f5]">
                  {model_code}
                </div>
                <div className="col-span-3 px-3.5 py-2.5 border rounded-md bg-[#f0f2f5] font-roboto font-medium text-[#6B7280]">
                  {place_name}
                </div>
                <div className="self-center mx-auto font-poppins font-bold lg:text-2xl md:text-xl text-[#5429CC]">
                  =
                </div>
                <div className="font-roboto font-medium text-[#292438] px-3.5 py-2.5 leading-6 border rounded-md text-center bg-[#f0f2f5]">
                  {base_code || "---"}
                </div>
                <SearchableSelector
                  data={Object.values(sicgespFile).map(
                    ({ base_code, location }) => ({
                      label: location,
                      value: base_code,
                    })
                  )}
                  onSelect={(target: string | null) =>
                    update(model_code, target)
                  }
                  value={base_code}
                />
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
              id="buttonPareamento"
              disabled={false}
              onClick={handlePairingSubmit}
              className="px-[28px] py-[13px] text-white font-bold text-sm mt-10 bg-blue rounded-lg flex justify-center items-center"
            >
              {isLoading ? (
                <Oval color="#ffffff" height={24} strokeWidth={4} width={24} />
              ) : (
                "Salvar planilha"
              )}
            </button>
            {/* <HiInformationCircle color="#5429CC" /> */}
            {isOpen && (
              <div className="w-fit absolute bottom-[-6] left-0 bg-[#0000008e] text-white text-xs font-medium px-2 py-1 border-none rounded mt-2">
                Salve o pareamento e use-o como template.
              </div>
            )}
          </div>
          <CSVLink
            data={downloadPairingFilled as []}
            filename={`${city_name}_${sector_name}_${pairing_name}`}
            headers={headers}
            separator={";"}
          >
            <button className="px-[28px] py-[13px] text-white font-bold text-sm mt-10 bg-green-800 rounded-lg">
              Baixar planilha
            </button>
          </CSVLink>
          <CSVLink
            data={downloadPairingEmpty as []}
            filename={`${city_name}_${sector_name}_${pairing_name} - NAO PAREADOS`}
            headers={headersSecondary}
            separator={";"}
          >
            <button className="px-[28px] py-[13px] text-white font-bold text-sm mt-10 bg-red-400 rounded-lg">
              Baixar não pareados
            </button>
          </CSVLink>
        </div>
      </div>
    </>
  );
};
