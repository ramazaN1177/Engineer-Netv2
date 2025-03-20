import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { bottombarLinks } from '../../constants';

const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <section className='bottom-bar'>
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            to={link.route}
            key={link.label}
            className={`${isActive && 'bg-gray-700 rounded-[10px]'} flex-center flex-col gap-1 p-2`}
          >
            {/* React Icon Bileşeni */}
            <link.imgURL
              className={`${isActive ? 'text-white':"text-yellow-400"} text-xl`}
            />
            <p className='tiny-medium text-light-2'>{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;