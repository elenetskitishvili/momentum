"use server";

import { revalidatePath } from "next/cache";

interface TaskData {
  name: string;
  description: string;
  due_date: string;
  status_id: number;
  employee_id: number;
  priority_id: number;
}

export interface AddTaskResponse {
  id: number;
  name: string;
  description: string;
  due_date: string;
  status: {
    id: number;
    name: string;
  };
  priority: {
    id: number;
    name: string;
    icon: string;
  };
  department: {
    id: number;
    name: string;
  };
  employee: {
    id: number;
    name: string;
    surname: string;
    avatar: string;
    department_id: number;
  };
}

export async function addTask(taskData: TaskData): Promise<AddTaskResponse> {
  const token = process.env.NEXT_PUBLIC_API_TOKEN;

  if (!token) {
    throw new Error("API token is missing");
  }

  const formData = new FormData();
  formData.append("name", taskData.name);
  formData.append("description", taskData.description);
  formData.append("due_date", taskData.due_date);
  formData.append("status_id", taskData.status_id.toString());
  formData.append("employee_id", taskData.employee_id.toString());
  formData.append("priority_id", taskData.priority_id.toString());

  const response = await fetch(
    "https://momentum.redberryinternship.ge/api/tasks",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to add new task: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as AddTaskResponse;

  revalidatePath("/");

  return data;
}
