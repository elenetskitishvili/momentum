"use client";

import React, { useState } from "react";
import { z } from "zod";
import { addEmployee } from "@/actions/addEmployee";

import ValidatedTextField from "./ValidatedTextField";
import ImageUpload from "./ImageUpload";
import CustomSelect from "./CustomSelect";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import useDepartments from "@/hooks/useDepartments";
import { useRouter } from "next/navigation";

const MAX_FILE_SIZE = 600 * 1024;

const nameSchema = z.string().min(2).max(255);

const validCharactersRegex = /^[ა-ჰa-zA-Z]*$/;

interface AddEmployeeFormProps {
  onClose: () => void;
}

export default function AddEmployeeForm({ onClose }: AddEmployeeFormProps) {
  const [firstName, setFirstName] = useState("");
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const debouncedFirstName = useDebouncedValue(firstName, 300);
  const [firstNameError, setFirstNameError] = useState("");

  const [lastName, setLastName] = useState("");
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const debouncedLastName = useDebouncedValue(lastName, 300);
  const [lastNameError, setLastNameError] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState("");

  const [department, setDepartment] = useState("");
  const [departmentError, setDepartmentError] = useState("");

  const { departments: departmentOptions } = useDepartments();
  const router = useRouter();

  const validateName = (name: string) => {
    if (!name) return "აუცილებელი ველი";
    if (!validCharactersRegex.test(name))
      return "მხოლოდ ქართული და ლათინური სიმბოლოები";
    const result = nameSchema.safeParse(name);
    return result.success ? "" : "";
  };

  const validateImage = (file: File | null) => {
    if (!file) return "ფოტოს ატვირთვა აუცილებელია";
    if (file.size > MAX_FILE_SIZE)
      return "ფაილის ზომა არ უნდა აღემატებოდეს 600KB-ს";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const firstNameValidation = validateName(firstName);
    setFirstNameError(firstNameValidation);

    const lastNameValidation = validateName(lastName);
    setLastNameError(lastNameValidation);

    const imgError = validateImage(image);
    setImageError(imgError);

    if (!department) {
      setDepartmentError("აუცილებელი ველი");
    } else {
      setDepartmentError("");
    }

    if (
      firstNameValidation ||
      lastNameValidation ||
      imgError ||
      departmentError
    )
      return;

    try {
      await addEmployee({
        firstName,
        lastName,
        department,
        image: image as File,
      });
      router.refresh();
      onClose();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-x-[45px] max-w-[813px]">
        <div>
          <ValidatedTextField
            label="სახელი*"
            id="firstName"
            value={firstName}
            touched={firstNameTouched}
            debouncedValue={debouncedFirstName}
            onChange={(e) => {
              setFirstNameTouched(true);
              setFirstName(e.target.value);
              setFirstNameError(validateName(e.target.value));
            }}
          />
          <span className="inline-block text-custom-red text-[10px] mt-1 min-h-[14px]">
            {firstNameError || ""}
          </span>
        </div>

        <div>
          <ValidatedTextField
            label="გვარი*"
            id="lastName"
            value={lastName}
            touched={lastNameTouched}
            debouncedValue={debouncedLastName}
            onChange={(e) => {
              setLastNameTouched(true);
              setLastName(e.target.value);
              setLastNameError(validateName(e.target.value));
            }}
          />
          <span className="inline-block text-custom-red text-[10px] mt-1 min-h-[14px]">
            {lastNameError || ""}
          </span>
        </div>

        <div className="col-span-2 mt-[29px] mb-[30px]">
          <div className="flex items-center justify-between">
            <p className="text-sm text-light-text font-medium leading-[100%] mb-[8px]">
              ავატარი*
            </p>
          </div>

          <ImageUpload
            onChange={(file) => {
              setImage(file);
              setImageError(validateImage(file));
            }}
          />

          <span className="inline-block text-custom-red text-xs mt-1 min-h-[14px]">
            {imageError || ""}
          </span>
        </div>

        <div className="col-span-2 w-[350px]">
          <div className="flex items-center justify-between">
            <label className="text-sm text-light-text font-medium leading-[100%] mb-[3px]">
              დეპარტამენტი*
            </label>
          </div>

          <CustomSelect
            options={departmentOptions}
            onChange={(value) => {
              setDepartment(value);
              setDepartmentError(value ? "" : "აუცილებელი ველი");
            }}
          />

          <span className="inline-block text-custom-red text-xs mt-1 min-h-[14px]">
            {departmentError || ""}
          </span>
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
