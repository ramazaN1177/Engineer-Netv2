import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import Loader from '../../components/shared/Loader';
import {toast} from 'react-toastify';
import { useCreateUserAccount } from '../../react-query/queriesAndMutations';
import { useUserContext } from '../../context/AuthContext';


const RegisterForm = () => {
    const navigate = useNavigate();

    const{isLoading: isUserLoading } = useUserContext();

    const {mutateAsync : createUserAccount, isPending:isCreatingAccount} = useCreateUserAccount();
   // const {mutateAsync: loginAccount, isPending: isLoggingIn} = useLoginAccount();
    

    async function onSubmit(values) {
        const newUser = await createUserAccount(values);
        toast.success("User Created Successfully!");
        navigate("/login");
        console.log(newUser);
        if(!newUser){
            return toast.error("User Creation Failed!");
        }

        // const session = await loginAccount({
        //     email: values.email,
        //     password: values.password
        // })
        // if(!session){
        //     return toast.error("Login Failed!");
        // }

        // const isLoggedIn = await checkAuthUser();

        // if(isLoggedIn){

        //     navigate('/')
        // }
        // else{
        //    return toast.error("User Login Failed!");
        // }
    }


    return (
        <div>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    username: '',
                    password: ''
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    await onSubmit(values);
                    setSubmitting(false);
                }}
            >
                <Form className="space-y-4  bg-customGreen p-4 rounded-lg w-96  shadow-lg shadow-gray-900" >
                    <div className="flex justify-center items-center">
                        <div className="w-32 h-32 flex justify-center items-center rounded-full">
                            <img src="/Assets/images/logo.svg" alt="logo" className="w-full h-full object-contain rounded-full" />
                        </div>
                    </div>

                    <h2 className='flex justify-center h3-bold md:h2-bold pt-5 sm:pt-12 text-black'>Register</h2>

                    <Field
                        name="name"
                        type="text"
                        placeholder="Name"
                        className="w-full p-2 border border-gray-600 rounded text-black focus:outline-none focus:ring-2 focus:ring-black"
                        />


                    <Field
                        name="email"
                        type="text"
                        placeholder="E-Mail"
                        className="w-full p-2 border border-gray-600 rounded text-black focus:outline-none focus:ring-2 focus:ring-black"
                        />

                    <Field
                        name="username"
                        type="text"
                        placeholder="Username"
                        className="w-full p-2 border border-gray-600 rounded text-black focus:outline-none focus:ring-2 focus:ring-black"
                        />

                    <Field
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 border border-gray-600 rounded text-black focus:outline-none focus:ring-2 focus:ring-black"
                        />

                    <button type="submit" className="w-full py-2 bg-gray-800 text-white rounded mt-4 hover:bg-gray-500">
                        {isCreatingAccount  || isUserLoading ? (<div className='flex-center gap-2'>
                            <Loader />
                        </div>) : "Save"

                        }
                    </button>

                    <div className="text-center mt-4">
                        <p>Have Already an Account? <Link to="/login" className="text-blue-500">Login</Link></p>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default RegisterForm;
