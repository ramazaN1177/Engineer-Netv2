import React from 'react'
import { Link } from 'react-router-dom'
import {timeAgo} from '../../appwrite/utils'
import { useUserContext } from '../../context/AuthContext'
import PostStats from './PostStats'

const PostCard = ({post}) => {

    const {user} = useUserContext();

    if(!post.creator) return;


  return (
    <div className='post-card'>
        <div className='flex-between'>
            <div className='flex items-center gap-3'>
                <Link to={`/profile/${post.creator.$id}`}>
                    <img 
                        src={post?.creator?.imageUrl || '/Assets/icons/profile-placeholder.svg'}
                        alt="creator"
                        className='rounded-full w-12 lg:h-12' />
                </Link>
                <div className='flex flex-col'>
                    <p className='base-medium lg:body-bold text-light-1'>
                        {post.creator.name}
                    </p>
                    <div className='flex-center gap-2 text-customGreen-3'>
                        <p className='subtle-semibold lg:small-regular'>
                            {timeAgo(post.$createdAt)}
                        </p>
                        -
                        <p className='subtle-semibold lg:small-regular'>
                            {post.location}
                        </p>
                    </div>
                </div>
            </div>
            <Link to={`/update-post/${post.$id}`}
                className={`${user.id !== post.creator.$id && "hidden"}`}
            >
                <img 
                    src="/Assets/icons/edit.svg" 
                    alt="edit"
                    width={20}
                     height={20}/>
            </Link>
        </div>
        <Link to = {`/posts/${post.$id}`}>
            <div className='smallmedium lg:base-medium py-5'>
                <p>{post.caption}</p>
                <div className='flex gap-1 mt-2'>
                    
                    <div className='text-customGreen-3'>{post.engineering && `#${post.engineering}`}</div>
                       
                </div>

            </div>
            <img src={post.imageUrl || '/Assets/icons/profile-placeholder.svg'}
                 alt="post image"
                 className='post-card_img' />
        </Link>

        <PostStats post={post} userId={user.id}/>
    </div>
  )
}

export default PostCard