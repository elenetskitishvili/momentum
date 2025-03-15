import { Task } from "@/types/types";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-primary">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-500">
          {task.due_date}
        </span>
        <span className="text-sm px-2 py-1 rounded bg-gray-200 text-gray-700">
          {task.priority.name}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mt-2">{task.name}</h3>
      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
      <div className="flex items-center mt-3">
        <img
          src={task.employee.avatar}
          alt={task.employee.name}
          className="w-8 h-8 rounded-full"
        />
        <span className="ml-2 text-sm text-gray-800">
          {task.employee.name} {task.employee.surname}
        </span>
      </div>
    </div>
  );
}
