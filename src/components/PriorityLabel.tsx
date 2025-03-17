import { Priority } from "@/types/types";
import Image from "next/image";

const priorityStyles = [
  { text: "text-custom-green", border: "border-custom-green" },
  { text: "text-custom-yellow", border: "border-custom-yellow" },
  { text: "text-custom-red", border: "border-custom-red" },
];

type PriorityLabelProps = {
  priority: Priority;
  size?: "small" | "medium";
};

export default function PriorityLabel({
  priority,
  size = "small",
}: PriorityLabelProps) {
  const styleObj = priorityStyles[priority.id - 1];
  const sizeClasses =
    size === "small"
      ? "text-xs w-[86px] h-[26px] rounded-[5px]"
      : "text-base w-[106px] h-[32px] rounded-[3px]";
  return (
    <div
      className={`flex items-center gap-1  pl-1  border ${styleObj.border} ${sizeClasses}`}
    >
      <Image src={priority.icon} alt="task icon" width={16} height={18} />
      <span className={`font-medium ${styleObj.text}`}>{priority.name}</span>
    </div>
  );
}
