"use client";
import ArrowIcon from "./ArrowIcon";

type FilterType = "department" | "priority" | "employee";

interface FilterButtonsProps {
  toggleFilter: (filter: FilterType) => void;
  openFilter: FilterType | null;
}

export default function FilterButtons({
  toggleFilter,
  openFilter,
}: FilterButtonsProps) {
  return (
    <div className="inline-flex items-center gap-[45px] border border-border-grey rounded-[10px]">
      {["department", "priority", "employee"].map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => toggleFilter(filter as FilterType)}
          className={`h-[44px] w-[199px] flex items-center gap-2 cursor-pointer transition-colors duration-200 ease-in-out ${
            openFilter === filter
              ? "text-primary font-semibold"
              : "text-dark-text hover:text-primary"
          }`}
        >
          <span className="text-base font-normal pl-[18px]">
            {filter === "department"
              ? "დეპარტამენტი"
              : filter === "priority"
              ? "პრიორიტეტი"
              : "თანამშრომელი"}
          </span>
          <ArrowIcon />
        </button>
      ))}
    </div>
  );
}
