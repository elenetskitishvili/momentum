import { Department } from "@/types/types";

const departmentStyles = [
  { name: "ადმინისტრაცია", bg: "bg-custom-green-light" },
  { name: "რეკრუტინგი", bg: "bg-custom-red-light" },
  { name: "ფინანსები", bg: "bg-custom-purple-light" },
  { name: "მარკეტინგი", bg: "bg-custom-orange-light" },
  { name: "ლოჯისტიკა", bg: "bg-custom-blue-light" },
  { name: "ინფ.ტექ.", bg: "bg-custom-yellow-light" },
  { name: "მედია", bg: "bg-custom-pink-light" },
];

export default function DepartmentLabel({
  department,
}: {
  department: Department;
}) {
  const departmentObj = departmentStyles[department.id - 1];

  return (
    <span
      className={`text-xs font-normal min-w-[88px] h-6 px-2 flex items-center justify-center rounded-full text-white ${departmentObj.bg}`}
    >
      {departmentObj.name}
    </span>
  );
}
