import React from 'react'
import { useGetCurrentUser } from '../../react-query/queriesAndMutations'
import Loader from '../../components/shared/Loader';
import GridPostList from '../../components/shared/GridPostList';
import save from '../../../Public/Assets/icons/save.svg'

const Saved = () => {

  const{data:currentUser} = useGetCurrentUser()

  const savePosts = currentUser?.save.map((savedPost)=>({
    ...savedPost.post,
    creator:{
      imageUrl:currentUser.imageUrl,
    },
  })).reverse();

  return (
    <div className='saved-container'>
      <div className='flex gap-2 w-wull max-w-5xl'>
        <img src={save} alt='saved' width={36} height={36} className='invert-white' />
        <h2 className='h3-bold md:h2-bold text-left w-full'>Saved Posts</h2>
      </div>
      {!currentUser ? (<Loader />) : (
        <ul className='w-full flex justify-center max-w-5xl gap-9'>
          {savePosts.length === 0? (
            <p className='text-customGreen-3'>No Avaliable Posts</p>
          ):(
            <GridPostList posts={savePosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  )
}

export default Saved;