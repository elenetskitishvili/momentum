"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ClearFiltersOnPageChange() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      localStorage.removeItem("selectedDepartments");
      localStorage.removeItem("selectedPriorities");
      localStorage.removeItem("selectedEmployee");
    }
  }, [pathname]);

  return null;
}
