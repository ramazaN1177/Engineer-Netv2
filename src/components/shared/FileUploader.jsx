import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploader = ({ fieldChange, mediaUrl }) => {
    const [fileUrl, setFileUrl] = useState(mediaUrl);
    const [file, setFile] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        setFile(acceptedFiles);
        fieldChange(acceptedFiles);
        setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    }, [file]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.svg']
        }
    });

    return (
        <div {...getRootProps()} className='flex flex-center flex-col bg-customGreen-2 rounded-xl cursor-pointer'>
            <input {...getInputProps()} className='cursor-pointer' />
            {
                fileUrl ? (
                    <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
                        <img
                            src={fileUrl}
                            alt="image"
                            className='file-uploader-img'
                        />
                    </div>
                ) : (
                    <div className='file_uploader-box'>
                        <img
                            src="/Assets/icons/file-upload.svg"
                            width={96}
                            height={77}
                            alt="file-upload"
                        />
                        <h3 className='base-medium text-gray-700'>Drag photo here</h3>
                        <p className='text-customGreen-3 small-regular mb-6'>SVG, PNG, JPG</p>
                        <button type='button' className='shad-button_dark_4'>Select from computer</button>
                    </div>
                )
            }
            {fileUrl && <p className='file_uploader-label'>Click or drag photo to replace</p>}
        </div>
    );
};

export default FileUploader;