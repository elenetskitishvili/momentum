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
}: ValidatedTextFieldProps) {
  const getMinTextColor = (value: string, touched: boolean) =>
    !touched
      ? "text-lighter-text"
      : value.length >= 2
      ? "text-custom-green"
      : "text-custom-red";

  const getMaxTextColor = (value: string, touched: boolean) =>
    !touched
      ? "text-lighter-text"
      : value.length <= 255
      ? "text-custom-green"
      : "text-custom-red";

  const getMinIconColor = (value: string, touched: boolean) =>
    !touched ? "#6c757d" : value.length >= 2 ? "#08a508" : "#fa4d4d";

  const getMaxIconColor = (value: string, touched: boolean) =>
    !touched ? "#6c757d" : value.length <= 255 ? "#08a508" : "#fa4d4d";

  return (
    <div>
      <label
        htmlFor={id}
        className="text-sm text-light-text font-medium leading-[100%] mb-[3px]"
      >
        {label}*
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
          მინიმუმ 2 სიმბოლო
        </span>
      </div>

      <div className="flex items-center gap-0.5 text-[10px] leading-[100%] font-[350]">
        {showCheckIcon && (
          <CheckIcon color={getMaxIconColor(debouncedValue, touched)} />
        )}
        <span className={getMaxTextColor(debouncedValue, touched)}>
          მაქსიმუმ 255 სიმბოლო
        </span>
      </div>
    </div>
  );
}
