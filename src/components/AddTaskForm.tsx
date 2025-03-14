"use client";
import ValidatedTextField from "@/components/ValidatedTextField";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { useState } from "react";
import CustomSelect from "./CustomSelect";
import useDepartments from "@/hooks/useDepartments";
import useFilteredEmployees from "@/hooks/useFilteredEmployees";
import { Employee } from "@/types/types";

export default function AddTaskForm() {
  const [title, setTitle] = useState("");
  const [titleTouched, setTitleTouched] = useState(false);
  const debouncedTitle = useDebouncedValue(title, 300);

  const [description, setDescription] = useState("");
  const [descriptionTouched, setDescriptionTouched] = useState(false);
  const debouncedDescription = useDebouncedValue(description, 300);

  const [department, setDepartment] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const { departments: departmentOptions } = useDepartments();

  const [employee, setEmployee] = useState("");
  const [employeeError, setEmployeeError] = useState("");

  const selectedDepartment = department ? Number(department) : null;

  const {
    filteredEmployees,
    loading: employeesLoading,
    error: employeesError,
  } = useFilteredEmployees(selectedDepartment);

  const employeeOptions = filteredEmployees.map((emp: Employee) => ({
    value: emp.id.toString(),
    label: `${emp.name} ${emp.surname}`,
    image: emp.avatar,
  }));

  const isEmployeeSelectDisabled = !selectedDepartment || employeesLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      department: Number(department),
      employee: Number(employee),
    };

    console.log("form submitted with data:", taskData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-4 grid-rows-5 gap-0 w-full">
        <div className="col-span-2 row-span-1">
          <ValidatedTextField
            label="სათაური"
            id="title"
            value={title}
            touched={titleTouched}
            debouncedValue={debouncedTitle}
            onChange={(e) => {
              if (!titleTouched && e.target.value !== "") {
                setTitleTouched(true);
              }
              setTitle(e.target.value);
            }}
            showCheckIcon={false}
          />
        </div>

        <div className="col-span-2 row-span-1">
          <div className="flex items-center justify-between">
            <label className="text-sm text-light-text font-medium leading-[100%] mb-[3px]">
              დეპარტამენტი*
            </label>
            {departmentError && (
              <span className="text-custom-red text-xs ml-2">
                {departmentError}
              </span>
            )}
          </div>
          <CustomSelect
            options={departmentOptions}
            onChange={(value) => {
              setDepartment(value);
              if (value) {
                setDepartmentError("");
                setEmployee("");
              }
            }}
          />
        </div>

        <div className="col-span-2 row-span-1">
          <ValidatedTextField
            label="აღწერა"
            id="description"
            value={description}
            touched={descriptionTouched}
            debouncedValue={debouncedDescription}
            onChange={(e) => {
              if (!descriptionTouched && e.target.value !== "") {
                setDescriptionTouched(true);
              }
              setDescription(e.target.value);
            }}
            showCheckIcon={false}
            multiline={true}
          />
        </div>

        <div className="col-span-2 row-span-1">
          <div className="flex items-center justify-between">
            <label
              className={`text-sm font-medium leading-[100%] mb-[3px] ${
                isEmployeeSelectDisabled
                  ? "text-border-grey-darker"
                  : "text-light-text"
              }`}
            >
              პასუხისმგებელი თანამშრომელი*
            </label>
            {employeeError && (
              <span className="text-custom-red text-xs ml-2">
                {employeeError}
              </span>
            )}
          </div>
          <CustomSelect
            options={employeeOptions}
            onChange={(value) => {
              setEmployee(value);
              if (value) {
                setEmployeeError("");
              }
            }}
            disabled={isEmployeeSelectDisabled}
          />
          {employeesLoading && <p>Loading employees...</p>}
          {employeesError && (
            <p className="text-custom-red">{employeesError}</p>
          )}
        </div>

        <div className="col-span-1 row-span-1">.div5</div>
        <div className="col-span-1 row-span-1">.div6</div>
        <div className="col-span-1 row-span-1">.div7</div>
        <div className="col-start-4 row-start-5 col-span-1 row-span-1">
          .div8
        </div>
      </div>
    </form>
  );
}
