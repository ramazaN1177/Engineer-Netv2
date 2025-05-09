import React, { useEffect } from 'react';
import { Link, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { useLogOut } from '../../react-query/queriesAndMutations';
import { useUserContext } from '../../context/AuthContext';
import { sidebarLinks } from '../../constants';
import { CiLogout } from "react-icons/ci";

const LeftSidebar = () => {
    const { mutate: logOut, isSuccess } = useLogOut();
    const navigate = useNavigate();
    const { user } = useUserContext();
    const { pathname } = useLocation();

    useEffect(() => {
        if (isSuccess) {
            navigate(0);
        }
    }, [isSuccess]);

    return (
        
        <nav className='leftsidebar'>
            <div className='flex flex-col gap-11'>
                <Link to='/' className='flex gap-3 items-center flex-col'>
                    <img
                        src='/Assets/images/logo.svg'
                        alt='logo'
                        width={170}
                        height={100}
                    />
                    <h2 className='font-extralight'>Engineer Net</h2>
                </Link>

                <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
                    <img
                        src={user.imageUrl || "/Assets/icons/profile-placeholder.svg"}
                        alt="profile"
                        className='h-14 w-14 rounded-full'
                    />
                    <div className='flex flex-col'>
                        <p className='body-bold'>{user.name} </p>
                        <p className='small-regular text-light-3'>@{user.username}</p>
                    </div>
                </Link>
                
                <hr />
                
                <ul className='flex flex-col gap-6'>
          
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.route;
                        return (
                            
                            <li
                                className={`leftsidebar-link group ${isActive && 'bg-gray-700'
                                    }`}
                                key={link.label}
                            >
                                <NavLink to={link.route} className='flex gap-4 items-center p-4'>
                                    {/* React Icon Bileşeni */}
                                    <link.imgURL
                                        className={`text-2xl ${isActive ? 'text-white' : 'text-yellow-400'
                                            } group-hover:text-white`}
                                    />
                                    <span className={`${isActive && 'text-white'
                                        }`}>
                                        {link.label}
                                    </span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <hr />
            <button
                variant='ghost'
                className='shad-button_ghost group'
                onClick={() => logOut()}
            >
                <CiLogout className='text-yellow-400 text-2xl group-hover:text-white'  />
                <p className='small-medium lg:base-medium'>Logout</p>
            </button>
        </nav>
    );
};

export default LeftSidebar;