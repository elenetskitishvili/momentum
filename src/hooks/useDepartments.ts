import { useState, useEffect } from "react";

interface Department {
  id: number;
  name: string;
}

interface DepartmentOption {
  value: string;
  label: string;
}

export default function useDepartments() {
  const [departments, setDepartments] = useState<DepartmentOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const response = await fetch(
          "https://momentum.redberryinternship.ge/api/departments"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }
        const data: Department[] = await response.json();
        const options = data.map((dept) => ({
          value: dept.id.toString(),
          label: dept.name,
        }));
        setDepartments(options);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchDepartments();
  }, []);

  return { departments, loading, error };
}
