import React, { useEffect, useState, useMemo } from "react";
import { z } from "zod";
import debounce from "lodash/debounce";

import CheckIcon from "./CheckIcon";
import ImageUpload from "./ImageUpload";
import CustomSelect from "./CustomSelect";

const nameSchema = z
  .string()
  .min(2, { message: "მინიმუმ 2 სიმბოლო" })
  .max(255, { message: "მაქსიმუმ 255 სიმბოლო" });

interface Department {
  id: number;
  name: string;
}

interface AddEmployeeFormProps {
  onClose: () => void;
}

export default function AddEmployeeForm({ onClose }: AddEmployeeFormProps) {
  const [firstName, setFirstName] = useState("");
  const [firstNameTouched, setFirstNameTouched] = useState(false);

  const [lastName, setLastName] = useState("");
  const [lastNameTouched, setLastNameTouched] = useState(false);

  // Local state for debounced values:
  const [debouncedFirstName, setDebouncedFirstName] = useState(firstName);
  const [debouncedLastName, setDebouncedLastName] = useState(lastName);

  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState("");

  const [department, setDepartment] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const [departmentOptions, setDepartmentOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const response = await fetch(
          "https://momentum.redberryinternship.ge/api/departments"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }
        const data: Department[] = await response.json();
        const mapped = data.map((dept) => ({
          value: dept.id.toString(),
          label: dept.name,
        }));
        setDepartmentOptions(mapped);
      } catch (error) {
        console.error(error);
      }
    }

    fetchDepartments();
  }, []);

  const updateDebouncedFirstName = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedFirstName(value);
      }, 300),
    []
  );

  const updateDebouncedLastName = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedLastName(value);
      }, 300),
    []
  );

  useEffect(() => {
    updateDebouncedFirstName(firstName);
  }, [firstName, updateDebouncedFirstName]);

  useEffect(() => {
    updateDebouncedLastName(lastName);
  }, [lastName, updateDebouncedLastName]);

  useEffect(() => {
    return () => {
      updateDebouncedFirstName.cancel();
      updateDebouncedLastName.cancel();
    };
  }, [updateDebouncedFirstName, updateDebouncedLastName]);

  const handleSubmit = (e: React.FormEvent) => {
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

    console.log("Submitting:", { firstName, lastName, image, department });
  };

  const getMinTextColor = (value: string, touched: boolean) => {
    if (!touched) return "text-lighter-text"; // grey when untouched
    return value.length >= 2 ? "text-green-500" : "text-red-500";
  };

  const getMaxTextColor = (value: string, touched: boolean) => {
    if (!touched) return "text-lighter-text";
    return value.length <= 255 ? "text-green-500" : "text-red-500";
  };

  const getMinIconColor = (value: string, touched: boolean) => {
    if (!touched) return "#9ca3af";
    return value.length >= 2 ? "#22c55e" : "#ef4444";
  };

  const getMaxIconColor = (value: string, touched: boolean) => {
    if (!touched) return "#9ca3af";
    return value.length <= 255 ? "#22c55e" : "#ef4444";
  };

  return (
    <form onSubmit={handleSubmit}>
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
            value={firstName}
            onChange={(e) => {
              if (!firstNameTouched && e.target.value !== "") {
                setFirstNameTouched(true);
              }
              setFirstName(e.target.value);
            }}
          />
          <div className="flex items-center gap-0.5 text-[10px] leading-[100%] font-[350] mb-0.5">
            <CheckIcon
              color={getMinIconColor(debouncedFirstName, firstNameTouched)}
            />
            <span
              className={getMinTextColor(debouncedFirstName, firstNameTouched)}
            >
              მინიმუმ 2 სიმბოლო
            </span>
          </div>
          <div className="flex items-center gap-0.5 text-[10px] leading-[100%] font-[350]">
            <CheckIcon
              color={getMaxIconColor(debouncedFirstName, firstNameTouched)}
            />
            <span
              className={getMaxTextColor(debouncedFirstName, firstNameTouched)}
            >
              მაქსიმუმ 255 სიმბოლო
            </span>
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
            value={lastName}
            onChange={(e) => {
              if (!lastNameTouched && e.target.value !== "") {
                setLastNameTouched(true);
              }
              setLastName(e.target.value);
            }}
          />
          <div className="flex items-center gap-0.5 text-[10px] leading-[100%] font-[350] mb-0.5">
            <CheckIcon
              color={getMinIconColor(debouncedLastName, lastNameTouched)}
            />
            <span
              className={getMinTextColor(debouncedLastName, lastNameTouched)}
            >
              მინიმუმ 2 სიმბოლო
            </span>
          </div>
          <div className="flex items-center gap-0.5 text-[10px] leading-[100%] font-[350]">
            <CheckIcon
              color={getMaxIconColor(debouncedLastName, lastNameTouched)}
            />
            <span
              className={getMaxTextColor(debouncedLastName, lastNameTouched)}
            >
              მაქსიმუმ 255 სიმბოლო
            </span>
          </div>
        </div>

        <div className="col-span-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-light-text font-medium leading-[100%] mb-[8px]">
              ავატარი*
            </p>
            {imageError && (
              <span className="text-red-500 text-xs ml-2">{imageError}</span>
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
              <span className="text-red-500 text-xs ml-2">
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
