import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Loader from '../../components/shared/Loader';
import { toast } from 'react-toastify';
import { useCreateUserAccount } from '../../react-query/queriesAndMutations';
import { useUserContext } from '../../context/AuthContext';
import logo from '../../../Public/Assets/images/logo.svg';

// Add validation schema
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const RegisterForm = () => {
    const navigate = useNavigate();

    const { isLoading: isUserLoading } = useUserContext();

    const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();
    
    async function onSubmit(values) {
        try {
            const newUser = await createUserAccount(values);
            
            if(!newUser){
                toast.error("User Creation Failed!");
                return;
            }
            
            toast.success("User Created Successfully!");
            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error);
            toast.error(error?.message || "User Creation Failed!");
        }
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
                validationSchema={RegisterSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    await onSubmit(values);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting, errors, touched }) => (
                <Form className="space-y-4 bg-customGreen p-4 rounded-lg w-96 shadow-lg shadow-gray-900" >
                    <div className="flex justify-center items-center">
                        <div className="w-32 h-32 flex justify-center items-center rounded-full">
                            <img src={logo} alt="logo" className="w-full h-full object-contain rounded-full" />
                        </div>
                    </div>

                    <h2 className='flex justify-center h3-bold md:h2-bold pt-5 sm:pt-12 text-black'>Register</h2>

                    <div className="mb-2">
                        <Field
                            name="name"
                            type="text"
                            placeholder="Name"
                            className={`w-full p-2 border ${errors.name && touched.name ? 'border-rose-500' : 'border-gray-600'} rounded text-black focus:outline-none focus:ring-2 focus:ring-black`}
                        />
                        <ErrorMessage name="name" component="div" className="text-rose-500 text-sm mt-1" />
                    </div>

                    <div className="mb-2">
                        <Field
                            name="email"
                            type="email"
                            placeholder="E-Mail"
                            className={`w-full p-2 border ${errors.email && touched.email ? 'border-rose-500' : 'border-gray-600'} rounded text-black focus:outline-none focus:ring-2 focus:ring-black`}
                        />
                        <ErrorMessage name="email" component="div" className="text-rose-500 text-sm mt-1" />
                    </div>

                    <div className="mb-2">
                        <Field
                            name="username"
                            type="text"
                            placeholder="Username"
                            className={`w-full p-2 border ${errors.username && touched.username ? 'border-rose-500' : 'border-gray-600'} rounded text-black focus:outline-none focus:ring-2 focus:ring-black`}
                        />
                        <ErrorMessage name="username" component="div" className="text-rose-500 text-sm mt-1" />
                    </div>

                    <div className="mb-2">
                        <Field
                            name="password"
                            type="password"
                            placeholder="Password"
                            className={`w-full p-2 border ${errors.password && touched.password ? 'border-rose-500' : 'border-gray-600'} rounded text-black focus:outline-none focus:ring-2 focus:ring-black`}
                        />
                        <ErrorMessage name="password" component="div" className="text-rose-500 text-sm mt-1" />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-2 bg-gray-800 text-white rounded mt-4 hover:bg-gray-500"
                        disabled={isSubmitting || isCreatingAccount || isUserLoading}
                    >
                        {isCreatingAccount || isUserLoading ? (
                            <div className='flex-center gap-2'>
                                <Loader />
                            </div>
                        ) : "Save"}
                    </button>

                    <div className="text-center mt-4">
                        <p>Have Already an Account? <Link to="/login" className="text-blue-500">Login</Link></p>
                    </div>
                </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterForm;
