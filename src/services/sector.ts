import api from '@services/api';

interface CreateSectorInterface {
  name: string;
  city_id: string;
  type: string;
}

const createSector = async ({ name, city_id, type }: CreateSectorInterface) => {

  try {
    const response = await api.post('sector', {
      name,
      city_id,
      type
    });

    console.log(response.data)

    return response.data;

  } catch (error) {
    console.log(error) 
  }
};

const editSector = async (sector_id: string, type: string, name: string) => {
  try {
    const response = await api.put(`sector?sector_id=${sector_id}`, {name, type})

    return response
  } catch(error){
    console.log(error)
  }
}

const deleteSector = async (sector_id: string) => {
  try {
    const response = await api.delete(`sector/?sector_id=${sector_id}`)

    return response;
  } catch(error){
    console.log(error)
  }
}

const getSectorByCity = async (city_id: string) => {
  try {
    const response = await api.get(`city/sectors/?city_id=${city_id}`)
    
    return response.data;
  } catch(error){
    console.log(error);
  }
}

export { createSector, getSectorByCity, deleteSector, editSector }