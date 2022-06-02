import api from "@services/api";

interface createPairingInterface {
  sector_id: string;
  name: string;
  pairingCodes: Object;
  local_file: Object;
  sicgesp_file: Object;
}

interface createPairingPJInterface {
  name: string;
  sector_id: string;
  local_file: Object;
}

const createPairing = async ({
  sector_id,
  name,
  pairingCodes,
  local_file,
  sicgesp_file,
}: createPairingInterface) => {
  const response = await api.post("/pairing", {
    sector_id,
    name,
    pairingCodes,
    local_file,
    sicgesp_file,
  });

  return response;
};

const getPairingById = async (p_id: string) => {
  const response = await api.get(`pairing?pairing_id=${p_id}`);

  return response.data.pairing_data;
};

const getPairingBySector = async (sector_id: string) => {
  const response = await api.get(`pairing/sector?sector_id=${sector_id}`);

  return response.data.reverse();
};

const deletePairing = async (expenseSheet_id: string) => {
  const response = await api.delete(`pairing?pairing_id=${expenseSheet_id}`);

  return response;
};

const createPairingPJ = async ({
  name,
  sector_id,
  local_file,
}: createPairingPJInterface) => {
  const response = await api.post("/service_third", {
    name,
    sector_id,
    local_file,
  });

  return response;
};

const getPairingBySectorPJ = async (sector_id: string) => {
  const response = await api.get(`sector/service_third?sector_id=${sector_id}`);

  return response.data.reverse();
};

const deletePairingPJ = async (expenseSheet_id: string) => {
  const response = await api.delete(
    `service_third?service_third_id=${expenseSheet_id}`
  );

  return response;
};

export {
  createPairing,
  getPairingById,
  getPairingBySector,
  deletePairing,
  getPairingBySectorPJ,
  createPairingPJ,
  deletePairingPJ,
};
