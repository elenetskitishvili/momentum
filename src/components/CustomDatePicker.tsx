"use client";

import React, { useState, useEffect } from "react";
import CalendarIcon from "./CalendarIcon";
import Image from "next/image";

interface CustomDatePickerProps {
  onChange?: (date: string) => void;
  value?: string;
}

const months = [
  "იანვარი",
  "თებერვალი",
  "მარტი",
  "აპრილი",
  "მაისი",
  "ივნისი",
  "ივლისი",
  "აგვისტო",
  "სექტემბერი",
  "ოქტომბერი",
  "ნოემბერი",
  "დეკემბერი",
];

const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${day}/${month}/${year}`;
}

function formatAPIDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseAPIDate(dateStr: string): Date | null {
  const parts = dateStr.split("-");
  if (parts.length !== 3) return null;
  const [yearStr, monthStr, dayStr] = parts;
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10) - 1;
  const day = parseInt(dayStr, 10);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
  return new Date(year, month, day);
}

function parseDateString(value: string): Date | null {
  const parts = value.split("/");
  if (parts.length !== 3) return null;
  const [dStr, mStr, yStr] = parts;
  const day = parseInt(dStr, 10);
  const month = parseInt(mStr, 10);
  const year = parseInt(yStr, 10);

  if (
    isNaN(day) ||
    isNaN(month) ||
    isNaN(year) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return null;
  }

  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  ) {
    return date;
  }
  return null;
}

function isValidDate(d: Date) {
  return d instanceof Date && !isNaN(d.getTime());
}

export default function CustomDatePicker({
  onChange,
  value,
}: CustomDatePickerProps) {
  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);

  const initialDate = value
    ? parseAPIDate(value) || new Date(value)
    : new Date(minDate.getTime() + 86400000);

  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [tempDate, setTempDate] = useState<Date>(initialDate);

  const [currentMonth, setCurrentMonth] = useState<number>(
    initialDate.getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    initialDate.getFullYear()
  );
  const [inputValue, setInputValue] = useState<string>(() => {
    if (value) {
      const parsed = parseAPIDate(value) || new Date(value);
      return isValidDate(parsed)
        ? formatDate(parsed)
        : formatDate(selectedDate);
    }
    return formatDate(selectedDate);
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    if (value) {
      const parsed = parseAPIDate(value) || new Date(value);
      if (isValidDate(parsed)) {
        setSelectedDate(parsed);
        setInputValue(formatDate(parsed));
      }
    }
  }, [value]);

  useEffect(() => {
    if (onChange) {
      onChange(formatAPIDate(selectedDate));
    }
  }, [selectedDate, onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    const parsed = parseDateString(val);
    if (parsed && parsed.getTime() >= minDate.getTime()) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleInputBlur = () => {
    const parsed = parseDateString(inputValue);
    if (parsed && parsed.getTime() >= minDate.getTime()) {
      setSelectedDate(parsed);
      setInputValue(formatDate(parsed));
      setIsValid(true);
      if (onChange) {
        onChange(formatAPIDate(parsed));
      }
    } else {
      setInputValue(formatDate(selectedDate));
      setIsValid(true);
    }
  };

  const toggleCalendar = () => {
    if (!isOpen) {
      setTempDate(selectedDate);
      setCurrentMonth(selectedDate.getMonth());
      setCurrentYear(selectedDate.getFullYear());
    }
    setIsOpen((prev) => !prev);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleOk = () => {
    setSelectedDate(tempDate);
    setInputValue(formatDate(tempDate));
    if (onChange) {
      onChange(formatAPIDate(tempDate));
    }
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }

    const daysInNewMonth = new Date(newYear, newMonth + 1, 0).getDate();
    const lastDayOfNewMonth = new Date(newYear, newMonth, daysInNewMonth);
    lastDayOfNewMonth.setHours(0, 0, 0, 0);

    if (lastDayOfNewMonth.getTime() < minDate.getTime()) {
      return;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleNextMonth = () => {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  function generateCalendarDays(): (number | "")[] {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const daysArray: (number | "")[] = [];
    for (let i = 0; i < offset; i++) {
      daysArray.push("");
    }
    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(day);
    }
    return daysArray;
  }

  const daysArray = generateCalendarDays();

  function isDaySelectable(day: number): boolean {
    const d = new Date(currentYear, currentMonth, day);
    d.setHours(0, 0, 0, 0);
    return d.getTime() >= minDate.getTime();
  }

  function isSelected(day: number): boolean {
    const compareDate = isOpen ? tempDate : selectedDate;
    return (
      day === compareDate.getDate() &&
      currentMonth === compareDate.getMonth() &&
      currentYear === compareDate.getFullYear()
    );
  }

  const handleDateSelection = (dayNum: number) => {
    const newDate = new Date(currentYear, currentMonth, dayNum);
    if (isDaySelectable(dayNum)) {
      setTempDate(newDate);
    }
  };

  return (
    <div className="relative inline-block w-[318px]">
      <label
        htmlFor="customDateInput"
        className="text-sm text-light-text font-medium leading-[100%] mb-[3px]"
      >
        დედლაინი*
      </label>

      <div
        className={`h-[42px] flex items-center gap-1.5 px-2.5 text-sm leading-[100%] rounded-[5px] border ${
          isOpen
            ? "border-primary"
            : isValid
            ? "border-border-grey-darker"
            : "border-custom-red"
        } mb-1.5 w-full text-light-text`}
      >
        <button
          type="button"
          onClick={toggleCalendar}
          className="cursor-pointer"
        >
          <CalendarIcon />
        </button>

        <input
          id="customDateInput"
          type="text"
          className="w-full text-sm focus:outline-none"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder="DD/MM/YYYY"
        />
      </div>

      {isOpen && (
        <div className="absolute mt-2.5 w-[318px] bg-white shadow-[0px_12px_24px_0px_rgba(0,0,0,0.2)] z-10 ">
          <div className="flex items-center justify-between pt-[18px] px-4">
            <div className="font-bold text-sm">
              {months[currentMonth]} {currentYear}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="cursor-pointer"
              >
                <Image
                  src={"/icons/arrow-top.svg"}
                  alt="arrow top"
                  width={20}
                  height={20}
                />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="cursor-pointer"
              >
                <Image
                  src={"/icons/arrow-bottom.svg"}
                  alt="arrow bottom"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
          <div className="w-[224px] ml-[47px] my-[22px]">
            <table className="w-full table-auto text-center">
              <thead>
                <tr>
                  {daysOfWeek.map((dow, idx) => (
                    <th
                      key={`${dow}-${idx}`}
                      className="text-sm leading-[20px] font-normal text-dark-text"
                    >
                      {dow}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: Math.ceil(daysArray.length / 7) }).map(
                  (_, rowIndex) => (
                    <tr key={rowIndex}>
                      {daysArray
                        .slice(rowIndex * 7, rowIndex * 7 + 7)
                        .map((day, colIndex) => {
                          if (day === "") {
                            return (
                              <td key={colIndex} className="p-1 text-sm" />
                            );
                          }
                          const dayNum = day as number;
                          const selectable = isDaySelectable(dayNum);
                          return (
                            <td
                              key={colIndex}
                              onClick={() => {
                                if (selectable) {
                                  handleDateSelection(dayNum);
                                }
                              }}
                              className={`p-1 text-sm rounded cursor-pointer hover:bg-gray-100  
                                ${
                                  isSelected(dayNum)
                                    ? "bg-primary text-white hover:text-primary-text"
                                    : ""
                                }
                                ${
                                  !selectable
                                    ? "text-gray-300 cursor-not-allowed "
                                    : ""
                                }`}
                            >
                              {dayNum}
                            </td>
                          );
                        })}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between pb-4 px-4">
            <button
              type="button"
              onClick={handleCancel}
              className="text-sm text-primary hover:text-primary-light transition duration-200 ease-in-out cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleOk}
              className="text-sm text-primary hover:text-primary-light transition duration-200 ease-in-out cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
