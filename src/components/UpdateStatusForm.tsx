"use client";
import { useState } from "react";
import { Status } from "@/types/types";
import CustomSelect from "./CustomSelect";

interface UpdateStatusFormProps {
  statuses: Status[];
  currentStatus: {
    id: number;
    name: string;
  };
}

export default function UpdateStatusForm({
  statuses,
  currentStatus,
}: UpdateStatusFormProps) {
  const [selectedStatus, setSelectedStatus] = useState(
    currentStatus.id.toString()
  );
  const [statusError, setStatusError] = useState("");

  console.log(selectedStatus);

  const statusOptions = statuses.map((status) => ({
    value: status.id.toString(),
    label: status.name,
  }));

  return (
    <div>
      <CustomSelect
        options={statusOptions}
        placeholder={currentStatus.name}
        onChange={(value) => {
          setSelectedStatus(value);
          if (value) {
            setStatusError("");
          }
        }}
      />
      {statusError && <p className="error">{statusError}</p>}
    </div>
  );
}
