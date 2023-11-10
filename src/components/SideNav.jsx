import { useState, useLayoutEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx';
import { useSchoolData, useLogin } from '@/hooks';
import { menus, PATHS } from '@/constants';
import { AvatarSkeleton, TextSkeleton } from '@/components/Skeleton';

const SideNav = ({ active }) => {
    const [activeMenu, setActiveMenu] = useState(active)
    const navigate = useNavigate()
    const location = useLocation();

    useLayoutEffect(() => {
        setActiveMenu(PATHS[location.pathname])
    }, [location])

    const { schoolData, isLoading } = useSchoolData()
    const { logout } = useLogin()

    return (
        <div className='bg-white rounded-xl shadow-sm min-h-[80vh] min-w-[16rem] p-6 py-8 flex flex-col items-center gap-16 relative'>
            {isLoading && <SideNavSkeleton />}

            {!isLoading && !schoolData && <SideNavSkeleton />}

            {!isLoading && schoolData &&
                <div className='flex flex-col items-center'>
                    <img src={schoolData.logo} className='w-16 rounded-full' alt={schoolData.name} />

                    <p className='pt-2 text-sm text-gray-500'>Super Admin</p>

                    <p className='font-semibold text-accent_primary'>{schoolData.name}</p>
                </div>
            }

            <div className='flex flex-col items-start w-full gap-6'>
                {menus.map((menu, index) => (
                    <button
                        key={menu.url}
                        onClick={() => {
                            setActiveMenu(index)
                            navigate(menu.url)
                        }}
                        className={
                            clsx('flex w-full gap-4 p-2 rounded-md',
                                index == activeMenu ? 'cursor-pointer font-bold bg-accent_primary text-accent_secondary transition-all ease-in-out' : "hover:bg-neutral_white"
                            )
                        }
                    >
                        {index == activeMenu ? <menu.solidIcon className='w-6 text-accent_secondary' /> : <menu.icon className='w-6' />}

                        <p>{menu.name}</p>
                    </button>
                ))}
            </div>

            <button onClick={logout} className='absolute flex gap-4 p-2 pr-10 font-semibold text-white underline rounded-md cursor-pointer bg-error hover: bottom-10 left-5'>
                <ArrowLeftOnRectangleIcon className='w-6' />

                <p>Logout</p>
            </button>
        </div>
    )
}

export default SideNav


const SideNavSkeleton = () => {
    return (
        <div className='flex flex-col items-center gap-3.5 mb-1'>
            <AvatarSkeleton />

            <TextSkeleton styles="w-24 h-2" />

            <TextSkeleton styles="w-32 h-3" />
        </div>
    )
}