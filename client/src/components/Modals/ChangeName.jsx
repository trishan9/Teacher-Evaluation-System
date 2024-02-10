import { Fragment, useState } from 'react'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, Transition } from '@headlessui/react'
import { X, Loader2 } from 'lucide-react'
import { changeNameModal } from '@/states'
import { changeNameFormSchema } from './formSchema'
import { schoolState } from '@/states'
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const BASE_URL = import.meta.env.VITE_API_URL

export default function ChangeNameModal() {
    const [isChangeNameModalOpen, setIsChangeNameModalOpen] = useRecoilState(changeNameModal)
    const [schoolData, setSchoolData] = useRecoilState(schoolState)
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: zodResolver(changeNameFormSchema)
    })
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const handleChangeName = async (values) => {
        setIsChangeNameModalOpen(false)

        const currentName = schoolData?.data?.data?.name
        setSchoolData(prevData => {
            return {
                ...prevData,
                data: {
                    ...prevData.data,
                    data: {
                        ...prevData.data.data,
                        name: values.newName
                    }
                }
            }
        })

        try {
            setIsLoading(true)
            await axios.patch(`${BASE_URL}/school/${schoolData?.data?.data?.id}`, {
                name: values.newName
            })

            toast({
                title: "Name Changed!",
                description: "Institution's Name has been changed successfully!"
            })
        } catch {
            setSchoolData(prevData => {
                return {
                    ...prevData,
                    data: {
                        ...prevData.data,
                        data: {
                            ...prevData.data.data,
                            name: currentName
                        }
                    }
                }
            })
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Transition.Root show={isChangeNameModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setIsChangeNameModalOpen}>
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
                            <Dialog.Panel className="relative w-full max-w-sm p-6 px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform rounded-lg shadow-xl bg-neutral_white sm:my-8">
                                <form onSubmit={handleSubmit(handleChangeName)}>
                                    <div>
                                        <div>
                                            <Dialog.Title as="h3" className="flex justify-between w-full text-base font-semibold leading-6 text-gray-900">
                                                <p>
                                                    Change Institution's Name
                                                </p>

                                                <button type='button' onClick={() => setIsChangeNameModalOpen(false)}>
                                                    <X className='w-6 p-1 bg-gray-300 rounded-md cursor-pointer hover:bg-gray-200' />
                                                </button>
                                            </Dialog.Title>

                                            <div className="flex flex-col gap-4 mt-5">
                                                <div className='flex flex-col gap-1'>
                                                    <label className="text-sm text-gray-500 ">
                                                        New Name
                                                    </label>

                                                    <Input
                                                        {...register("newName")}
                                                        type="text"
                                                        className='w-full bg-white border border-gray-300 rounded-md outline-none'
                                                    />
                                                    {errors.newName && <p className="text-sm text-error">{errors.newName.message}</p>}
                                                </div>

                                                <div className='flex flex-col gap-1'>
                                                    <label className="text-sm text-gray-500">
                                                        Confirm New Name
                                                    </label>

                                                    <Input
                                                        {...register("confirmNewName")}
                                                        type="text"
                                                        className='w-full bg-white border border-gray-300 rounded-md outline-none'
                                                    />
                                                    {errors.confirmNewName && <p className="text-sm text-error">{errors.confirmNewName.message}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm bg-accent_primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-[#1e2f49] transition items-center"
                                        >
                                            Save Changes

                                            {isLoading && <Loader2 className='w-5 h-5 ml-2 animate-spin' />}
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