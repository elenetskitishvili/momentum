import { Department } from "@/types/types";

const departmentStyles = [
  { name: "ადმინისტრაცია", bg: "bg-custom-green-light" },
  { name: "რეკრუტინგი", bg: "bg-custom-red-light" },
  { name: "ფინანსები", bg: "bg-custom-purple-light" },
  { name: "მარკეტინგი", bg: "bg-custom-orange-light" },
  { name: "ლოჯისტიკა", bg: "bg-custom-blue-light" },
  { name: "ინფ. ტექ.", bg: "bg-custom-yellow-light" },
  { name: "მედია", bg: "bg-custom-pink-light" },
];

type DepartmentLabelProps = {
  department: Department;
  size?: "small" | "medium";
};

export default function DepartmentLabel({
  department,
  size = "small",
}: DepartmentLabelProps) {
  const departmentObj = departmentStyles[department.id - 1];
  const sizeClasses =
    size === "small" ? "text-xs px-2 h-6" : "text-base px-3 h-[29px]";

  return (
    <span
      className={`font-normal min-w-[88px] flex items-center justify-center rounded-full text-white ${departmentObj.bg} ${sizeClasses}`}
    >
      {departmentObj.name}
    </span>
  );
}
