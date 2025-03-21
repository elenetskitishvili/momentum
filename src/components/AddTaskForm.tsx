"use client";
import ValidatedTextField from "@/components/ValidatedTextField";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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
  const priorityOptions = priorities.map((p: Priority) => ({
    value: p.id.toString(),
    label: p.name,
    icon: p.icon,
  }));

  const [status, setStatus] = useState("1");
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

  const isEmployeeSelectDisabled = department.trim() === "" || employeesLoading;

  const [dueDate, setDueDate] = useState("");
  const [dueDateError, setDueDateError] = useState("");

  useEffect(() => {
    const loadFormData = () => {
      setTitle(localStorage.getItem("addTaskTitle") || "");
      setDescription(localStorage.getItem("addTaskDescription") || "");
      setDepartment(localStorage.getItem("addTaskDepartment") || "");
      setPriority(localStorage.getItem("addTaskPriority") || "2");
      setStatus(localStorage.getItem("addTaskStatus") || "1");
      setEmployee(localStorage.getItem("addTaskEmployee") || "");
      setDueDate(localStorage.getItem("addTaskDueDate") || "");
      setIsLoaded(true);
    };

    loadFormData();
  }, []);

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
    localStorage.setItem("addTaskTitle", newVal);
    validateTitle(newVal);
  };

  const handleDepartmentChange = (value: string) => {
    setDepartment(value);
    localStorage.setItem("addTaskDepartment", value);
    if (value.trim() === "") {
      setDepartmentError("სავალდებულოა");
    } else {
      setDepartmentError("");
    }
    setEmployee("");
    localStorage.setItem("addTaskEmployee", "");
    setEmployeeError("სავალდებულოა");
  };

  const handleEmployeeChange = (value: string) => {
    setEmployee(value);
    localStorage.setItem("addTaskEmployee", value);
    if (value.trim() === "") {
      setEmployeeError("სავალდებულოა");
    } else {
      setEmployeeError("");
    }
  };

  const handlePriorityChange = (value: string) => {
    setPriority(value);
    localStorage.setItem("addTaskPriority", value);
    if (value.trim() === "") {
      setPriorityError("სავალდებულოა");
    } else {
      setPriorityError("");
    }
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    localStorage.setItem("addTaskStatus", value);
    if (value.trim() === "") {
      setStatusError("სავალდებულოა");
    } else {
      setStatusError("");
    }
  };

  const handleDueDateChange = (date: string) => {
    setDueDate(date);
    localStorage.setItem("addTaskDueDate", date);
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

    setIsSubmitting(true);
    try {
      const response = await addTask(taskData);
      console.log("Task added successfully:", response);

      localStorage.removeItem("addTaskTitle");
      localStorage.removeItem("addTaskDescription");
      localStorage.removeItem("addTaskDepartment");
      localStorage.removeItem("addTaskPriority");
      localStorage.removeItem("addTaskStatus");
      localStorage.removeItem("addTaskEmployee");
      localStorage.removeItem("addTaskDueDate");

      router.push("/");
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center">
        loading...
      </div>
    );
  }

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
            value={department}
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
              localStorage.setItem("addTaskDescription", e.target.value);
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
            value={employee}
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
            value={priority}
            onChange={handlePriorityChange}
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
            value={status}
            onChange={handleStatusChange}
          />
        </div>

        <div className="col-start-5 col-span-3">
          <div className="flex justify-between items-center mb-1">
            {dueDateError && (
              <span className="text-custom-red text-xs">{dueDateError}</span>
            )}
          </div>
          <CustomDatePicker value={dueDate} onChange={handleDueDateChange} />
        </div>

        <div className="col-start-7 row-start-7 mt-[30px] place-self-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="gap-1 w-[208px] h-[42px] flex items-center justify-center text-lg font-normal leading-[100%] bg-primary text-white rounded-[5px] cursor-pointer hover:bg-primary-light transition-colors duration-200 ease-in-out disabled:cursor-not-allowed"
          >
            {isSubmitting ? "დაელოდეთ..." : "დავალების შექმნა"}
          </button>
        </div>
      </div>
    </form>
  );
}
