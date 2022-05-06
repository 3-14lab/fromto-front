import api from "./api";
import { useAuth } from "@hooks/auth";

const createCity = async (name: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useAuth();

  try {
    const city = await api.post("city", {
      name,
      user_id: user.id,
    });

    return city;

  } catch(err){
    return console.log(err);
  }
}

const editCity = async (city_id: string, name: string) => {
  try {
    const response = await api.put(`city?city_id=${city_id}`, {name})

    return response
  } catch(error){
    console.log(error)
  }
}

export { createCity, editCity }