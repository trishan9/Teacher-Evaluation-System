import { useRouter } from "next/navigation";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getSchoolById = async (id: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/school/${id}`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSchools = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/school`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
  const router = useRouter();
  router.refresh();
};
