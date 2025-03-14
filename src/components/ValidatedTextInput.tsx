import React from "react";
import CheckIcon from "./CheckIcon";

interface ValidatedTextInputProps {
  label: string;
  id: string;
  value: string;
  touched: boolean;
  debouncedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ValidatedTextInput({
  label,
  id,
  value,
  touched,
  debouncedValue,
  onChange,
}: ValidatedTextInputProps) {
  const getMinTextColor = (value: string, touched: boolean) => {
    if (!touched) return "text-lighter-text";
    return value.length >= 2 ? "text-green-500" : "text-red-500";
  };

  const getMaxTextColor = (value: string, touched: boolean) => {
    if (!touched) return "text-lighter-text";
    return value.length <= 255 ? "text-green-500" : "text-red-500";
  };

  const getMinIconColor = (value: string, touched: boolean) => {
    if (!touched) return "#6c757d";
    return value.length >= 2 ? "#08a508" : "#fa4d4d";
  };

  const getMaxIconColor = (value: string, touched: boolean) => {
    if (!touched) return "#6c757d";
    return value.length <= 255 ? "#08a508" : "#fa4d4d";
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="text-sm text-light-text font-medium leading-[100%] mb-[3px]"
      >
        {label}*
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        className="py-3 pl-2.5 pr-7 text-sm leading-[100%] rounded-md border border-border-grey-darker mb-1.5 w-full"
      />
      <div className="flex items-center gap-0.5 text-[10px] leading-[100%] font-[350] mb-0.5">
        <CheckIcon color={getMinIconColor(debouncedValue, touched)} />
        <span className={getMinTextColor(debouncedValue, touched)}>
          მინიმუმ 2 სიმბოლო
        </span>
      </div>
      <div className="flex items-center gap-0.5 text-[10px] leading-[100%] font-[350]">
        <CheckIcon color={getMaxIconColor(debouncedValue, touched)} />
        <span className={getMaxTextColor(debouncedValue, touched)}>
          მაქსიმუმ 255 სიმბოლო
        </span>
      </div>
    </div>
  );
}
