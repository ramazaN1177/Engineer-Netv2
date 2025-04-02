import React from 'react'
import { useDeleteSevedPost, useGetPostById } from '../../react-query/queriesAndMutations'
import { useParams } from 'react-router-dom'
import Loader from '../../components/shared/Loader'
import { Link } from 'react-router-dom'
import { timeAgo } from '../../appwrite/utils'
import { useUserContext } from '../../context/AuthContext'
import PostStats from '../../components/shared/PostStats'
import { useDeletePost } from '../../react-query/queriesAndMutations'
import { useNavigate } from 'react-router-dom'
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useGetCurrentUser } from '../../react-query/queriesAndMutations'

const PostDetails = () => {

  const { data: currentUser } = useGetCurrentUser()
  const navigate = useNavigate();

  const {id} = useParams()

  const { data: post, isPending} = useGetPostById(id || '');
  const savedPostRecord = currentUser?.save.find((record) => record.post.$id === post?.$id);

  const {user} = useUserContext();
  const { mutate: deletePost } = useDeletePost();

  const {mutate: deleteSavePost} = useDeleteSevedPost();

  const handleDeletePost = async () => {
    try {
      // Eğer post kaydedilmişse, kaydedilenlerden sil
      if (post?.save !==0 && savedPostRecord) {
         deleteSavePost(savedPostRecord.$id); // Kaydedilen postu sil
      }
  
      // Post'u sil
       deletePost({ postId: id, imageId: post?.imageId });
  
      // Kullanıcıyı önceki sayfaya yönlendir
      navigate(-1);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className='post_details-container'>
      {isPending ? <Loader/>:(
        <div className='post_details-card'>
          <img 
            src={post?.imageUrl} 
            alt="post"
            className='post_details-img' />

             <div className='post_details-info'>

              <div className='flex-between w-full'>
              <Link to={`/profile/${post?.creator.$id}`} className='flex items-center gap-3'>
                    <img 
                        src={post?.creator?.imageUrl || '/Assets/icons/profile-placeholder.svg'}
                        alt="creator"
                        className='rounded-full w-8 h-8 lg:w-12 lg:h-12' />
               
                <div className='flex flex-col'>
                    <p className='base-medium lg:body-bold text-light-1'>
                        {post?.creator.name}
                    </p>
                    <div className='flex-center gap-2 text-customGreen-3'>
                        <p className='subtle-semibold lg:small-regular'>
                            {timeAgo(post?.$createdAt)}
                        </p>
                        -
                        <p className='subtle-semibold lg:small-regular'>
                            {post?.location}
                        </p>
                    </div>
                </div>
                </Link>
                <div className='flex-center gap-4'>
                    <Link to = {`/update-post/${post?.$id}`} className={`group ${user.id !== post?.creator.$id && 'hidden'}`}>
                        <FiEdit className='text-xl text-yellow-400 group-hover:text-white' />
                    </Link>
                    <button 
                      onClick={handleDeletePost}
                      variant = "ghost"
                      className={`ghost_details-delete-btn group ${user.id !== post?.creator.$id && "hidden"}`}
                      >
                      <MdDeleteOutline className='text-2xl text-blue-800 group-hover:text-white' />
                      
                    </button>
                </div>
              </div>


              <hr className='border w-full border-customGreen-2' />
              <div className='flex flex-col flex-1 w-full small-medium lg:base-regular'>
                <p>{post?.caption}</p>
                <div className='flex gap-1 mt-2'>
                    
                    <div className='text-customGreen-3'>{post.engineering && `#${post.engineering}`}</div>
                       
                </div>

            </div>
            <div className='w-full'>
              <PostStats post={post ||{}} userId={user.id}/>
              
            </div>
          </div>

        </div>
      )}

    </div>
  )
}

export default PostDetails;