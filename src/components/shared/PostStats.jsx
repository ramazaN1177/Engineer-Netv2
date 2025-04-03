import { React, useState, useEffect } from 'react'
import { useDeleteSevedPost, useLikePost, useSavePost,useGetCurrentUser } from '../../react-query/queriesAndMutations'
import { checkIsLiked } from '../../appwrite/utils';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { BsBookmark,BsBookmarkFill  } from "react-icons/bs";

const PostStats = ({ post, userId }) => {
    const { data: currentUser } = useGetCurrentUser();

    const likesList = post?.likes.map((user) => user.$id);
    const [likes, setLikes] = useState(likesList)
    const [isSaved, setIsSaved] = useState(false)

    const { mutate: likePost } = useLikePost();
    const { mutate: savePost } = useSavePost();
    const { mutate: deleteSavedPost } = useDeleteSevedPost();

    const savedPostRecord = currentUser?.save.find((record) => record.post.$id === post?.$id);

    useEffect(() => {
        setIsSaved(!!savedPostRecord)
    }, [currentUser]);


    const handleLikePost = (e) => {
        e.stopPropagation();

        let newLikes = [...likes];

        const hasLiked = newLikes.includes(userId);


        if (hasLiked) {
            newLikes = newLikes.filter((id) => id !== userId);
        } else {
            newLikes.push(userId);
        }
        setLikes(newLikes);
        likePost({ postId: post?.$id || '', likesArray: newLikes });
    }
    const handleSavePost = (e) => {
        e.stopPropagation();


        if(savedPostRecord){
            setIsSaved(false);
            return deleteSavedPost(savedPostRecord.$id);
           
        } else {
            savePost({postId:post?.$id ||'',userId});
            setIsSaved(true);
        }


    }


    return (
        <div className='flex justify-between items-center z-20'>
            <div className='flex gap-2 mr-5' >
               <div onClick={handleLikePost}>{checkIsLiked(likes, userId) ? <FaHeart  className='text-xl text-yellow-400' /> : <FaRegHeart  className='text-xl text-yellow-400 ' />}</div>

                <p className='small-medium lg:base-medium mt-0.4'>{likes.length}</p>
            </div>
            <div className='flex gap-2'>
              
            <div onClick={handleSavePost}>{isSaved ? <BsBookmarkFill className='text-xl text-yellow-400' /> : <BsBookmark className='text-xl text-yellow-400'  />}</div>

            </div>

        </div>
    )
}

export default PostStats