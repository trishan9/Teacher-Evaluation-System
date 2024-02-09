import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const EditSchoolPage = ({
  params: { schoolId },
}: {
  params: { schoolId: string };
}) => {
  return (
    <div className="p-6 font-primary">
      <Link href="/manage-school">
        <ArrowLeft className="mb-4" />
      </Link>

      <h1>Edit School with id: {schoolId}</h1>
    </div>
  );
};

export default EditSchoolPage;
