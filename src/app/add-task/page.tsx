import AddTaskForm from "@/components/AddTaskForm";
import {
  fetchDepartments,
  fetchrPriorities,
  fetchStatuses,
} from "@/lib/data-service";

export const metadata = {
  title: "Add Task",
};

export default async function AddTask() {
  const departments = await fetchDepartments();
  const priorities = await fetchrPriorities();
  const statuses = await fetchStatuses();

  return (
    <section className="max-w-[1920px] mx-auto h-[1000px] mt-[140px]">
      <h1 className="text-[34px] font-semibold mb-[90px] text-primary-text">
        დავალებების გვერდი
      </h1>
      <AddTaskForm
        departments={departments}
        priorities={priorities}
        statuses={statuses}
      />
    </section>
  );
}
