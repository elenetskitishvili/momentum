"use client";
import { useState, useEffect } from "react";
import { fetchEmployees } from "@/lib/data-service";
import { Employee } from "@/types/types";

export default function useFilteredEmployees(
  selectedDepartment: number | null
) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getEmployees() {
      try {
        const employees = await fetchEmployees();
        setEmployees(employees);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    getEmployees();
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      setFilteredEmployees(
        employees.filter(
          (employee) => employee.department.id === selectedDepartment
        )
      );
    } else {
      setFilteredEmployees([]);
    }
  }, [selectedDepartment, employees]);

  return { employees, filteredEmployees, loading, error };
}
