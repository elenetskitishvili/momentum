"use client";
import { useState, useEffect } from "react";
import { fetchDepartments } from "@/lib/data-service";

interface DepartmentOption {
  value: string;
  label: string;
}

export default function useDepartments() {
  const [departments, setDepartments] = useState<DepartmentOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getDepartments() {
      try {
        const data = await fetchDepartments();
        const options = data.map((department) => ({
          value: department.id.toString(),
          label: department.name,
        }));
        setDepartments(options);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    getDepartments();
  }, []);

  return { departments, loading, error };
}
