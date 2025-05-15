import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import FileUploader from '../shared/FileUploader';
import Loader from '../shared/Loader';
import { useCreatePost, useUpdatePost } from '../../react-query/queriesAndMutations';
import { useUserContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const engineeringOptions = [
    { value: 'computer', label: 'Computer Engineering' },
    { value: 'software', label: 'Software Engineering' },
    { value: 'civil', label: 'Civil Engineering' },
    { value: 'mechanical', label: 'Mechanical Engineering' },
    { value: 'electrical', label: 'Electrical Engineering' },
    { value: 'industrial', label: 'Industrial Engineering' },
    { value: 'chemical', label: 'Chemical Engineering' },
    { value: 'biomedical', label: 'Biomedical Engineering' },
    { value: 'aeronautical', label: 'Aeronautical Engineering' },
    { value: 'space', label: 'Space Engineering' },
    { value: 'environmental', label: 'Environmental Engineering' },
    { value: 'geological', label: 'Geological Engineering' },
    { value: 'materials', label: 'Materials Engineering' },
    { value: 'mining', label: 'Mining Engineering' },
    { value: 'nuclear', label: 'Nuclear Engineering' },
    { value: 'petroleum', label: 'Petroleum Engineering' },
    { value: 'transportation', label: 'Transportation Engineering' },
    { value: 'water', label: 'Water Resources Engineering' },
];

// Keep the validation schema simple
const validationSchema = Yup.object({
    caption: Yup.string().required('Caption is required'),
    location: Yup.string().required('Location is required'),
    engineering: Yup.object().nullable().required('Please select an engineering field')
});

const PostForm = ({ post, action }) => {
    const { mutateAsync: createPost } = useCreatePost();
    const { mutateAsync: updatePost } = useUpdatePost();

    const { user } = useUserContext();
    const [fileUrl, setFileUrl] = useState(post?.media || '');
    const [file, setFile] = useState(null);
    const [categoryCheckStatus, setCategoryCheckStatus] = useState(null);
    const [isCheckingCategory, setIsCheckingCategory] = useState(false);
    const [suggestedCategory, setSuggestedCategory] = useState(null);
    const navigate = useNavigate();

    const checkCategory = async (fileOrUrl, category, isOldImage = false) => {
        if (!fileOrUrl || !category) return true;

        try {
            setIsCheckingCategory(true);
            setCategoryCheckStatus(null);
            setSuggestedCategory(null);

            const formData = new FormData();
            formData.append("category", category);

            if (isOldImage) {
                formData.append("image_url", fileOrUrl); // eski görselin URL’si
            } else {
                formData.append("image", fileOrUrl); // yeni yüklenen dosya
            }

            const response = await fetch("http://localhost:8000/check-category", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Category check failed");
            const data = await response.json();

            const result = data.result;
            if (result.startsWith("Yes")) {
                setCategoryCheckStatus("success");
                toast.success("Image matches the selected engineering field!");
                return true;
            } else {
                setCategoryCheckStatus("error");
                toast.error("Image does not match the selected engineering field");
                return false;
            }
        } catch (error) {
            console.error("Error checking category:", error);
            setCategoryCheckStatus("error");
            toast.error("Failed to verify image category");
            return false;
        } finally {
            setIsCheckingCategory(false);
        }
    };


    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-6">
            <div className="bg-postBackground rounded-2xl shadow-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6 text-light-1">
                    {action === "Update" ? "Update Post" : "Create New Post"}
                </h2>

                <Formik
                    initialValues={{
                        caption: post ? post?.caption : "",
                        file: [],
                        location: post ? post.location : "",
                        engineering: post ? { label: post.engineering, value: post.engineering } : null,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);

                        try {
                            const isUpdate = post && action === 'Update';
                            const selectedCategory = values.engineering?.label;

                            const isOldImage = !file && isUpdate && post?.imageUrl;
                            const hasCategory = Boolean(selectedCategory);

                            if (hasCategory && (file || isOldImage)) {
                                setIsCheckingCategory(true);

                                const fileToCheck = file || post.imageUrl;
                                const isCategoryValid = await checkCategory(fileToCheck, selectedCategory, isOldImage);

                                setIsCheckingCategory(false);

                                if (!isCategoryValid) {
                                    toast.error("Please ensure your image matches the selected category");
                                    setSubmitting(false);
                                    return;
                                }
                            }

                            const postData = {
                                ...values,
                                engineering: selectedCategory || "",
                            };

                            if (isUpdate) {
                                const updatedPost = await updatePost({
                                    ...postData,
                                    postId: post.$id,
                                    imageId: post?.imageId,
                                    imageUrl: post?.imageUrl,
                                });

                                if (!updatedPost) {
                                    toast.error("Update failed. Please try again");
                                    setSubmitting(false);
                                    return;
                                }

                                toast.success("Post updated successfully!");
                                return navigate(`/posts/${post.$id}`);
                            }

                            const newPost = await createPost({
                                ...postData,
                                userId: user.id,
                            });

                            if (!newPost) {
                                toast.error("Post creation failed. Please try again");
                                setSubmitting(false);
                                return;
                            }

                            toast.success("Post created successfully!");
                            navigate('/');
                        } catch (error) {
                            toast.error(`Error: ${error.message}`);
                            setSubmitting(false);
                        }
                    }}

                >
                    {({ isSubmitting, setFieldValue, values, errors, touched }) => (
                        <Form className='flex flex-col gap-6'>
                            <div className="space-y-2">
                                <label className="text-light-2 font-medium block">Caption</label>
                                <Field
                                    as="textarea"
                                    name="caption"
                                    className="w-full bg-customGreen-2 text-light-1 rounded-lg p-3 min-h-[120px] resize-y focus:ring-2 focus:ring-customGreen transition-all duration-300 custom-scrollbar"
                                    placeholder="What's on your mind?"
                                />
                                {errors.caption && touched.caption &&
                                    <div className="text-rose-500 font-medium text-sm mt-1">{errors.caption}</div>
                                }
                            </div>

                            <div className="space-y-3">
                                <label className="text-light-2 font-medium block">Add Photos</label>
                                <div className="bg-customGreen-2 rounded-xl p-4 border-2 border-dashed border-customGreen-3 hover:border-background transition-all duration-300">
                                    <FileUploader
                                        fieldChange={(acceptedFiles) => {
                                            const file = acceptedFiles[0];
                                            if (file) {
                                                setFileUrl(URL.createObjectURL(file));
                                                setFieldValue("file", [file]);
                                                setFile(file);
                                                setCategoryCheckStatus(null); // Reset status when image changes
                                                setSuggestedCategory(null);
                                            }
                                        }}
                                        mediaUrl={post?.imageUrl || fileUrl}
                                    />
                                </div>
                                {categoryCheckStatus && (
                                    <div className={`mt-2 text-sm rounded-md p-2 ${categoryCheckStatus === 'success' ? 'bg-green-100 text-green-700' :
                                        'bg-rose-100 text-rose-700'
                                        }`}>
                                        {categoryCheckStatus === 'success' ? (
                                            <p>✅ Image matches the selected engineering field</p>
                                        ) : (
                                            <p>❌ Image does not match the selected engineering field</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-light-2 font-medium block">Location</label>
                                    <Field
                                        type="text"
                                        name="location"
                                        className="w-full bg-customGreen-2 text-light-1 rounded-lg p-3 focus:ring-2 focus:ring-customGreen focus:border-transparent transition-all duration-300"
                                        placeholder="Where are you posting from?"
                                    />
                                    {errors.location && touched.location &&
                                        <div className="text-rose-600 font-medium text-sm mt-1">{errors.location}</div>
                                    }
                                </div>

                                <div className="space-y-2">
                                    <label className="text-light-2 font-medium block">Engineering Field</label>
                                    <Select
                                        options={engineeringOptions}
                                        name="engineering"
                                        value={values.engineering}
                                        onChange={(selectedOption) => {
                                            setFieldValue("engineering", selectedOption);
                                            if (file && selectedOption) {
                                                // Reset status when field changes
                                                setCategoryCheckStatus(null);
                                                setSuggestedCategory(null);
                                            }
                                        }}
                                        placeholder="Select field..."
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        isClearable
                                        styles={{
                                            control: (provided, state) => ({
                                                ...provided,
                                                backgroundColor: '#636d6a', // customGreen-2
                                                borderRadius: '0.5rem',
                                                padding: '0.25rem',
                                                border: state.isFocused ? `2px solid #41504b` : `1px solid #505956`,
                                                boxShadow: state.isFocused ? '0 0 0 1px #41504b' : 'none',
                                                '&:hover': {
                                                    borderColor: '#505956',
                                                },
                                            }),
                                            menu: (provided) => ({
                                                ...provided,
                                                backgroundColor: '#37403d', // postDetailBackground
                                                borderRadius: '0.5rem',
                                                overflow: 'hidden',
                                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
                                            }),
                                            option: (provided, state) => ({
                                                ...provided,
                                                backgroundColor: state.isSelected ? '#41504b' :
                                                    state.isFocused ? '#505956' : '#37403d',
                                                color: '#F7FAFC',
                                                cursor: 'pointer',
                                                padding: '10px 16px',
                                            }),
                                            singleValue: (provided) => ({
                                                ...provided,
                                                color: '#F7FAFC',
                                            }),
                                            input: (provided) => ({
                                                ...provided,
                                                color: '#F7FAFC',
                                            }),
                                            placeholder: (provided) => ({
                                                ...provided,
                                                color: '#a5b6b0',
                                            }),
                                        }}
                                    />
                                    {errors.engineering && touched.engineering &&
                                        <div className="text-rose-600 font-medium text-sm mt-1">{errors.engineering}</div>
                                    }
                                </div>
                            </div>

                            <div className='flex gap-4 items-center justify-end mt-4'>
                                <button
                                    type="button"
                                    className='h-11 px-6 rounded-xl bg-customGreen-3 text-light-2 hover:bg-customGreen-2 transition-colors duration-300 font-medium'
                                    onClick={() => navigate(-1)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`h-11 px-8 rounded-xl bg-customGreen text-white font-medium hover:bg-customGreen-3 transition-colors duration-300 flex items-center justify-center
                                    ${isSubmitting || isCheckingCategory ? "opacity-70 cursor-not-allowed" : ""}`}
                                    disabled={isSubmitting || isCheckingCategory}
                                >
                                    {isSubmitting || isCheckingCategory ? (
                                        <><Loader size="small" /> <span className="ml-2">{isCheckingCategory ? "Verifying image..." : "Processing..."}</span></>
                                    ) : (
                                        action === "Update" ? "Update Post" : "Create Post"
                                    )}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default PostForm;