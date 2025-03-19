import TaskBoard from "@/components/TaskBoard";
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

  return (
    <>
      <section className="mt-[140px]">
        <h1 className="text-[34px] font-semibold text-primary-text">
          დავალებების გვერდი
        </h1>
      </section>

      <TaskBoard
        tasks={allTasks}
        statuses={statuses}
        departments={departments}
        priorities={priorities}
        employees={employees}
      />
    </>
  );
}
