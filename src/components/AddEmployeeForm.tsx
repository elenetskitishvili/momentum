import React, { useState } from "react";
import { z } from "zod";
import { addEmployee } from "@/actions/addEmployee";

import ValidatedTextInput from "./ValidatedTextInput";
import ImageUpload from "./ImageUpload";
import CustomSelect from "./CustomSelect";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import useDepartments from "@/hooks/useDepartments";

const nameSchema = z
  .string()
  .min(2, { message: "მინიმუმ 2 სიმბოლო" })
  .max(255, { message: "მაქსიმუმ 255 სიმბოლო" });

interface AddEmployeeFormProps {
  onClose: () => void;
}

export default function AddEmployeeForm({ onClose }: AddEmployeeFormProps) {
  const [firstName, setFirstName] = useState("");
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const debouncedFirstName = useDebouncedValue(firstName, 300);

  const [lastName, setLastName] = useState("");
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const debouncedLastName = useDebouncedValue(lastName, 300);

  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState("");

  const [department, setDepartment] = useState("");
  const [departmentError, setDepartmentError] = useState("");

  const { departments: departmentOptions } = useDepartments();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const firstNameResult = nameSchema.safeParse(firstName);
    const lastNameResult = nameSchema.safeParse(lastName);
    let valid = true;

    if (!firstNameResult.success || !lastNameResult.success) {
      valid = false;
    }

    if (!image) {
      setImageError("ფოტოს ატვირთვა აუცილებელია");
      valid = false;
    } else {
      setImageError("");
    }

    if (!department) {
      setDepartmentError("აუცილებელი ველი");
      valid = false;
    } else {
      setDepartmentError("");
    }

    if (!valid) {
      return;
    }

    try {
      const response = await addEmployee({
        firstName,
        lastName,
        department,
        image: image as File,
      });
      console.log("Employee added:", response);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-[45px] max-w-[813px]">
        <ValidatedTextInput
          label="სახელი"
          id="firstName"
          value={firstName}
          touched={firstNameTouched}
          debouncedValue={debouncedFirstName}
          onChange={(e) => {
            if (!firstNameTouched && e.target.value !== "") {
              setFirstNameTouched(true);
            }
            setFirstName(e.target.value);
          }}
        />

        <ValidatedTextInput
          label="გვარი"
          id="lastName"
          value={lastName}
          touched={lastNameTouched}
          debouncedValue={debouncedLastName}
          onChange={(e) => {
            if (!lastNameTouched && e.target.value !== "") {
              setLastNameTouched(true);
            }
            setLastName(e.target.value);
          }}
        />

        <div className="col-span-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-light-text font-medium leading-[100%] mb-[8px]">
              ავატარი*
            </p>
            {imageError && (
              <span className="text-custom-red text-xs ml-2">{imageError}</span>
            )}
          </div>
          <ImageUpload onChange={setImage} />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm text-light-text font-medium leading-[100%] mb-[3px]">
              დეპარტამენტი*
            </label>
            {departmentError && (
              <span className="text-custom-red text-xs ml-2">
                {departmentError}
              </span>
            )}
          </div>
          <CustomSelect
            options={departmentOptions}
            onChange={(value) => {
              setDepartment(value);
              if (value) {
                setDepartmentError("");
              }
            }}
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
        <button
          type="submit"
          className="py-2.5 px-5 text-lg font-normal leading-[100%] bg-primary text-white rounded-[5px] cursor-pointer hover:bg-primary-light transition-colors duration-200 ease-in-out"
        >
          <span className="py-[12px]">დაამატე თანამშრომელი</span>
        </button>
      </div>
    </form>
  );
}
