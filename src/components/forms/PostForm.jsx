import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';  // Yup eklendi
import Select from 'react-select';
import FileUploader from '../shared/FileUploader';
import Loader from '../shared/Loader';
import { useCreatePost, useUpdatePost } from '../../react-query/queriesAndMutations';
import { useUserContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Mühendislik dalları listesi
const engineeringOptions = [
    { value: 'civil', label: 'Civil Engineering' },
    { value: 'mechanical', label: 'Mechanical Engineering' },
    { value: 'electrical', label: 'Electrical Engineering' },
    { value: 'computer', label: 'Computer Engineering' },
    { value: 'chemical', label: 'Chemical Engineering' },
    { value: 'biomedical', label: 'Biomedical Engineering' },
];

// Form için doğrulama kuralları
const validationSchema = Yup.object({
    caption: Yup.string().required('Caption is required'),
    location: Yup.string().required('Location is required'),
    engineering: Yup.object().nullable().required('Please select an engineering field') // Boş bırakılmasını engeller
});

const PostForm = ({ post, action }) => {
    const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
    const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();

    const { user } = useUserContext();
    const [fileUrl, setFileUrl] = useState(post?.media || '');
    const navigate = useNavigate();

    return (
<Formik
    initialValues={{
        caption: post ? post?.caption : "",
        file: [],
        location: post ? post.location : "",
        engineering: post ? { label: post.engineering, value: post.engineering } : null, // Engineering objesi olarak başlat
    }}
    validationSchema={validationSchema}
    onSubmit={async (values) => {
        // engineering field'ı label olarak kaydedilecek
        const postData = {
            ...values,
            engineering: values.engineering ? values.engineering.label : "", // sadece label'ı alıyoruz
        };

        if (post && action === 'Update') {
            const updatedPost = await updatePost({
                ...postData,
                postId: post.$id,
                imageId: post?.imageId,
                imageUrl: post?.imageUrl,
            });
            if (!updatedPost) {
                toast.error("Please try again");
            }
            return navigate(`/posts/${post.$id}`);
        }

        const newPost = await createPost({
            ...postData,
            userId: user.id,
        });

        if (!newPost) {
            toast.error('Please try again');
        }
        navigate('/');
    }}
>
    {({ setFieldValue, values, errors, touched }) => (
        <Form className='flex flex-col gap-9 w-full md:w-5/6 max-w-5xl'>
            <label className="shad-form_label">Caption</label>
            <Field as="textarea" name="caption" className="shad-textarea custom-scrollbar p-2" />
            {errors.caption && touched.caption && <div className="text-red-500 text-sm">{errors.caption}</div>}

            <label className="shad-form_label">Add Photos</label>
            <FileUploader
                fieldChange={(acceptedFiles) => {
                    const file = acceptedFiles[0];
                    if (file) {
                        setFileUrl(URL.createObjectURL(file));
                        setFieldValue("file", [file]);
                    }
                }}
                mediaUrl={post?.imageUrl || fileUrl}
            />

            <label className="shad-form_label">Add Location</label>
            <Field type="text" name="location" className="shad-input p-2" />
            {errors.location && touched.location && <div className="text-red-500 text-sm">{errors.location}</div>}

            <label className="shad-form_label">Select Engineering Field</label>
            <Select
                options={engineeringOptions}
                name="engineering"
                value={values.engineering}
                onChange={(selectedOption) => setFieldValue("engineering", selectedOption)} // Seçilen objeyi gönder
                className="basic-single"
                classNamePrefix="select"
                isClearable
            />
            {errors.engineering && touched.engineering && <div className="text-red-500 text-sm">{errors.engineering}</div>}

            <div className='flex gap-4 items-center justify-end'>
                <button type="button" className='h-10 w-24 rounded-xl bg-dark-4 hover:bg-gray-500'>
                    Cancel
                </button>
                <button type="submit"
                    className="shad-button_primary whitespace-nowrap"
                    disabled={isLoadingCreate || isLoadingUpdate}>
                    {(isLoadingCreate || isLoadingUpdate) && <Loader />}
                    {action} Post
                </button>
            </div>
        </Form>
    )}
</Formik>




    );
};

export default PostForm;
