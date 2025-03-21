"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchEmployees } from "@/lib/data-service";
import { Employee } from "@/types/types";

interface EmployeeContextType {
  employees: Employee[];
  loading: boolean;
  refreshEmployees: () => Promise<void>;
}

const EmployeeContext = createContext<EmployeeContextType>({
  employees: [],
  loading: true,
  refreshEmployees: async () => {},
});

export function EmployeeProvider({ children }: { children: React.ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshEmployees = async () => {
    setLoading(true);
    try {
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshEmployees();
  }, []);

  return (
    <EmployeeContext.Provider value={{ employees, loading, refreshEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployees() {
  return useContext(EmployeeContext);
}
