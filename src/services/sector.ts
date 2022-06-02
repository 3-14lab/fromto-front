import api from "@services/api";

interface CreateSectorInterface {
  name: string;
  city_id: string;
  type: string;
}

const createSector = async ({ name, city_id, type }: CreateSectorInterface) => {
  const response = await api.post("sector", {
    name,
    city_id,
    type,
  });

  return response.data;
};

const editSector = async (sector_id: string, type: string, name: string) => {
  const response = await api.put(`sector?sector_id=${sector_id}`, {
    name,
    type,
  });

  return response;
};

const deleteSector = async (sector_id: string) => {
  const response = await api.delete(`sector/?sector_id=${sector_id}`);

  return response;
};

const getSectorByCity = async (city_id: string) => {
  const response = await api.get(`city/sectors/?city_id=${city_id}`);

  return response.data;
};

export { createSector, getSectorByCity, deleteSector, editSector };
