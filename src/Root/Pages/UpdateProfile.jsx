import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

import { useUserContext } from '../../context/AuthContext';

const UpdateProfile = () => {

  const { user, setUser } = useUserContext();
  const { id } = useParams();

  const navigate = useNavigate();
  return (
    <div className="flex flex-1">
      <div className='common-container'>
        <div className="flex-start gap-3 justify-start w-full max-w-5xl">
          <img
            src="/Assets/icons/edit.svg"
            width={36}
            height={36}
            alt="edit"
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
        </div>
        <Formik
          initialValues={{
            file: [],
            name: user.name,
            username: user.username,
            email: user.email,
            bio: user.bio || "",
          }}

          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className='flex flex-col gap-7 w-full mt-4 max-w-5xl'>

              <label className='shad-form_label'>Name</label>
              <Field className="shad-input p-2" type="text" name="name" />
              <label className='shad-form_label'>Username</label>
              <Field className="shad-input p-2" type="text" name="username" disabled />
              <label className='shad-form_label'>E-Mail</label>
              <Field className="shad-input p-2" type="email" name="email" disabled />
              <label className='shad-form_label'>Bio</label>
              <Field as="textarea" name="caption" className="shad-textarea custom-scrollbar p-2" />              <div className="flex gap-4 items-center justify-end">
                <button
                  type="button"
                  className="shad-button_dark_4"
                  onClick={() => navigate(-1)}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="shad-button_primary whitespace-nowrap"
                >

                  Update
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default UpdateProfile