import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import EditForm from "./_components/editForm";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const getSchoolById = async (id: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/school/${id}`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

const EditSchoolPage = async ({
  params: { schoolId },
}: {
  params: { schoolId: string };
}) => {
  const school = await getSchoolById(schoolId);

  return (
    <div className="p-6 font-primary">
      <Link href="/manage-school">
        <ArrowLeft className="mb-4" />
      </Link>

      <h1>Edit School: {school.name}</h1>
      <EditForm schoolData={school} />
    </div>
  );
};

export default EditSchoolPage;

