import { useCallback, useState } from "react";
import {useDropzone } from "react-dropzone";

import { convertFileToUrl } from "../../appwrite/utils"
import placeHolder from '../../../Public/Assets/icons/profile-placeholder.svg'


const ProfileUploader = ({ onFileChange, mediaUrl }) => {
  const [file, setFile] = useState([])
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length === 0) {
        console.error("No file selected");
        return;
      }
  
      setFile(acceptedFiles);
      onFileChange(acceptedFiles[0]); // Sadece ilk dosyayı gönderiyoruz
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />

      <div className="cursor-pointer flex-center gap-4">
        <img
          src={fileUrl ||placeHolder}
          alt="image"
          className="h-24 w-24 rounded-full object-cover object-top"
        />
        <p className="text-customGreen-3 small-regular md:bbase-semibold">
          Change profile photo
        </p>
      </div>
    </div>
  );
};

export default ProfileUploader;