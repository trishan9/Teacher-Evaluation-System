
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx';
import menus from '@/constants/menus';

const SideNav = ({ activeMenu }) => {
    const navigate = useNavigate()

    const handleClick = (path) => {
        navigate(path)
    }

    return (
        <div className='bg-white rounded-xl shadow-sm min-h-[80vh] min-w-[16rem] p-6 py-8 flex flex-col items-center gap-16 relative'>
            <div className='flex flex-col items-center'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh7fL2--S3_6WdES4NG7Pviy05s86IZ0A-BLYF908Yf9Pbd_V6_GPBPu-tgOU4fK9ogfE&usqp=CAU" className='w-16 rounded-full' alt="" />

                <p className='pt-2 text-sm text-gray-500'>Super Admin</p>

                <p className='font-semibold text-accent_primary'>Softwarica College</p>
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

            <Link to={"/login"}>
                <button className='absolute flex gap-4 p-2 pr-10 font-semibold text-white underline rounded-md cursor-pointer bg-error hover: bottom-10 left-5'>
                    <ArrowLeftOnRectangleIcon className='w-6' />

                    <p>Logout</p>
                </button>
            </Link>
        </div>
    )
}

export default SideNav