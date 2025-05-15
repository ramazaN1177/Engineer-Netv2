import React from 'react';
import { Outlet,Navigate } from 'react-router-dom';
import { useUserContext } from '../context/AuthContext';
import sideImg from  '../../Public/Assets/images/side-img.svg';



export default function AuthLayout() {
    const { isAuthenticated } = useUserContext();
  
    return (
      <>
        {isAuthenticated ? (
          <Navigate to="/" />
        ) : (
          <>
            <section className="flex flex-1 justify-center items-center flex-col py-10">
              <Outlet />
            </section>
  
            <img
              src={sideImg}
              alt="logo"
              className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
            />
          </>
        )}
      </>
    );
  }