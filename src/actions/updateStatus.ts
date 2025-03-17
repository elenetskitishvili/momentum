"use server";

import { Task } from "@/types/types";
import { revalidatePath } from "next/cache";

interface UpdateStatusData {
  id: number;
  status_id: number;
}

export async function updateStatus(
  updateStatusData: UpdateStatusData
): Promise<Task> {
  const token = process.env.NEXT_PUBLIC_API_TOKEN;

  if (!token) {
    throw new Error("API token is missing");
  }

  const { id, status_id } = updateStatusData;

  const response = await fetch(
    `https://momentum.redberryinternship.ge/api/tasks/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status_id }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to update status: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as Task;

  revalidatePath("/");

  return data;
}
