import React from "react";
import CheckIcon from "./CheckIcon";

interface ValidatedTextFieldProps {
  label: string;
  id: string;
  value: string;
  touched: boolean;
  debouncedValue: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  showCheckIcon?: boolean;
  multiline?: boolean;
  minLength?: number;
  maxLength?: number;
}

export default function ValidatedTextField({
  label,
  id,
  value,
  touched,
  debouncedValue,
  onChange,
  showCheckIcon = true,
  multiline = false,
  minLength = 2,
  maxLength = 255,
}: ValidatedTextFieldProps) {
  const countWords = (text: string) =>
    text.trim() ? text.trim().split(/\s+/).length : 0;

  const getMinTextColor = (value: string, touched: boolean) => {
    if (!touched || value.trim() === "") return "text-lighter-text";
    if (multiline) {
      return countWords(value) >= 4 ? "text-custom-green" : "text-custom-red";
    }
    return value.length >= minLength ? "text-custom-green" : "text-custom-red";
  };

  const getMaxTextColor = (value: string, touched: boolean) => {
    if (!touched || value.trim() === "") return "text-lighter-text";
    return value.length <= maxLength ? "text-custom-green" : "text-custom-red";
  };

  const getMinIconColor = (value: string, touched: boolean) => {
    if (!touched || value.trim() === "") return "#6c757d";
    if (multiline) {
      return countWords(value) >= 4 ? "#08a508" : "#fa4d4d";
    }
    return value.length >= minLength ? "#08a508" : "#fa4d4d";
  };

  const getMaxIconColor = (value: string, touched: boolean) => {
    if (!touched || value.trim() === "") return "#6c757d";
    return value.length <= maxLength ? "#08a508" : "#fa4d4d";
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="text-sm text-light-text font-medium leading-[100%] mb-[3px]"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          className="py-3 pl-2.5 pr-7 text-sm leading-[100%] rounded-[5px] border border-border-grey-darker mb-1.5 w-full h-[133px] resize-none focus:border-primary outline-none"
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          onChange={onChange}
          className="py-3 pl-2.5 pr-7 text-sm leading-[100%] rounded-[5px] border border-border-grey-darker mb-1.5 w-full focus:border-primary outline-none"
        />
      )}

      <div className="flex items-center gap-0.5 text-[10px] leading-[100%] font-[350] mb-0.5">
        {showCheckIcon && (
          <CheckIcon color={getMinIconColor(debouncedValue, touched)} />
        )}
        <span className={getMinTextColor(debouncedValue, touched)}>
          {multiline ? "მინიმუმ 4 სიტყვა" : `მინიმუმ ${minLength} სიმბოლო`}
        </span>
      </div>

      <div className="flex items-center gap-0.5 text-[10px] leading-[100%] font-[350]">
        {showCheckIcon && (
          <CheckIcon color={getMaxIconColor(debouncedValue, touched)} />
        )}
        <span className={getMaxTextColor(debouncedValue, touched)}>
          მაქსიმუმ {maxLength} სიმბოლო
        </span>
      </div>
    </div>
  );
}
