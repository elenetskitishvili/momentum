import Filters from "@/components/Filters";
import TaskCard from "@/components/TaskCard";
import { fetchStatuses, fetchTasks } from "@/lib/data-service";
import { Status, Task } from "@/types/types";

export default async function Home() {
  const statuses: Status[] = await fetchStatuses();
  const allTasks: Task[] = await fetchTasks();

  return (
    <section className="max-w-[1920px] mx-auto h-[1000px] mt-[140px]">
      <h1 className="text-[34px] font-semibold text-primary-text">
        დავალებების გვერდი
      </h1>
      <Filters />
      <section className="grid grid-cols-4 gap-4">
        {statuses.map((status) => {
          const filteredTasks = allTasks.filter(
            (task) => task.status.name === status.name
          );

          return (
            <div key={status.id}>
              <h2 className="text-xl font-bold">{status.name}</h2>
              {filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          );
        })}
      </section>
    </section>
  );
}
