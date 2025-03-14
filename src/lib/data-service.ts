import { Department, Employee } from "@/types/types";

export const fetchEmployees = async function (): Promise<Employee[]> {
  const token = process.env.API_TOKEN;

  if (!token) {
    console.error("API token is missing");
    return [];
  }

  try {
    const res = await fetch(
      "https://momentum.redberryinternship.ge/api/employees",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch employees");
    }

    const employees: Employee[] = await res.json();
    return employees;
  } catch (err) {
    console.error("Error fetching employees:", (err as Error).message);
    return [];
  }
};

export const fetchDepartments = async function (): Promise<Department[]> {
  try {
    const res = await fetch(
      "https://momentum.redberryinternship.ge/api/departments"
    );

    if (!res.ok) {
      throw new Error("Failed to fetch departments");
    }

    const departments: Department[] = await res.json();
    return departments;
  } catch (err) {
    console.error("Error fetching departments:", (err as Error).message);
    return [];
  }
};
