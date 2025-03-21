"use client";

import { EmployeeProvider } from "@/context/EmployeeContext";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EmployeeProvider>{children}</EmployeeProvider>;
}
