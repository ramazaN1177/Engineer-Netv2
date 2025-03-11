import { React, useState, useEffect } from 'react'
import { useDeleteSevedPost, useLikePost, useSavePost,useGetCurrentUser } from '../../react-query/queriesAndMutations'
import { checkIsLiked } from '../../appwrite/utils';

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
            deleteSavedPost(savedPostRecord.$id);
           
        } else {
            savePost({postId:post?.$id ||'',userId});
            setIsSaved(true);
        }


    }


    return (
        <div className='flex justify-between items-center z-20'>
            <div className='flex gap-2 mr-5'>
                <img
                    src={`${checkIsLiked(likes, userId) ? "/Assets/icons/liked.svg" : "/Assets/icons/like.svg"}`}
                    alt="like"
                    width={20}
                    height={20}
                    onClick={handleLikePost}
                    className='cursor-pointer' />
                <p className='small-medium lg:base-medium'>{likes.length}</p>
            </div>
            <div className='flex gap-2'>
                <img
                    src={isSaved ? "/Assets/icons/saved.svg" : "/Assets/icons/save.svg"}
                    alt="save"
                    width={20}
                    height={20}
                    onClick={handleSavePost}
                    className='cursor-pointer' />
            </div>

        </div>
    )
}

export default PostStats