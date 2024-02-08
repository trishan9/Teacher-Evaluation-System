import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { doc, updateDoc } from "firebase/firestore";
import { Trash2Icon, Search, UserRoundPlus } from "lucide-react";
import ChangeNameModal from "@/components/Modals/ChangeName";
import ChangePasswordModal from "@/components/Modals/ChangePassword";
import {
  changeNameModal,
  changePasswordModal,
  addTeacherModal,
  schoolState,
} from "@/states";
import { db } from "@/config/firebase";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AddTeacherModal from "@/components/Modals/AddTeacher";

const Settings = () => {
  const [, setIsChangeNameModalOpen] = useRecoilState(changeNameModal);
  const [, setIsChangePasswordModalOpen] = useRecoilState(changePasswordModal);
  const [, setIsAddTeacherModalOpen] = useRecoilState(addTeacherModal);
  const [schoolData, setSchoolData] = useRecoilState(schoolState);
  const [isSearchNotFound, setIsSearchNotFound] = useState(false);
  const [teachers, setTeachers] = useState([]);

  const { toast } = useToast();

  useEffect(() => {
    if (schoolData && schoolData.teachers) {
      setTeachers(schoolData.teachers);
    }
  }, [schoolData]);

  const handleDeleteTeacher = (id) => {
    const teachers = schoolData.teachers;

    const filteredTeachers = teachers.filter((teacher) => teacher.id != id);
    setSchoolData((prevData) => {
      return { ...prevData, teachers: filteredTeachers };
    });

    const docRef = doc(db, "schools", schoolData.id);
    updateDoc(docRef, {
      teachers: filteredTeachers,
    })
      .then(() => {
        toast({
          title: "Teacher Deleted!",
          description: "Teacher has been deleted successfully!",
        });
      })
      .catch(() => {
        setSchoolData((prevData) => {
          return { ...prevData, teachers: teachers };
        });
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      });
  };

  const handleSearch = (query) => {
    const filteredTeachers = schoolData.teachers.filter((teacher) => {
      return teacher.name.toLowerCase().startsWith(query.toLowerCase());
    });
    if (filteredTeachers.length > 0) {
      setIsSearchNotFound(false);
      setTeachers(filteredTeachers);
    } else {
      setTeachers(filteredTeachers);
      setIsSearchNotFound(true);
    }
  };

  return (
    <div className="flex flex-col w-full gap-8">
      <p className="text-xl font-bold text-accent_primary">Settings</p>

      <div className="flex flex-col w-full gap-6">
        <div className="grid w-full grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2">
          <button
            onClick={() => setIsChangeNameModalOpen(true)}
            className="p-2 text-sm transition-all ease-in-out bg-white border-2 rounded-lg cursor-pointer text-accent_primary hover:bg-gray-100"
          >
            Change Institution's Name
          </button>

          <button
            onClick={() => setIsChangePasswordModalOpen(true)}
            className="p-2 text-sm transition-all ease-in-out bg-white border-2 rounded-lg text-accent_primary hover:bg-gray-100"
          >
            Change Institution's Password
          </button>
        </div>
      </div>

      <div className="relative flex flex-col w-full">
        <div className="flex flex-col w-full lg:justify-between lg:items-center lg:flex-row">
          <p className="text-lg font-semibold">Teachers</p>

          <div className="flex items-stretch justify-between mt-2 sm:gap-4 lg:mt-0">
            <div className="relative flex items-center justify-center">
              <Input
                onChange={(e) => handleSearch(e.target.value)}
                type="text"
                className="border-gray-300 bg-[white] border w-[18rem] sm:w-[20rem] rounded-md pr-[2.8rem]"
                placeholder="Search Teachers"
              />

              <div className="absolute right-0 p-1 mr-2 bg-white border-2 border-gray-300 rounded-md">
                <Search className="w-4 h-4 " />
              </div>
            </div>

            <button
              disabled={!schoolData}
              onClick={() => setIsAddTeacherModalOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-1.5 font-semibold transition hover:bg-[#1e2f49] border-2 rounded-md bg-accent_primary text-accent_secondary disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-accent_primary disabled:hover:text-accent_secondary"
            >
              <UserRoundPlus className="w-4 h-4" />

              <p className="hidden text-sm sm:block">Add Teacher</p>
            </button>
          </div>
        </div>

        <div className="flex flex-col w-full gap-6 mb-8">
          <div className="pr-0">
            <div className="flow-root">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full py-2 align-middle">
                  <table className="min-w-full divide-y divide-gray-300">
                    <tbody className="divide-y divide-gray-200">
                      {teachers &&
                        teachers?.map((data) => (
                          <tr key={data.id} className="flex justify-between">
                            <td className="flex flex-col gap-2 py-[22px] pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">
                              <p className="text-accent_primary w-[242px] font-medium">
                                Teacher's Name
                              </p>

                              <p className="text-base font-semibold">
                                {data.name}
                              </p>
                            </td>

                            <td className="font-semibold flex flex-col items-center justify-center gap-2 px-3 py-[22px] text-sm text-gray-500 whitespace-nowrap">
                              <p className="font-medium text-accent_primary">
                                Faculty
                              </p>

                              <p className="text-base">{data.subject}</p>
                            </td>

                            <td className="flex items-center gap-3 px-3 py-[22px] text-sm text-gray-500 whitespace-nowrap">
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <button className="bg-white w-12 h-12 flex items-center justify-center hover:bg-gray-100 hover:border-error !font-normal bg-brand-white text-light-text-primary rounded-md border border-light-border">
                                    <Trash2Icon className="w-5 text-error" />
                                  </button>
                                </AlertDialogTrigger>

                                <AlertDialogContent className="font-primary">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will
                                      permanently delete teacher and will be
                                      removed from our servers.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>

                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>

                                    <Button
                                      variant="destructive"
                                      onClick={() =>
                                        handleDeleteTeacher(data.id)
                                      }
                                    >
                                      Delete
                                    </Button>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </td>
                          </tr>
                        ))}
                      {schoolData &&
                        schoolData.teachers &&
                        teachers.length == 0 &&
                        !isSearchNotFound && (
                          <tr className="w-full">
                            <td colSpan={4}>
                              <p className="py-6 text-center text-red-700">
                                No any Participants to show!
                              </p>
                            </td>
                          </tr>
                        )}
                      {isSearchNotFound && (
                        <tr className="w-full">
                          <td colSpan={4}>
                            <p className="py-6 text-center ">
                              Search results not found!
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChangeNameModal />

      <ChangePasswordModal />

      <AddTeacherModal />
    </div>
  );
};

export default Settings;
