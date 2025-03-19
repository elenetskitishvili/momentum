"use client";
import { useState } from "react";
import ArrowIcon from "./ArrowIcon";
import FilteringModal from "./FilteringModal";

export default function Filters() {
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const toggleFilter = (filter: string) => {
    setOpenFilter((prev) => (prev === filter ? null : filter));
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

      <FilteringModal
        filterType={openFilter}
        onClose={() => setOpenFilter(null)}
      />
    </div>
  );
}
