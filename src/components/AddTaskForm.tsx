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
  const [titleError, setTitleError] = useState("");
  const debouncedTitle = useDebouncedValue(title, 300);

  const [description, setDescription] = useState("");
  const [descriptionTouched, setDescriptionTouched] = useState(true);
  const debouncedDescription = useDebouncedValue(description, 300);

  const [department, setDepartment] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const departmentOptions = departments.map((dep: Department) => ({
    value: dep.id.toString(),
    label: dep.name,
  }));
  const selectedDepartment = department ? Number(department) : null;

  const [priority, setPriority] = useState("2");
  const [priorityError, setPriorityError] = useState("");
  const priorityOptions = priorities.map((priority: Priority) => ({
    value: priority.id.toString(),
    label: priority.name,
    icon: priority.icon,
  }));

  const [status, setStatus] = useState("1");
  const [statusError, setStatusError] = useState("");
  const statusOptions = statuses.map((status: Status) => ({
    value: status.id.toString(),
    label: status.name,
  }));

  const [employee, setEmployee] = useState("");
  const [employeeError, setEmployeeError] = useState("");

  const { filteredEmployees, loading: employeesLoading } =
    useFilteredEmployees(selectedDepartment);

  const employeeOptions = filteredEmployees.map((employee: Employee) => ({
    value: employee.id.toString(),
    label: `${employee.name} ${employee.surname}`,
    image: employee.avatar,
  }));

  const isEmployeeSelectDisabled = !selectedDepartment || employeesLoading;

  const [dueDate, setDueDate] = useState("");
  const [dueDateError, setDueDateError] = useState("");

  const validateTitle = (val: string) => {
    if (val.trim() === "") {
      setTitleError("სავალდებულოა");
    } else {
      setTitleError("");
    }
  };

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!titleTouched && e.target.value !== "") {
      setTitleTouched(true);
    }
    const newVal = e.target.value;
    setTitle(newVal);
    validateTitle(newVal);
  };

  const handleDepartmentChange = (value: string) => {
    setDepartment(value);
    if (value.trim() === "") {
      setDepartmentError("სავალდებულოა");
    } else {
      setDepartmentError("");
    }
    setEmployee("");
    setEmployeeError("სავალდებულოა");
  };

  const handleEmployeeChange = (value: string) => {
    setEmployee(value);
    if (value.trim() === "") {
      setEmployeeError("სავალდებულოა");
    } else {
      setEmployeeError("");
    }
  };

  const handlePriorityChange = (value: string) => {
    setPriority(value);
    if (value.trim() === "") {
      setPriorityError("სავალდებულოა");
    } else {
      setPriorityError("");
    }
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    if (value.trim() === "") {
      setStatusError("სავალდებულოა");
    } else {
      setStatusError("");
    }
  };

  const handleDueDateChange = (date: string) => {
    setDueDate(date);
    if (date.trim() === "") {
      setDueDateError("სავალდებულოა");
    } else {
      setDueDateError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    validateTitle(title);
    if (department.trim() === "") setDepartmentError("სავალდებულოა");
    if (employee.trim() === "") setEmployeeError("სავალდებულოა");
    if (priority.trim() === "") setPriorityError("სავალდებულოა");
    if (status.trim() === "") setStatusError("სავალდებულოა");
    if (dueDate.trim() === "") setDueDateError("სავალდებულოა");

    if (
      titleError ||
      departmentError ||
      employeeError ||
      priorityError ||
      statusError ||
      dueDateError ||
      title.trim() === "" ||
      department.trim() === "" ||
      employee.trim() === "" ||
      priority.trim() === "" ||
      status.trim() === "" ||
      dueDate.trim() === ""
    ) {
      return;
    }

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
      <div className="grid grid-cols-[1fr_32px_1fr_160px_1fr_32px_1fr] grid-rows-[repeat(7,_auto)] items-start gap-y-[20px] w-full">
        <div className="col-start-1 col-span-3">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm text-light-text font-medium leading-[100%]">
              სათაური*
            </label>
            {titleError && (
              <span className="text-custom-red text-xs">{titleError}</span>
            )}
          </div>
          <ValidatedTextField
            label=""
            id="title"
            value={title}
            touched={titleTouched}
            debouncedValue={debouncedTitle}
            onChange={handleTitleChange}
            showCheckIcon={false}
            minLength={3}
            maxLength={255}
          />
        </div>

        <div className="col-start-5 col-span-3">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm text-light-text font-medium leading-[100%]">
              დეპარტამენტი*
            </label>
            {departmentError && (
              <span className="text-custom-red text-xs">{departmentError}</span>
            )}
          </div>
          <CustomSelect
            options={departmentOptions}
            onChange={handleDepartmentChange}
          />
        </div>

        <div className="col-span-3">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm text-light-text font-medium leading-[100%]">
              აღწერა
            </label>
          </div>
          <ValidatedTextField
            label=""
            id="description"
            value={description}
            touched={descriptionTouched}
            debouncedValue={debouncedDescription}
            onChange={(e) => {
              if (!descriptionTouched) {
                setDescriptionTouched(true);
              }
              setDescription(e.target.value);
            }}
            showCheckIcon={false}
            multiline={true}
            maxLength={255}
          />
        </div>

        <div className="col-start-5 col-span-3">
          <div className="flex justify-between items-center mb-1">
            <label
              className={`text-sm font-medium leading-[100%] ${
                isEmployeeSelectDisabled
                  ? "text-border-grey-darker"
                  : "text-light-text"
              }`}
            >
              პასუხისმგებელი თანამშრომელი*
            </label>
            {employeeError && (
              <span className="text-custom-red text-xs">{employeeError}</span>
            )}
          </div>
          <CustomSelect
            options={employeeOptions}
            onChange={handleEmployeeChange}
            disabled={isEmployeeSelectDisabled}
            showAddEmployee={true}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium leading-[100%]">
              პრიორიტეტი*
            </label>
            {priorityError && (
              <span className="text-custom-red text-xs">{priorityError}</span>
            )}
          </div>
          <CustomSelect
            options={priorityOptions}
            onChange={handlePriorityChange}
            defaultValue="2"
          />
        </div>

        <div className="col-start-3">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium leading-[100%]">
              სტატუსი*
            </label>
            {statusError && (
              <span className="text-custom-red text-xs">{statusError}</span>
            )}
          </div>
          <CustomSelect
            options={statusOptions}
            onChange={handleStatusChange}
            defaultValue="1"
          />
        </div>

        <div className="col-start-5 col-span-3">
          <div className="flex justify-between items-center mb-1">
            {dueDateError && (
              <span className="text-custom-red text-xs">{dueDateError}</span>
            )}
          </div>
          <CustomDatePicker onChange={handleDueDateChange} />
        </div>

        <div className="col-start-7 row-start-7 mt-[30px] place-self-end">
          <button
            type="submit"
            className="flex items-center gap-1 px-5 text-lg font-normal leading-[100%] bg-primary text-white rounded-[5px] cursor-pointer hover:bg-primary-light transition-colors duration-200 ease-in-out"
          >
            <span className="py-[12px]">დავალების შექმნა</span>
          </button>
        </div>
      </div>
    </form>
  );
}
