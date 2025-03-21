import { Task } from "@/types/types";
import { format } from "date-fns";
import { ka } from "date-fns/locale";
import Image from "next/image";
import PriorityLabel from "./PriorityLabel";
import DepartmentLabel from "./DepartmentLabel";
import Link from "next/link";

interface TaskCardProps {
  task: Task;
  borderClass: string;
}

const formatGeorgianDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return format(date, "d MMM, yyyy", { locale: ka });
};

const truncateText = (text: string | null, maxLength: number = 100) => {
  if (!text) return "";
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

export default function TaskCard({ task, borderClass }: TaskCardProps) {
  return (
    <li className={`bg-white rounded-[15px] p-5 border ${borderClass}`}>
      <Link href={`/tasks/${task.id}`} className="flex flex-col gap-7">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <PriorityLabel priority={task.priority} />
            <DepartmentLabel department={task.department} />
          </div>
          <span className="text-xs text-primary-text font-normal">
            {formatGeorgianDate(task.due_date)}
          </span>
        </div>

        <div className="max-w-[320px] flex flex-col gap-3">
          <h4 className="text-[15px] font-medium text-primary-text leading-[100%]">
            {task.name}
          </h4>
          {task.description ? (
            <p className="text-sm font-normal text-light-text line-clamp-2">
              {truncateText(task.description)}
            </p>
          ) : (
            <div className="w-full h-10"></div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Image
            src={task.employee.avatar}
            alt={task.employee.name}
            width={31}
            height={31}
            className="rounded-full"
          />
          <div className="flex items-center gap-1">
            <Image
              src={"/icons/message-icon.svg"}
              alt="message icon"
              width={22}
              height={22}
            />
            <span className="text-primary-text text-sm font-normal">
              {task.total_comments}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
