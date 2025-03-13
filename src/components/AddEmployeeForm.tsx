import React, { useState } from "react";
import CheckIcon from "./CheckIcon";
import ImageUpload from "./ImageUpload";
import CustomSelect from "./CustomSelect";

interface AddEmployeeFormProps {
  onClose: () => void;
}

export default function AddEmployeeForm({ onClose }: AddEmployeeFormProps) {
  const [image, setImage] = useState<File | null>(null);

  return (
    <form className="">
      <div className="grid grid-cols-2 gap-[45px] max-w-[813px]">
        <div>
          <label
            className="text-sm text-light-text font-medium leading-[100%] mb-[3px]"
            htmlFor="firstName"
          >
            სახელი*
          </label>
          <input
            className="py-3 pl-2.5 pr-7 text-sm leading-[100%] rounded-md border border-border-grey-darker mb-1.5 w-full"
            type="text"
            id="firstName"
          />

          <div className="flex items-center gap-0.5 text-[10px] leading-[100%] font-[350] text-lighter-text mb-0.5">
            <CheckIcon />
            <span>მინიმუმ 2 სიმბოლო</span>
          </div>
          <div className="flex items-center gap-0.5 text-[10px] leading-[100%] font-[350] text-lighter-text">
            <CheckIcon />
            <span>მაქსიმუმ 255 სიმბოლო</span>
          </div>
        </div>
        <div>
          <label
            className="text-sm text-light-text font-medium leading-[100%] mb-[3px]"
            htmlFor="lastName"
          >
            გვარი*
          </label>
          <input
            className="py-3 pl-2.5 pr-7 text-sm leading-[100%] rounded-md border border-border-grey-darker mb-1.5 w-full"
            type="text"
            id="lastName"
          />

          <div className="flex items-center gap-0.5 text-[10px] leading-[100%] font-[350] text-lighter-text mb-0.5">
            <CheckIcon />
            <span>მინიმუმ 2 სიმბოლო</span>
          </div>
          <div className="flex items-center gap-0.5 text-[10px] leading-[100%] font-[350] text-lighter-text">
            <CheckIcon />
            <span>მაქსიმუმ 255 სიმბოლო</span>
          </div>
        </div>

        <div className="col-span-2">
          <p className="text-sm text-light-text font-medium leading-[100%] mb-[8px]">
            ავატარი*
          </p>
          <ImageUpload onChange={setImage} />
        </div>

        <div>
          <label
            className="text-sm text-light-text font-medium leading-[100%] mb-[3px]"
            htmlFor="lastName"
          >
            დეპარტამენტი*
          </label>
          <CustomSelect
            options={[
              { value: "hr", label: "Human Resources" },
              { value: "it", label: "IT Department" },
              { value: "marketing", label: "Marketing" },
            ]}
            onChange={(value) => console.log("Selected:", value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-[22px] justify-end mt-[65px]">
        <button
          type="button"
          onClick={onClose}
          className="py-[10px] px-5 text-lg font-normal leading-[100%] rounded-[5px] border border-primary text-primary-text cursor-pointer hover:border-primary-light transition-colors duration-200 ease-in-out"
        >
          გაუქმება
        </button>
        <button className="py-2.5 px-5 text-lg font-normal leading-[100%] bg-primary text-white rounded-[5px] cursor-pointer hover:bg-primary-light transition-colors duration-200 ease-in-out">
          <span className="py-[12px]">დაამატე თანამშრომელი</span>
        </button>
      </div>
    </form>
  );
}
