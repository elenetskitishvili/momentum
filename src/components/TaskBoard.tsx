"use client";
import { useState, useMemo } from "react";
import Filters from "@/components/Filters";
import StatusColumn from "@/components/StatusColumn";
import { Department, Employee, Priority, Status, Task } from "@/types/types";

interface TaskBoardProps {
  tasks: Task[];
  statuses: Status[];
  departments: Department[];
  priorities: Priority[];
  employees: Employee[];
}

export default function TaskBoard({
  tasks,
  statuses,
  departments,
  priorities,
  employees,
}: TaskBoardProps) {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesDepartment =
        selectedDepartments.length === 0 ||
        selectedDepartments.includes(task.department.name);

      const matchesPriority =
        selectedPriorities.length === 0 ||
        selectedPriorities.includes(task.priority.name);

      const matchesEmployee =
        !selectedEmployee || task.employee?.id === Number(selectedEmployee);

      return matchesDepartment && matchesPriority && matchesEmployee;
    });
  }, [tasks, selectedDepartments, selectedPriorities, selectedEmployee]);

  const tasksByStatus = useMemo(() => {
    return statuses.reduce<Record<string, Task[]>>((acc, status) => {
      acc[status.name] = filteredTasks.filter(
        (task) => task.status.name === status.name
      );
      return acc;
    }, {});
  }, [filteredTasks, statuses]);

  return (
    <>
      <Filters
        departments={departments}
        priorities={priorities}
        employees={employees}
        setSelectedDepartments={setSelectedDepartments}
        setSelectedPriorities={setSelectedPriorities}
        setSelectedEmployee={setSelectedEmployee}
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
  );
}
