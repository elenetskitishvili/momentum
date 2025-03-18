import CommentsSection from "@/components/CommentsSection";
import TaskDetails from "@/components/TaskDetails";
import { fetchTask } from "@/lib/data-service";
import { Task } from "@/types/types";

export default async function TaskDetailsPage({
  params,
}: {
  params: { taskId: string };
}) {
  const { taskId } = await params;
  const task: Task | null = await fetchTask(taskId);

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-x-[223px]">
      <TaskDetails task={task} />
      <CommentsSection />
    </div>
  );
}
