"use client";

import Image from "next/image";

interface FilterTagProps {
  value: string;
  type: "department" | "priority" | "employee";
  removeFilter: (
    type: "department" | "priority" | "employee",
    value: string
  ) => void;
}

export default function FilterTag({
  value,
  type,
  removeFilter,
}: FilterTagProps) {
  return (
    <div className="flex items-center gap-1 rounded-full px-2.5 h-[29px] border border-border-grey-darker">
      <span className="text-sm font-normal text-light-text">{value}</span>
      <button
        className="cursor-pointer"
        onClick={() => removeFilter(type, value)}
      >
        <Image
          src={"/icons/close-icon.svg"}
          alt="close icon"
          width={14}
          height={14}
        />
      </button>
    </div>
  );
}
