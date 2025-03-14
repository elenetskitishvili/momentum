"use client";

import React, { useState } from "react";

const georgianMonths = [
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

/** Helper to format a Date as DD.MM.YYYY */
function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${day}.${month}.${year}`;
}

/** Parse a string in DD.MM.YYYY format into a Date object or return null if invalid */
function parseDateString(value: string): Date | null {
  const parts = value.split(".");
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
  // Double-check it matches (in case of invalid day, e.g. 31 Feb)
  if (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  ) {
    return date;
  }
  return null;
}

export default function CustomDatePicker() {
  //
  // 1. Default & min dates
  //
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 1); // Tomorrow

  const minDate = new Date(); // Today
  minDate.setHours(0, 0, 0, 0);

  //
  // 2. States
  //
  const [selectedDate, setSelectedDate] = useState<Date>(defaultDate);
  const [currentMonth, setCurrentMonth] = useState<number>(
    defaultDate.getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    defaultDate.getFullYear()
  );
  const [inputValue, setInputValue] = useState<string>(formatDate(defaultDate));
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //
  // 3. Input logic: allow typing, parse on blur
  //
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const parsed = parseDateString(inputValue);
    if (parsed) {
      if (parsed.getTime() < minDate.getTime()) {
        // Too early => revert to the last valid selection
        setInputValue(formatDate(selectedDate));
      } else {
        // Valid & >= minDate
        setSelectedDate(parsed);
        setCurrentMonth(parsed.getMonth());
        setCurrentYear(parsed.getFullYear());
        setInputValue(formatDate(parsed));
      }
    } else {
      // Invalid parse => revert
      setInputValue(formatDate(selectedDate));
    }
  };

  //
  // 4. Toggle calendar
  //
  const toggleCalendar = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleOk = () => {
    // Confirm current selection
    setInputValue(formatDate(selectedDate));
    setIsOpen(false);
  };

  //
  // 5. Month navigation
  //    Compare LAST day of the new month to minDate
  //
  const handlePrevMonth = () => {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }

    // Check if the *entire* newMonth is before minDate
    // i.e., if the last day of newMonth < minDate => block
    const daysInNewMonth = new Date(newYear, newMonth + 1, 0).getDate();
    const lastDayOfNewMonth = new Date(newYear, newMonth, daysInNewMonth);
    lastDayOfNewMonth.setHours(0, 0, 0, 0);

    if (lastDayOfNewMonth.getTime() < minDate.getTime()) {
      return; // Entire month is invalid
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

  //
  // 6. Generate days for the current month
  //
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

  //
  // 7. Check selectability
  //
  function isDaySelectable(day: number): boolean {
    const d = new Date(currentYear, currentMonth, day);
    d.setHours(0, 0, 0, 0);
    return d.getTime() >= minDate.getTime();
  }

  function isSelected(day: number): boolean {
    return (
      day === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear()
    );
  }

  //
  // 8. Render
  //
  return (
    <div className="relative inline-block">
      <label
        htmlFor="customDateInput"
        className="block mb-1 font-semibold text-sm text-gray-700"
      >
        DD.MM.YYYY
      </label>
      <div className="flex items-center border border-gray-300 rounded px-2 py-1 w-48 focus-within:ring-1 focus-within:ring-purple-500">
        <svg
          onClick={toggleCalendar}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-gray-500 mr-2 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8.25v3.75m0 0v3.75m0-3.75h3.75m-3.75 
               0H8.25m-3-6.75h13.5a2.25 2.25 0 012.25 
               2.25v13.5a2.25 2.25 0 01-2.25 
               2.25H5.25a2.25 2.25 0 01-2.25-2.25V4.5a2.25 
               2.25 0 012.25-2.25z"
          />
        </svg>
        <input
          id="customDateInput"
          type="text"
          className="w-full text-sm focus:outline-none"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder="DD.MM.YYYY"
        />
      </div>

      {isOpen && (
        <div
          className="absolute mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-md z-50 p-2"
          style={{ top: "60px", left: 0 }}
        >
          {/* Header with month/year and navigation */}
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="w-8 h-8 flex items-center justify-center text-lg hover:bg-gray-100 rounded"
            >
              ▲
            </button>
            <div className="font-semibold text-sm">
              {georgianMonths[currentMonth]} {currentYear}
            </div>
            <button
              type="button"
              onClick={handleNextMonth}
              className="w-8 h-8 flex items-center justify-center text-lg hover:bg-gray-100 rounded"
            >
              ▼
            </button>
          </div>

          {/* Days of the week header */}
          <table className="w-full table-auto text-center mb-2">
            <thead>
              <tr>
                {daysOfWeek.map((dow, idx) => (
                  <th
                    key={`${dow}-${idx}`}
                    className="text-xs font-semibold text-gray-500 pb-1"
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
                          return <td key={colIndex} className="p-1 text-sm" />;
                        }
                        const dayNum = day as number;
                        const selectable = isDaySelectable(dayNum);
                        return (
                          <td
                            key={colIndex}
                            onClick={() => {
                              if (selectable) {
                                const newDate = new Date(
                                  currentYear,
                                  currentMonth,
                                  dayNum
                                );
                                setSelectedDate(newDate);
                              }
                            }}
                            className={`p-1 text-sm rounded cursor-pointer hover:bg-gray-100 
                          ${isSelected(dayNum) ? "bg-[#7B51FF] text-white" : ""}
                          ${
                            !selectable
                              ? "text-gray-300 cursor-not-allowed"
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

          {/* Footer with Cancel / OK buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3 py-1 text-sm border rounded bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleOk}
              className="px-3 py-1 text-sm border rounded bg-gray-100 hover:bg-gray-200"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
