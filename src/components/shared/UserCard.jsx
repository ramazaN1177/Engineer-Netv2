import React from 'react'
import { Link } from 'react-router-dom';
import placeHolder from '../../../Public/Assets/icons/profile-placeholder.svg';

const UserCard = ({ user }) => {
    return (
      <Link to={`/profile/${user.$id}`} className="user-card">
        <img
          src={user.imageUrl || placeHolder}
          alt="creator"
          className="rounded-full w-14 h-14"
        />
  
        <div className="flex-center flex-col gap-1">
          <p className="base-medium text-light-1 text-center line-clamp-1">
            {user.name}
          </p>
          <p className="small-regular text-customGreen-3 text-center line-clamp-1">
            @{user.username}
          </p>
        </div>
  
    
      </Link>
    );
  };
  
  export default UserCard;