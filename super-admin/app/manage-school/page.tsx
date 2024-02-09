import axios from "axios";
import List from "../_components/List";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const getSchools = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/school`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export default async function ManageSchool() {
  const schools = await getSchools();

  return (
    <div className="w-full mt-2 md:px-6 font-primary">
      {schools.map((school: any) => (
        <List school={school} key={school.id} />
      ))}
    </div>
  );
}
