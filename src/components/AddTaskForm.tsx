"use client";
import ValidatedTextField from "@/components/ValidatedTextField";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { useState } from "react";
import CustomSelect from "./CustomSelect";
import CustomDatePicker from "./CustomDatePicker";
import useFilteredEmployees from "@/hooks/useFilteredEmployees";
import { Department, Employee, Priority, Status } from "@/types/types";
import { addTask } from "@/actions/addTask";

interface AddTaskFormProps {
  departments: Department[];
  priorities: Priority[];
  statuses: Status[];
}

export default function AddTaskForm({
  departments,
  priorities,
  statuses,
}: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [titleTouched, setTitleTouched] = useState(false);
  const debouncedTitle = useDebouncedValue(title, 300);

  const [description, setDescription] = useState("");
  const [descriptionTouched, setDescriptionTouched] = useState(false);
  const debouncedDescription = useDebouncedValue(description, 300);

  const [department, setDepartment] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const departmentOptions = departments.map((dep: Department) => ({
    value: dep.id.toString(),
    label: dep.name,
  }));
  const selectedDepartment = department ? Number(department) : null;

  const [priority, setPriority] = useState("");
  const [priorityError, setPriorityError] = useState("");
  const priorityOptions = priorities.map((p: Priority) => ({
    value: p.id.toString(),
    label: p.name,
    icon: p.icon,
  }));

  const [status, setStatus] = useState("");
  const [statusError, setStatusError] = useState("");
  const statusOptions = statuses.map((s: Status) => ({
    value: s.id.toString(),
    label: s.name,
  }));

  const [employee, setEmployee] = useState("");
  const [employeeError, setEmployeeError] = useState("");

  const { filteredEmployees, loading: employeesLoading } =
    useFilteredEmployees(selectedDepartment);

  const employeeOptions = filteredEmployees.map((emp: Employee) => ({
    value: emp.id.toString(),
    label: `${emp.name} ${emp.surname}`,
    image: emp.avatar,
  }));

  const isEmployeeSelectDisabled = !selectedDepartment || employeesLoading;

  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    if (!title) {
      setTitleTouched(true);
      hasError = true;
    }
    if (!department) {
      setDepartmentError("გთხოვთ აირჩიოთ დეპარტამენტი");
      hasError = true;
    }
    if (!employee) {
      setEmployeeError("გთხოვთ აირჩიოთ თანამშრომელი");
      hasError = true;
    }
    if (!priority) {
      setPriorityError("გთხოვთ აირჩიოთ პრიორიტეტი");
      hasError = true;
    }
    if (!status) {
      setStatusError("გთხოვთ აირჩიოთ სტატუსი");
      hasError = true;
    }
    if (!dueDate) {
      alert("გთხოვთ აირჩიოთ ვადა");
      hasError = true;
    }
    if (hasError) return;

    const taskData = {
      name: title,
      description,
      due_date: dueDate,
      status_id: Number(status),
      employee_id: Number(employee),
      priority_id: Number(priority),
    };

    try {
      const response = await addTask(taskData);
      console.log("Task added successfully:", response);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[1370px]">
      <div className="grid grid-cols-[1fr_32px_1fr_160px_1fr_32px_1fr] grid-rows-[repeat(4,_auto)] items-start gap-y-[55px] w-full">
        <div className="col-start-1 col-span-3">
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

        <div className="col-start-5 col-span-3">
          <div className="flex items-center justify-between">
            <label className="text-sm text-light-text font-medium leading-[100%] mb-[3px] mt-2">
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

        <div className="col-span-3">
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

        <div className="col-start-5 col-span-3">
          <div className="flex items-center justify-between">
            <label
              className={`text-sm font-medium leading-[100%] mb-[3px] mt-2 ${
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
            showAddEmployee={true}
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm text-light-text font-medium leading-[100%] mb-[3px]">
              პრიორიტეტი*
            </label>
            {priorityError && (
              <span className="text-custom-red text-xs ml-2">
                {priorityError}
              </span>
            )}
          </div>
          <CustomSelect
            options={priorityOptions}
            onChange={(value) => {
              setPriority(value);
              if (value) {
                setPriorityError("");
              }
            }}
          />
        </div>

        <div className="col-start-3">
          <div className="flex items-center justify-between">
            <label className="text-sm text-light-text font-medium leading-[100%] mb-[3px]">
              სტატუსი*
            </label>
            {statusError && (
              <span className="text-custom-red text-xs ml-2">
                {statusError}
              </span>
            )}
          </div>
          <CustomSelect
            options={statusOptions}
            onChange={(value) => {
              setStatus(value);
              if (value) {
                setStatusError("");
              }
            }}
          />
        </div>

        <div className="col-start-5 col-span-3">
          <CustomDatePicker onChange={(date: string) => setDueDate(date)} />
        </div>

        <div className="col-start-7 row-start-4 mt-[90px] place-self-end">
          <button className="flex items-center gap-1 px-5 text-lg font-normal leading-[100%] bg-primary text-white rounded-[5px] cursor-pointer hover:bg-primary-light transition-colors duration-200 ease-in-out">
            <span className="py-[12px]">დავალების შექმნა</span>
          </button>
        </div>
      </div>
    </form>
  );
}
