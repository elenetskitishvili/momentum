import { Priority } from "@/types/types";
import Image from "next/image";

const priorityStyles = [
  { text: "text-custom-green", border: "border-custom-green" },
  { text: "text-custom-yellow", border: "border-custom-yellow" },
  { text: "text-custom-red", border: "border-custom-red" },
];

export default function PriorityLabel({ priority }: { priority: Priority }) {
  const styleObj = priorityStyles[priority.id - 1];
  return (
    <div
      className={`flex items-center gap-1 w-[86px] h-[26px] pl-1 rounded-[4px] border ${styleObj.border}`}
    >
      <Image src={priority.icon} alt="task icon" width={16} height={18} />
      <span className={`text-xs font-medium ${styleObj.text}`}>
        {priority.name}
      </span>
    </div>
  );
}
