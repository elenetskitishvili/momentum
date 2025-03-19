import { Department, Employee, Priority } from "@/types/types";
import Image from "next/image";
import React from "react";

type FilterType = "department" | "employee" | "priority";

interface CustomCheckboxProps {
  item: Department | Employee | Priority;
  filterType: FilterType;
  checked: boolean;
  onChange: (isChecked: boolean) => void;
}

export default function CustomCheckbox({
  item,
  filterType,
  checked,
  onChange,
}: CustomCheckboxProps) {
  return (
    <label className="flex items-center gap-[15px] cursor-pointer select-none">
      <input
        type={filterType === "employee" ? "radio" : "checkbox"}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden"
      />
      <div className="w-[22px] h-[22px] border border-primary-text rounded-md flex items-center justify-center">
        {checked && (
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.3334 1.33325L5.00008 8.66659L1.66675 5.33325"
              stroke="#212529"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      <div className="flex items-center gap-2">
        {filterType === "employee" ? (
          <div className="flex items-center gap-2">
            <Image
              src={(item as Employee).avatar}
              alt={`${(item as Employee).name} ${(item as Employee).surname}`}
              className="rounded-full object-cover"
              width={30}
              height={30}
            />
            <span className="text-primary-text text-base font-normal leading-[100%]">
              {(item as Employee).name} {(item as Employee).surname}
            </span>
          </div>
        ) : (
          <span className="text-primary-text text-base font-normal leading-[100%]">
            {"name" in item ? item.name : ""}
          </span>
        )}
      </div>
    </label>
  );
}
