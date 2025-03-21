import TaskBoard from "@/components/TaskBoard";
import {
  fetchDepartments,
  fetchrPriorities,
  fetchStatuses,
  fetchTasks,
} from "@/lib/data-service";
import { Department, Priority, Status, Task } from "@/types/types";

export const metadata = {
  title: "Tasks",
};

export default async function Home() {
  const statuses: Status[] = await fetchStatuses();
  const allTasks: Task[] = await fetchTasks();
  const departments: Department[] = await fetchDepartments();
  const priorities: Priority[] = await fetchrPriorities();

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
      />
    </>
  );
}
