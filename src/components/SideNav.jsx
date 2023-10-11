import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom'
import { getDocs, query, where } from 'firebase/firestore';
import { signOut } from "firebase/auth";
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx';
import menus from '@/constants/menus';
import { auth, schoolsRef } from '@/config/firebase';
import { authState, schoolState } from '@/states';

const SideNav = ({ activeMenu }) => {
    const [authUser] = useRecoilState(authState)
    const [schoolData, setSchoolData] = useRecoilState(schoolState)
    const navigate = useNavigate()

    const handleClick = (path) => {
        navigate(path)
    }

    const handleLogOut = () => {
        signOut(auth).then(() => {
            localStorage.clear()
            navigate("/login")
            setSchoolData(null)
        })
    }

    useEffect(() => {
        const getSchoolDetails = async () => {
            const currentSchoolRef = query(schoolsRef, where("email", "==", authUser.email))
            const snapshot = await getDocs(currentSchoolRef);
            const tempSchools = []
            snapshot?.docs?.map((doc) => {
                tempSchools.push({
                    ...doc.data(), id: doc.id
                })
            });
            setSchoolData(tempSchools[0])
        }
        getSchoolDetails()
    }, [authUser])

    return (
        <div className='bg-white rounded-xl shadow-sm min-h-[80vh] min-w-[16rem] p-6 py-8 flex flex-col items-center gap-16 relative'>
            <div className='flex flex-col items-center'>
                <img src={schoolData && schoolData.logo} className='w-16 rounded-full' alt="" />

                <p className='pt-2 text-sm text-gray-500'>Super Admin</p>

                <p className='font-semibold text-accent_primary'>{schoolData ? schoolData.name : "Loading..."}</p>
            </div>

            <div className='flex flex-col items-start w-full gap-6'>
                {menus.map((menu, index) => (
                    <button
                        key={menu.url}
                        onClick={() => handleClick(menu.url)}
                        className={
                            clsx('flex w-full gap-4 p-2 rounded-md',
                                index == activeMenu && 'cursor-pointer font-bold bg-accent_primary text-accent_secondary'
                            )
                        }
                    >
                        {index == activeMenu ? <menu.solidIcon className='w-6 text-accent_secondary' /> : <menu.icon className='w-6' />}

                        <p>{menu.name}</p>
                    </button>
                ))}
            </div>

            <button onClick={handleLogOut} className='absolute flex gap-4 p-2 pr-10 font-semibold text-white underline rounded-md cursor-pointer bg-error hover: bottom-10 left-5'>
                <ArrowLeftOnRectangleIcon className='w-6' />

                <p>Logout</p>
            </button>
        </div>
    )
}

export default SideNav