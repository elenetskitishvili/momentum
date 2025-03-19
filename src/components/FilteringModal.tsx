"use client";
import React, { useState, useRef, useEffect } from "react";
import CustomCheckbox from "./CustomCheckbox";

interface FilteringModalProps {
  filterType: string | null;
  onClose: () => void;
}

export default function FilteringModal({
  filterType,
  onClose,
}: FilteringModalProps) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    if (filterType) {
      setIsMounted(true);
    } else {
      const timeout = setTimeout(() => {
        setIsMounted(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [filterType]);

  if (!isMounted) return null;

  let options: string[] = [];
  switch (filterType) {
    case "department":
      options = [
        "მარკეტინგის დეპარტამენტი",
        "დიზაინის დეპარტამენტი",
        "ლოგისტიკის დეპარტამენტი",
        "IT დეპარტამენტი",
      ];
      break;
    case "priority":
      options = ["High Priority", "Medium Priority", "Low Priority"];
      break;
    case "employee":
      options = ["Employee A", "Employee B", "Employee C"];
      break;
    default:
      options = [];
  }

  const handleChange = (option: string, isChecked: boolean) => {
    setCheckedItems((prev) =>
      isChecked ? [...prev, option] : prev.filter((item) => item !== option)
    );
  };

  return (
    <div
      ref={modalRef}
      className={`absolute top-12 -left-[1px] w-full bg-white pt-10 px-[30px] pb-5 rounded-[10px] border-[0.5px] border-primary transition-opacity duration-300 ${
        filterType ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mb-[25px] flex flex-col gap-[22px]">
        {options.map((option) => (
          <div key={option}>
            <CustomCheckbox
              label={option}
              checked={checkedItems.includes(option)}
              onChange={(checked) => handleChange(option, checked)}
            />
          </div>
        ))}
      </div>
      <button className="ml-auto w-[155px] h-[35px] flex items-center justify-center rounded-full text-white bg-primary hover:bg-primary-light transition-colors duration-300 ease-in-out cursor-pointer">
        არჩევა
      </button>
    </div>
  );
}
