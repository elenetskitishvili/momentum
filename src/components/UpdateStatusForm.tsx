"use client";
import { useState } from "react";
import { Status } from "@/types/types";
import CustomSelect from "./CustomSelect";
import { updateStatus } from "@/actions/updateStatus";

interface UpdateStatusFormProps {
  taskId: number;
  statuses: Status[];
  currentStatus: {
    id: number;
    name: string;
  };
}

export default function UpdateStatusForm({
  taskId,
  statuses,
  currentStatus,
}: UpdateStatusFormProps) {
  const [statusError, setStatusError] = useState("");

  const statusOptions = statuses.map((status) => ({
    value: status.id.toString(),
    label: status.name,
  }));

  return (
    <div>
      <CustomSelect
        options={statusOptions}
        placeholder={currentStatus.name}
        onChange={async (value) => {
          if (value) {
            setStatusError("");
            try {
              await updateStatus({
                id: taskId,
                status_id: parseInt(value, 10),
              });
            } catch (error) {
              console.error("Error updating status:", error);
              setStatusError("Failed to update status. Please try again.");
            }
          }
        }}
      />
      {statusError && <p className="error">{statusError}</p>}
    </div>
  );
}
