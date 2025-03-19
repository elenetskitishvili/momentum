"use client";
import FilterTag from "./FilterTag";
import { Employee } from "@/types/types";

type FilterType = "department" | "priority" | "employee";

interface SelectedFiltersProps {
  selectedDepartments: string[];
  selectedPriorities: string[];
  selectedEmployee: Employee | null;
  removeFilter: (type: FilterType, value: string) => void;
  clearAllFilters: () => void;
}

export default function SelectedFilters({
  selectedDepartments,
  selectedPriorities,
  selectedEmployee,
  removeFilter,
  clearAllFilters,
}: SelectedFiltersProps) {
  const hasFilters =
    selectedDepartments.length > 0 ||
    selectedPriorities.length > 0 ||
    selectedEmployee !== null;

  return (
    <div className="flex flex-wrap items-center gap-2  mt-[25px] min-h-[29px]">
      {hasFilters && (
        <>
          {selectedDepartments.map((department) => (
            <FilterTag
              key={department}
              value={department}
              type="department"
              removeFilter={removeFilter}
            />
          ))}

          {selectedPriorities.map((priority) => (
            <FilterTag
              key={priority}
              value={priority}
              type="priority"
              removeFilter={removeFilter}
            />
          ))}

          {selectedEmployee && (
            <FilterTag
              value={`${selectedEmployee.name} ${selectedEmployee.surname}`}
              type="employee"
              removeFilter={() =>
                removeFilter("employee", selectedEmployee.id.toString())
              }
            />
          )}

          <button
            className="text-sm font-normal w-[110px] h-[29px] flex items-center justify-center text-light-text cursor-pointer"
            onClick={clearAllFilters}
          >
            გასუფთავება
          </button>
        </>
      )}
    </div>
  );
}
