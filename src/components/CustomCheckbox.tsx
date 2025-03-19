import React from "react";

interface CustomCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function CustomCheckbox({
  label,
  checked,
  onChange,
}: CustomCheckboxProps) {
  return (
    <label className="flex items-center gap-[15px] cursor-pointer select-none">
      <input
        type="checkbox"
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

      <span className="text-primary-text text-base font-normal leading-[100%]">
        {label}
      </span>
    </label>
  );
}
