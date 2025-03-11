import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { toast } from 'react-toastify';
import { useLoginAccount } from '../../react-query/queriesAndMutations';
import { useUserContext } from '../../context/AuthContext';


const LoginForm = () => {
    const navigate = useNavigate();

    const { isLoading: isUserLoading, checkAuthUser } = useUserContext();

    const { mutateAsync: loginAccount } = useLoginAccount();



    async function handleSubmit(values) {
        try {
            const session = await loginAccount({
                email: values.email,
                password: values.password
            });

            if (session) {
                const isUserExist = await checkAuthUser(); // Kullanıcı var mı kontrol et

                if (isUserExist) {
                    toast.success("Login Successful!");
                    navigate("/"); // Ana sayfaya yönlendirme
                } else {
                    toast.error("User not found. Please check your credentials.");
                }
            } else {
                toast.error("Login Failed!");
            }
        } catch (error) {
            toast.error("An error occurred during login.");
            console.error(error);
        }
    }




    return (
        <div >

            <div>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={handleSubmit}
                >

                    {({ isSubmitting }) => (
                        <Form className="space-y-4 bg-customGreen p-4 rounded-lg w-96 shadow-lg shadow-gray-900" >
                            <div className="flex justify-center items-center">
                                <div className="w-32 h-32 flex justify-center items-center rounded-full">
                                    <img src="/Assets/images/logo.svg" alt="logo" className="w-full h-full object-contain rounded-full" />
                                </div>
                            </div>
                            <h2 className='flex justify-center h3-bold md:h2-bold pt-5 sm:pt-12 text-black'>Login</h2>



                            <Field
                                className="w-full p-2 border border-gray-600 rounded text-black focus:outline-none focus:ring-2 focus:ring-black" 
                                type="email"
                                name="email"
                                placeholder="E-Mail"
                            />



                            <Field
                                className="w-full p-2 border border-gray-600 rounded text-black focus:outline-none focus:ring-2 focus:ring-black"
                                type="password"
                                name="password"
                                placeholder="Password"
                            />


                            <button className="w-full py-2 bg-gray-800 text-white rounded mt-4 hover:bg-gray-500 " type="submit" disabled={isSubmitting}>
                                {isUserLoading ? "Logging in..." : "Login"}
                            </button>

                            <div className="text-center mt-4">
                                <p>
                                    Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
                                </p>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default LoginForm;