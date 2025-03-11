import React from 'react'
import Loader from '../../components/shared/Loader';
import { useGetUsers } from '../../react-query/queriesAndMutations'
import UserCard from '../../components/shared/UserCard';


const AllUsers = () => {

  const {data:creators, isPending:isUserLoading} = useGetUsers();

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {isUserLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid ">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;