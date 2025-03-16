import TaskCard from "@/components/TaskCard";
import { Status, Task } from "@/types/types";

type StatusColumnProps = {
  status: Status;
  tasks: Task[];
  index: number;
};

const statusStyles = [
  { bg: "bg-custom-yellow", border: "border-custom-yellow" },
  { bg: "bg-custom-orange", border: "border-custom-orange" },
  { bg: "bg-custom-pink", border: "border-custom-pink" },
  { bg: "bg-custom-blue", border: "border-custom-blue" },
];

export default function StatusColumn({
  status,
  tasks,
  index,
}: StatusColumnProps) {
  const styleObj = statusStyles[index];

  return (
    <div>
      <h4
        className={`text-[20px] font-medium text-white py-3 text-center rounded-[10px] ${styleObj.bg} mb-[30px]`}
      >
        {status.name}
      </h4>

      <ul className="flex flex-col gap-y-[30px]">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} borderClass={styleObj.border} />
        ))}
      </ul>
    </div>
  );
}
