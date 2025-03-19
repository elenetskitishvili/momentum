import Filters from "@/components/Filters";
import StatusColumn from "@/components/StatusColumn";
import {
  fetchDepartments,
  fetchEmployees,
  fetchrPriorities,
  fetchStatuses,
  fetchTasks,
} from "@/lib/data-service";
import { Department, Employee, Priority, Status, Task } from "@/types/types";

export default async function Home() {
  const statuses: Status[] = await fetchStatuses();
  const allTasks: Task[] = await fetchTasks();
  const departments: Department[] = await fetchDepartments();
  const priorities: Priority[] = await fetchrPriorities();
  const employees: Employee[] = await fetchEmployees();

  const tasksByStatus = statuses.reduce<Record<string, Task[]>>(
    (acc, status) => {
      acc[status.name] = allTasks.filter(
        (task) => task.status.name === status.name
      );
      return acc;
    },
    {}
  );

  return (
    <>
      <section className="mt-[140px]">
        <h1 className="text-[34px] font-semibold text-primary-text">
          დავალებების გვერდი
        </h1>
        <Filters
          departments={departments}
          priorities={priorities}
          employees={employees}
        />
      </section>
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
