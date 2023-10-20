import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useRecoilState } from 'recoil'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addTeacherFormSchema } from './formSchema'
import { schoolState } from '@/states'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/config/firebase';
import { addTeacherModal } from '@/states'
import { v4 as uuidv4 } from 'uuid';

export default function AddTeacherModal() {
    const [isAddTeacherModalOpen, setIsAddTeacherModalOpen] = useRecoilState(addTeacherModal)
    const [schoolData, setSchoolData] = useRecoilState(schoolState)
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: zodResolver(addTeacherFormSchema)
    })

    const handleChangeName = async (values) => {
        setIsAddTeacherModalOpen(false)

        const teachers = [...schoolData.teachers]
        teachers.push({
            id: uuidv4(),
            name: values.name,
            subject: values.subject
        })
        setSchoolData(prevData => { return { ...prevData, teachers: teachers } })

        const docRef = doc(db, "schools", schoolData.id)
        updateDoc(docRef, {
            teachers: teachers
        })
    }

    return (
        <Transition.Root show={isAddTeacherModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setIsAddTeacherModalOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto m font-primary">
                    <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform rounded-lg shadow-xl bg-neutral_white sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <form onSubmit={handleSubmit(handleChangeName)}>
                                    <div>
                                        <div>
                                            <Dialog.Title as="h3" className="flex justify-between w-full text-base font-semibold leading-6 text-gray-900">
                                                <p>
                                                    Add New Teacher
                                                </p>

                                                <button type='button' onClick={() => setIsAddTeacherModalOpen(false)}>
                                                    <XMarkIcon className='w-6 p-1 bg-gray-300 rounded-md cursor-pointer hover:bg-gray-200' />
                                                </button>
                                            </Dialog.Title>

                                            <div className="flex flex-col gap-4 mt-5">
                                                <div className='flex flex-col gap-1'>
                                                    <label className="text-sm text-gray-500 ">
                                                        Teacher's Name
                                                    </label>

                                                    <input
                                                        {...register("name")}
                                                        type="text"
                                                        className='w-full bg-white border border-gray-300 rounded-md outline-none'
                                                    />
                                                    {errors.name && <p className="text-sm text-error">{errors.name.message}</p>}
                                                </div>

                                                <div className='flex flex-col gap-1'>
                                                    <label className="text-sm text-gray-500">
                                                        Subject
                                                    </label>

                                                    <input
                                                        {...register("subject")}
                                                        type="text"
                                                        className='w-full bg-white border border-gray-300 rounded-md outline-none'
                                                    />
                                                    {errors.subject && <p className="text-sm text-error">{errors.subject.message}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm bg-accent_primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Add Teacher
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}