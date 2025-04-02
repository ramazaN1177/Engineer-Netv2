import React from 'react'
import Loader from '../../components/shared/Loader'
import GridPostList from '../../components/shared/GridPostList'
import { useGetCurrentUser } from '../../react-query/queriesAndMutations'

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser()

  if(!currentUser)
    return (
      <div className='flex flex-center w-full h-full'>
        <Loader />
      </div>
    );
  return (
    <>
      {currentUser.liked.length === 0? (
            <p className='text-customGreen-3'>No Avaliable Posts</p>
          ):(
            <GridPostList posts={currentUser.liked} showStats={false} />
          )}
    </>
  )
}

export default LikedPosts