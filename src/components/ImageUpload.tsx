"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface ImageUploadProps {
  onChange: (file: File | null) => void;
}

export default function ImageUpload({ onChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      onChange(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      {!preview ? (
        <label className="w-full flex items-center justify-center border border-dashed border-border-grey-darker rounded-lg cursor-pointer pt-[45px] pb-5">
          <div className="flex flex-col items-center">
            <Image
              src={"/icons/upload-image.svg"}
              alt="image upload icon"
              width={34}
              height={28}
            />
            <span className="mt-[5px] text-sm leading-[100%] text-light-text">
              ატვირთე ფოტო
            </span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      ) : (
        <div className=" w-full h-[120px] flex items-center justify-center border border-dashed border-border-grey-darker rounded-lg">
          <div className="relative w-[88px] h-[88px] rounded-full">
            <Image
              src={preview}
              alt="Uploaded"
              width={88}
              height={88}
              className="w-full h-full rounded-full object-cover"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute bottom-0 right-0 w-6 h-6 flex items-center justify-center bg-white rounded-full border border-lighter-text cursor-pointer"
            >
              <Image
                src={"/icons/trash-icon.svg"}
                alt="trash icon"
                width={14}
                height={14}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
