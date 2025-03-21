"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import Filters from "@/components/Filters";
import StatusColumn from "@/components/StatusColumn";
import { Department, Employee, Priority, Status, Task } from "@/types/types";
import { useEmployees } from "@/context/EmployeeContext";

interface TaskBoardProps {
  tasks: Task[];
  statuses: Status[];
  departments: Department[];
  priorities: Priority[];
}

export default function TaskBoard({
  tasks,
  statuses,
  departments,
  priorities,
}: TaskBoardProps) {
  const { employees } = useEmployees();

  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(
    () => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("selectedDepartments");
        return stored ? JSON.parse(stored) : [];
      }
      return [];
    }
  );

  const [selectedPriorities, setSelectedPriorities] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("selectedPriorities");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    () => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("selectedEmployee");
        return stored ? JSON.parse(stored) : null;
      }
      return null;
    }
  );

  const [loading, setLoading] = useState(true);

  const updateSelectedDepartments = useCallback((departments: string[]) => {
    setSelectedDepartments(departments);
  }, []);

  const updateSelectedPriorities = useCallback((priorities: string[]) => {
    setSelectedPriorities(priorities);
  }, []);

  const updateSelectedEmployee = useCallback((employee: Employee | null) => {
    setSelectedEmployee(employee);
  }, []);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "selectedDepartments",
      JSON.stringify(selectedDepartments)
    );
  }, [selectedDepartments]);

  useEffect(() => {
    localStorage.setItem(
      "selectedPriorities",
      JSON.stringify(selectedPriorities)
    );
  }, [selectedPriorities]);

  useEffect(() => {
    if (selectedEmployee) {
      localStorage.setItem(
        "selectedEmployee",
        JSON.stringify(selectedEmployee)
      );
    } else {
      localStorage.removeItem("selectedEmployee");
    }
  }, [selectedEmployee]);

  const filteredTasks = useMemo(() => {
    if (loading) return [];
    return tasks.filter((task) => {
      const matchesDepartment =
        selectedDepartments.length === 0 ||
        selectedDepartments.includes(task.department.name);

      const matchesPriority =
        selectedPriorities.length === 0 ||
        selectedPriorities.includes(task.priority.name);

      const matchesEmployee =
        !selectedEmployee || task.employee?.id === selectedEmployee.id;

      return matchesDepartment && matchesPriority && matchesEmployee;
    });
  }, [
    tasks,
    selectedDepartments,
    selectedPriorities,
    selectedEmployee,
    loading,
  ]);

  const tasksByStatus = useMemo(() => {
    if (loading) return {};
    return statuses.reduce<Record<string, Task[]>>((acc, status) => {
      acc[status.name] = filteredTasks.filter(
        (task) => task.status.name === status.name
      );
      return acc;
    }, {});
  }, [filteredTasks, statuses, loading]);

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <span className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></span>
          <p className="mt-3 text-gray-500">Loading tasks and filters...</p>
        </div>
      ) : (
        <>
          <Filters
            departments={departments}
            priorities={priorities}
            employees={employees}
            setSelectedDepartments={updateSelectedDepartments}
            setSelectedPriorities={updateSelectedPriorities}
            setSelectedEmployee={updateSelectedEmployee}
          />

          <section className="grid grid-cols-4 gap-x-[52px] mb-[152px]">
            {statuses.map((status, index) => (
              <StatusColumn
                key={status.id}
                status={status}
                tasks={tasksByStatus[status.name] || []}
                index={index}
              />
            ))}
          </section>
        </>
      )}
    </>
  );
}
