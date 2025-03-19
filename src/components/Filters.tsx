"use client";
import { useState } from "react";
import ArrowIcon from "./ArrowIcon";
import FilteringModal from "./FilteringModal";
import { Department, Priority, Employee } from "@/types/types";

type FilterType = "department" | "priority" | "employee";

interface FiltersProps {
  departments: Department[];
  priorities: Priority[];
  employees: Employee[];
  setSelectedDepartments: (departments: string[]) => void;
  setSelectedPriorities: (priorities: string[]) => void;
  setSelectedEmployee: (employee: string | null) => void;
}

export default function Filters({
  departments,
  priorities,
  employees,
  setSelectedDepartments,
  setSelectedPriorities,
  setSelectedEmployee,
}: FiltersProps) {
  const [openFilter, setOpenFilter] = useState<FilterType | null>(null);

  const toggleFilter = (filter: FilterType) => {
    setOpenFilter((prev) => (prev === filter ? null : filter));
  };

  const getFilterData = () => {
    switch (openFilter) {
      case "department":
        return departments;
      case "priority":
        return priorities;
      case "employee":
        return employees;
      default:
        return [];
    }
  };

  const handleFilterChange = (selectedValues: string[]) => {
    if (openFilter === "department") {
      setSelectedDepartments(selectedValues);
    } else if (openFilter === "priority") {
      setSelectedPriorities(selectedValues);
    } else if (openFilter === "employee") {
      setSelectedEmployee(selectedValues.length > 0 ? selectedValues[0] : null);
    }
  };

  return (
    <div className="relative inline-flex items-center gap-[45px] border border-border-grey rounded-[10px] w-auto mt-[52px] mb-[79px]">
      <button
        type="button"
        onClick={() => toggleFilter("department")}
        className="h-[44px] w-[199px] flex items-center gap-2 cursor-pointer text-dark-text hover:text-primary transition-colors duration-200 ease-in-out"
      >
        <span className="text-base font-normal pl-[18px]">დეპარტამენტი</span>
        <ArrowIcon />
      </button>

      <button
        type="button"
        onClick={() => toggleFilter("priority")}
        className="h-[44px] w-[199px] flex items-center gap-2 cursor-pointer text-dark-text hover:text-primary transition-colors duration-200 ease-in-out"
      >
        <span className="text-base font-normal pl-[18px]">პრიორიტეტი</span>
        <ArrowIcon />
      </button>

      <button
        type="button"
        onClick={() => toggleFilter("employee")}
        className="h-[44px] w-[199px] flex items-center gap-2 cursor-pointer text-dark-text hover:text-primary transition-colors duration-200 ease-in-out"
      >
        <span className="text-base font-normal pl-[18px]">თანამშრომელი</span>
        <ArrowIcon />
      </button>

      {openFilter && (
        <FilteringModal
          filterType={openFilter}
          data={getFilterData()}
          onClose={() => setOpenFilter(null)}
          onFilterChange={handleFilterChange}
        />
      )}
    </div>
  );
}
