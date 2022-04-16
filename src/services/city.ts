import api from "./api";
import { useAuth } from "@hooks/auth";

export const createCity = async (name: string) => {
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