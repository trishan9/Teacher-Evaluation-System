import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSchoolById } from "@/server/actions";
import EditForm from "./_components/editForm";

const EditSchoolPage = async ({
  params: { schoolId },
}: {
  params: { schoolId: string };
}) => {
  const school = await getSchoolById(schoolId);

  return (
    <div className="p-6 font-primary">
      <Link href="/manage-school">
        <ArrowLeft className="mb-4 ml-4" />
      </Link>

      <EditForm schoolData={school} />
    </div>
  );
};

export default EditSchoolPage;
