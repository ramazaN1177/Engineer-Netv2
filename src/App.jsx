import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './main.css';
import RegisterForm from './Auth/Forms/RegisterForm';
import LoginForm from './Auth/Forms/LoginForm';
import {Home,AllUsers,EditPost,Explore,Saved,CreatePost,Profile,PostDetails,UpdateProfile,} from './Root/Pages';
import AuthLayout from './Auth/AuthLayout';
import RootLayout from './Root/RootLayout';
import {ToastContainer } from 'react-toastify';

const App = () => {
  return (
        <main className='flex h-screen'>
            <Routes>
            {/* public routes */}
            <Route element = {<AuthLayout/>}>
                <Route path = "/login" element = {<LoginForm/>}/>
                <Route path = "/register" element = {<RegisterForm/>}/>
            </Route>



          
                
            {/* private routes */}
            <Route element = {<RootLayout/>}>
                <Route index element = {<Home/>}/>
                <Route path = "/explore" element = {<Explore/>}></Route>
                <Route path = "/saved" element = {<Saved/>}></Route>
                <Route path = "/all-users" element = {<AllUsers/>}></Route>
                <Route path = "/create-post" element = {<CreatePost/>}></Route>
                <Route path = "/update-post/:id" element = {<EditPost/>}></Route>
                <Route path = "/posts/:id" element = {<PostDetails/>}></Route>
                <Route path = "/profile/:id/*" element = {<Profile/>}></Route>
                <Route path = "/update-profile/:id" element = {<UpdateProfile/>}></Route>

            </Route>


    
            </Routes>
            <ToastContainer/>
        </main>
  )
}

export default App;