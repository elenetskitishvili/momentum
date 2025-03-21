"use server";

import { Employee } from "@/types/types";
import { revalidatePath } from "next/cache";

interface EmployeeData {
  firstName: string;
  lastName: string;
  department: string;
  image: File;
}

export async function addEmployee(
  employeeData: EmployeeData
): Promise<Employee> {
  const token = process.env.NEXT_PUBLIC_API_TOKEN;

  if (!token) {
    throw new Error("API token is missing");
  }

  const formData = new FormData();
  formData.append("name", employeeData.firstName);
  formData.append("surname", employeeData.lastName);
  formData.append("department_id", employeeData.department);
  formData.append("avatar", employeeData.image);

  const response = await fetch(
    "https://momentum.redberryinternship.ge/api/employees",
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
      `Failed to add new employee: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as Employee;

  revalidatePath("/add-task");
  revalidatePath("/");

  return data;
}
