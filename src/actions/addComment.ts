"use server";

import { revalidatePath } from "next/cache";

interface AddCommentData {
  text: string;
  parent_id: number | null;
  taskId: number;
}

interface AddCommentResponse {
  id: number;
  text: string;
  task_id: number;
  parent_id: number | null;
}

export async function addComment({
  text,
  parent_id,
  taskId,
}: AddCommentData): Promise<AddCommentResponse> {
  const token = process.env.NEXT_PUBLIC_API_TOKEN;

  if (!token) {
    throw new Error("API token is missing");
  }

  const response = await fetch(
    `https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text, parent_id }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to add comment: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as AddCommentResponse;

  revalidatePath(`/`);
  revalidatePath(`/tasks/${taskId}`);

  return data;
}
