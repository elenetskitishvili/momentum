"use client";
import React, { useState, useRef, useEffect } from "react";
import CustomCheckbox from "./CustomCheckbox";
import { Department, Employee, Priority } from "@/types/types";

type FilterType = "department" | "employee" | "priority";

interface FilteringModalProps {
  filterType: FilterType | null;
  onClose: () => void;
  data: Array<Department | Employee | Priority>;
  onFilterChange: (selectedValues: string[]) => void;
}

export default function FilteringModal({
  filterType,
  onClose,
  data,
  onFilterChange,
}: FilteringModalProps) {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

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

  const handleChange = (id: number, isChecked: boolean) => {
    if (filterType === "employee") {
      setSelectedEmployee(isChecked ? id : null);
    } else {
      setCheckedItems((prev) =>
        isChecked ? [...prev, id] : prev.filter((item) => item !== id)
      );
    }
  };

  const handleSelect = () => {
    let selectedValues: string[];

    if (filterType === "employee") {
      selectedValues =
        selectedEmployee !== null ? [selectedEmployee.toString()] : [];
    } else {
      selectedValues = data
        .filter((item) => checkedItems.includes(item.id))
        .map((item) => ("name" in item ? item.name : ""));
    }

    onFilterChange(selectedValues);
    onClose();
  };

  return (
    <div
      ref={modalRef}
      className={`absolute top-14 -left-[1px] w-[688px] bg-white pt-10 px-[30px] pb-5 rounded-[10px] border-[0.5px] border-primary transition-opacity duration-300 ${
        filterType ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mb-[25px] flex flex-col gap-[22px]">
        {data.map((item) => (
          <div key={item.id}>
            <CustomCheckbox
              item={item}
              filterType={filterType!}
              checked={
                filterType === "employee"
                  ? selectedEmployee === item.id
                  : checkedItems.includes(item.id)
              }
              onChange={(isChecked) => handleChange(item.id, isChecked)}
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleSelect}
        className="ml-auto w-[155px] h-[35px] flex items-center justify-center rounded-full text-white bg-primary hover:bg-primary-light transition-colors duration-300 ease-in-out cursor-pointer"
      >
        არჩევა
      </button>
    </div>
  );
}
