import { Fragment, useState, useRef } from 'react'
import { getAuth, signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { useRecoilState } from 'recoil'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, Transition } from '@headlessui/react'
import { X, Loader2 } from 'lucide-react';
import { changePasswordModal } from '@/states'
import { changePasswordFormSchema } from './formSchema'
import { auth as firebaseAuth } from "@/config/firebase"
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast";

export default function ChangePasswordModal() {
    const auth = getAuth();
    const currentPasswordRef = useRef(null)
    const [shouldNeedCurrentPassword, setShouldNeedCurrentPassword] = useState(false)
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useRecoilState(changePasswordModal)
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: zodResolver(changePasswordFormSchema)
    })
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const handleChangePassword = async (values) => {
        const user = auth.currentUser
        setIsLoading(true)
        updatePassword(user, values.newPassword).then(() => {
            toast({
                title: "Password Changed!",
                description: "Password has been changed successfully!"
            })
            setIsChangePasswordModalOpen(false)
        }).catch(async () => {
            setIsLoading(true)
            setShouldNeedCurrentPassword(true)
            await signInWithEmailAndPassword(firebaseAuth, user.email, currentPasswordRef.current.value)
            const newPassword = values.newPassword
            const newAuth = getAuth()
            const newUser = newAuth.currentUser
            updatePassword(newUser, newPassword).then(() => {
                toast({
                    title: "Password Changed!",
                    description: "Password has been changed successfully!"
                })
                setIsChangePasswordModalOpen(false)
                setShouldNeedCurrentPassword(false)
            }).catch(() => {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                })
            }).finally(() => {
                setIsLoading(false)
            });
        }).finally(() => {
            setIsLoading(false)
        });
    }

    return (
        <Transition.Root show={isChangePasswordModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setIsChangePasswordModalOpen}>
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
                                <form onSubmit={handleSubmit(handleChangePassword)}>
                                    <div>
                                        <div>
                                            <Dialog.Title as="h3" className="flex justify-between w-full text-base font-semibold leading-6 text-gray-900">
                                                <p>
                                                    Change Password
                                                </p>

                                                <button type='button' onClick={() => setIsChangePasswordModalOpen(false)}>
                                                    <X className='w-6 p-1 bg-gray-300 rounded-md cursor-pointer hover:bg-gray-200' />
                                                </button>
                                            </Dialog.Title>

                                            <div className="flex flex-col gap-4 mt-5">
                                                {shouldNeedCurrentPassword &&
                                                    <div className='flex flex-col gap-1'>
                                                        <label className="text-sm text-gray-500 ">
                                                            Current Password
                                                        </label>

                                                        <Input
                                                            required
                                                            ref={currentPasswordRef}
                                                            type="password"
                                                            className='w-full bg-white border border-gray-300 rounded-md outline-none'
                                                        />
                                                    </div>
                                                }


                                                <div className='flex flex-col gap-1'>
                                                    <label className="text-sm text-gray-500 ">
                                                        New Password
                                                    </label>

                                                    <Input
                                                        {...register("newPassword")}
                                                        type="password"
                                                        className='w-full bg-white border border-gray-300 rounded-md outline-none'
                                                    />
                                                    {errors.newPassword && <p className="text-sm text-error">{errors.newPassword.message}</p>}
                                                </div>

                                                <div className='flex flex-col gap-1'>
                                                    <label className="text-sm text-gray-500">
                                                        Confirm Password
                                                    </label>

                                                    <Input
                                                        {...register("confirmNewPassword")}
                                                        type="password"
                                                        className='w-full bg-white border border-gray-300 rounded-md outline-none'
                                                    />
                                                    {errors.confirmNewPassword && <p className="text-sm text-error">{errors.confirmNewPassword.message}</p>}
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