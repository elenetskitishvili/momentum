"use client";
import { useState, useEffect } from "react";
import FilteringModal from "./FilteringModal";
import FilterButtons from "./FilterButtons";
import SelectedFilters from "./SelectedFilters";
import { Department, Priority, Employee } from "@/types/types";

type FilterType = "department" | "priority" | "employee";

interface FiltersProps {
  departments: Department[];
  priorities: Priority[];
  employees: Employee[];
  setSelectedDepartments: (departments: string[]) => void;
  setSelectedPriorities: (priorities: string[]) => void;
  setSelectedEmployee: (employee: Employee | null) => void;
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
  const [selectedDepartments, setLocalDepartments] = useState<string[]>([]);
  const [selectedPriorities, setLocalPriorities] = useState<string[]>([]);
  const [selectedEmployee, setLocalEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedDepartments = localStorage.getItem("selectedDepartments");
    const storedPriorities = localStorage.getItem("selectedPriorities");
    const storedEmployee = localStorage.getItem("selectedEmployee");

    if (storedDepartments) {
      const parsedDepartments = JSON.parse(storedDepartments);
      setLocalDepartments(parsedDepartments);
      setSelectedDepartments(parsedDepartments);
    }
    if (storedPriorities) {
      const parsedPriorities = JSON.parse(storedPriorities);
      setLocalPriorities(parsedPriorities);
      setSelectedPriorities(parsedPriorities);
    }
    if (storedEmployee) {
      const parsedEmployee: Employee = JSON.parse(storedEmployee);
      setLocalEmployee(parsedEmployee);
      setSelectedEmployee(parsedEmployee);
    }

    setLoading(false);
  }, [setSelectedDepartments, setSelectedPriorities, setSelectedEmployee]);

  useEffect(() => {
    localStorage.setItem(
      "selectedDepartments",
      JSON.stringify(selectedDepartments)
    );
    localStorage.setItem(
      "selectedPriorities",
      JSON.stringify(selectedPriorities)
    );

    if (selectedEmployee) {
      localStorage.setItem(
        "selectedEmployee",
        JSON.stringify(selectedEmployee)
      );
    } else {
      localStorage.removeItem("selectedEmployee");
    }
  }, [selectedDepartments, selectedPriorities, selectedEmployee]);

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
      setLocalDepartments(selectedValues);
      setSelectedDepartments(selectedValues);
    } else if (openFilter === "priority") {
      setLocalPriorities(selectedValues);
      setSelectedPriorities(selectedValues);
    } else if (openFilter === "employee") {
      const selected =
        selectedValues.length > 0
          ? employees.find((emp) => emp.id.toString() === selectedValues[0])
          : null;
      setLocalEmployee(selected || null);
      setSelectedEmployee(selected || null);
    }
  };

  const removeFilter = (type: FilterType, value: string) => {
    if (type === "department") {
      const updatedDepartments = selectedDepartments.filter((d) => d !== value);
      setLocalDepartments(updatedDepartments);
      setSelectedDepartments(updatedDepartments);
    } else if (type === "priority") {
      const updatedPriorities = selectedPriorities.filter((p) => p !== value);
      setLocalPriorities(updatedPriorities);
      setSelectedPriorities(updatedPriorities);
    } else if (type === "employee") {
      setLocalEmployee(null);
      setSelectedEmployee(null);
    }
  };

  const clearAllFilters = () => {
    setLocalDepartments([]);
    setLocalPriorities([]);
    setLocalEmployee(null);
    setSelectedDepartments([]);
    setSelectedPriorities([]);
    setSelectedEmployee(null);
    localStorage.removeItem("selectedDepartments");
    localStorage.removeItem("selectedPriorities");
    localStorage.removeItem("selectedEmployee");
  };

  return (
    <div className="relative w-auto mt-[52px] mb-[24px]">
      {loading ? (
        <div className="flex justify-center items-center h-[100px]">
          <span className="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full"></span>
          <p className="mt-2 text-gray-500">Loading filters...</p>
        </div>
      ) : (
        <>
          <FilterButtons toggleFilter={toggleFilter} openFilter={openFilter} />

          <SelectedFilters
            selectedDepartments={selectedDepartments}
            selectedPriorities={selectedPriorities}
            selectedEmployee={selectedEmployee}
            removeFilter={removeFilter}
            clearAllFilters={clearAllFilters}
          />

          {openFilter && (
            <FilteringModal
              filterType={openFilter}
              data={getFilterData()}
              onClose={() => setOpenFilter(null)}
              onFilterChange={handleFilterChange}
            />
          )}
        </>
      )}
    </div>
  );
}
