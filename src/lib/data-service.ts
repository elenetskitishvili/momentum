import { Department, Employee, Priority, Status, Task } from "@/types/types";

export const fetchEmployees = async function (): Promise<Employee[]> {
  const token = process.env.NEXT_PUBLIC_API_TOKEN;

  if (!token) {
    throw new Error("API token is missing");
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

export const fetchrPriorities = async function (): Promise<Priority[]> {
  try {
    const res = await fetch(
      "https://momentum.redberryinternship.ge/api/priorities"
    );

    if (!res.ok) {
      throw new Error("Failed to fetch priorities");
    }

    const priorities: Priority[] = await res.json();
    return priorities;
  } catch (err) {
    console.error("Error fetching priorities:", (err as Error).message);
    return [];
  }
};

export const fetchStatuses = async function (): Promise<Status[]> {
  try {
    const res = await fetch(
      "https://momentum.redberryinternship.ge/api/statuses"
    );

    if (!res.ok) {
      throw new Error("Failed to fetch statuses");
    }

    const statuses: Status[] = await res.json();
    return statuses;
  } catch (err) {
    console.error("Error fetching statuses:", (err as Error).message);
    return [];
  }
};

export const fetchTasks = async function (): Promise<Task[]> {
  const token = process.env.NEXT_PUBLIC_API_TOKEN;

  if (!token) {
    throw new Error("API token is missing");
  }

  try {
    const res = await fetch(
      "https://momentum.redberryinternship.ge/api/tasks",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const tasks: Task[] = await res.json();

    return tasks;
  } catch (err) {
    console.error("Error fetching tasks:", (err as Error).message);
    return [];
  }
};

export const fetchTask = async function (id: string): Promise<Task | null> {
  const token = process.env.NEXT_PUBLIC_API_TOKEN;

  if (!token) {
    throw new Error("API token is missing");
  }

  try {
    const res = await fetch(
      `https://momentum.redberryinternship.ge/api/tasks/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch task");
    }

    const task: Task = await res.json();

    return task;
  } catch (err) {
    console.error("Error fetching tasks:", (err as Error).message);
    return null;
  }
};
