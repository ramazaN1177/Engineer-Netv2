import React, { useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useLogOut } from '../../react-query/queriesAndMutations'
import { useUserContext } from '../../context/AuthContext';

const Topbar = () => {


    const {mutate: logOut, isSuccess} = useLogOut();
    const navigate = useNavigate();
    const {user} = useUserContext();


    useEffect(()=>{
        if(isSuccess){
            navigate(0);
        }
    },[isSuccess])

  return (
    <section className='topbar'>
        <div className=' flex-between py-4 px-5'>
            <Link to ='/' className='flex gap-3 items-center'>
                <img 
                    src='/Assets/images/logo.svg'
                    alt='logo'
                    width={34}
                    height={100}
                 />
                 <h2>Engineer Net</h2>
            </Link>

            <div className='flex gap-4'>
                <button variant = 'ghost' className='shad-button_ghost' onClick={()=>logOut()}>
                    <img src="/Assets/icons/logout.svg" alt="logout" />
                </button>
                <Link to = {`/profile/${user.id}`} className='flex justify-center gap-3' >
                    <img src={user.imageUrl || "/Assets/icons/profile-placeholder.svg"} alt="profile" className='h-10 w-10 rounded-full' />
                </Link>
            </div>
        </div>
    </section>
  )
}

export default Topbar;