"use client";
import { useEmployees } from "@/context/EmployeeContext";
import { useMemo } from "react";
import { Employee } from "@/types/types";

export default function useFilteredEmployees(
  selectedDepartment: number | null
) {
  const { employees, loading } = useEmployees();

  const filteredEmployees = useMemo(() => {
    if (selectedDepartment) {
      return employees.filter(
        (employee: Employee) => employee.department.id === selectedDepartment
      );
    } else {
      return [];
    }
  }, [selectedDepartment, employees]);

  return { employees, filteredEmployees, loading };
}
