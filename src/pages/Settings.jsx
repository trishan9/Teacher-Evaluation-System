import { useRecoilState } from "recoil"
import { TrashIcon, UserPlusIcon } from "@heroicons/react/24/outline"
import { doc, updateDoc } from "firebase/firestore"
import ChangeNameModal from "@/components/Modals/ChangeName"
import ChangePasswordModal from "@/components/Modals/ChangePassword"
import { changeNameModal, changePasswordModal, addTeacherModal, schoolState } from "@/states"
import { db } from '@/config/firebase';
import AddTeacherModal from "@/components/Modals/AddTeacher"

const Settings = () => {
    const [, setIsChangeNameModalOpen] = useRecoilState(changeNameModal)
    const [, setIsChangePasswordModalOpen] = useRecoilState(changePasswordModal)
    const [, setIsAddTeacherModalOpen] = useRecoilState(addTeacherModal)
    const [schoolData, setSchoolData] = useRecoilState(schoolState)

    const handleDeleteTeacher = (id) => {
        const teachers = schoolData.teachers

        const filteredTeachers = teachers.filter(teacher => teacher.id != id)
        setSchoolData(prevData => { return { ...prevData, teachers: filteredTeachers } })

        const docRef = doc(db, "schools", schoolData.id)
        updateDoc(docRef, {
            teachers: filteredTeachers
        }).then(() => {
            console.log("Done")
        }).catch(() => {
            setSchoolData(prevData => { return { ...prevData, teachers: teachers } })
        })
    }

    return (
        <div className="flex flex-col w-full gap-8">
            <p className="text-xl font-bold text-accent_primary">Settings</p>

            <div className="flex flex-col w-full gap-6">
                <div className="grid w-full grid-cols-2 gap-12">
                    <button
                        onClick={() => setIsChangeNameModalOpen(true)}
                        className="p-3 transition-all ease-in-out bg-white border-2 rounded-lg cursor-pointer text-accent_primary hover:bg-gray-100">
                        Change Institution's Name
                    </button>

                    <button
                        onClick={() => setIsChangePasswordModalOpen(true)}
                        className="p-3 transition-all ease-in-out bg-white border-2 rounded-lg text-accent_primary hover:bg-gray-100">
                        Change Institution's Password
                    </button>
                </div>
            </div>

            <div className="relative flex flex-col w-full">
                <div className="flex items-center justify-between w-full">
                    <p className="text-lg font-semibold">Teachers</p>

                    <button
                        onClick={() => setIsAddTeacherModalOpen(true)}
                        className="flex items-center justify-center gap-3 px-6 py-3 mr-8 font-semibold transition-all ease-in-out border-2 rounded-md bg-accent_primary text-accent_secondary hover:bg-white hover:text-black"
                    >
                        <UserPlusIcon className="w-5" />

                        Add Teacher
                    </button>
                </div>

                <div className="flex flex-col w-full gap-6 mb-8">
                    <div className="pr-4 sm:pr-6 lg:pr-8">
                        <div className="flow-root">
                            <div className="overflow-x-auto ">
                                <div className="inline-block min-w-full py-2 align-middle">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <tbody className="divide-y divide-gray-200">
                                            {
                                                schoolData &&
                                                schoolData.teachers?.map((data) => (
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

                                                            <p className="text-base text-brand-black">
                                                                {data.subject}
                                                            </p>
                                                        </td>


                                                        <td className="flex items-center gap-3 px-3 py-[22px] text-sm text-gray-500 whitespace-nowrap">
                                                            <button
                                                                onClick={() => handleDeleteTeacher(data.id)}
                                                                className="bg-white w-12 h-12 flex items-center justify-center hover:bg-gray-100 hover:border-error !font-normal bg-brand-white text-light-text-primary rounded-md border border-light-border"
                                                            >
                                                                <TrashIcon className="w-5 text-error" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
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
    )
}

export default Settings
