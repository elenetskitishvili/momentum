import { fetchDepartments, fetchStatuses } from "@/lib/data-service";
import { Department, Status, Task } from "@/types/types";
import { format } from "date-fns";
import { ka } from "date-fns/locale";
import Image from "next/image";
import DepartmentLabel from "./DepartmentLabel";
import PriorityLabel from "./PriorityLabel";
import UpdateStatusForm from "./UpdateStatusForm";

export default async function TaskDetails({ task }: { task: Task }) {
  const departments: Department[] = await fetchDepartments();
  const statuses: Status[] = await fetchStatuses();
  const dueDate = task.due_date ? new Date(task.due_date) : null;
  const formattedDueDate = dueDate
    ? format(dueDate, "EEE - dd/MM/yyyy", { locale: ka })
    : "თარიღი უცნობია";

  return (
    <section className="mt-[140px]">
      <div className="mb-16">
        <div className="flex items-center gap-[18px] mb-3.5">
          <PriorityLabel priority={task.priority} size="medium" />
          <DepartmentLabel department={task.department} size="medium" />
        </div>
        <h1 className="text-primary-text font-semibold text-[34px] leading-[100%] mb-[21px]">
          {task.name}
        </h1>
        <p className="text-black leading-[150%] text-lg">{task.description}</p>
      </div>
      <div className="">
        <h2 className="text-2xl text-custom-dark font-medium leading-[100%] mb-7">
          დავალების დეტალები
        </h2>
        <div className="grid grid-cols-2 grid-rows-[repeat(3,70px)] gap-x-[70px] items-center">
          <div className="flex items-center gap-1.5">
            <Image
              src={"/icons/pie-chart.svg"}
              alt="pie chart icon"
              width={24}
              height={24}
            />
            <span className="text-custom-dark-light leading-[150%] font-normal">
              სტატუსი
            </span>
          </div>
          <UpdateStatusForm statuses={statuses} currentStatus={task.status} />

          <div className="flex items-center gap-2">
            <Image
              src={"/icons/user-icon.svg"}
              alt="user icon"
              width={22}
              height={22}
            />
            <span className="text-custom-dark-light leading-[150%] font-normal">
              თანამშრომელი
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src={task.employee.avatar}
              alt={task.employee.name}
              width={32}
              height={32}
              className="object-cover rounded-full"
            />
            <div className="relative bottom-1.5">
              <p className="font-light text-[11px] leading-[100%] text-custom-dark-light">
                {departments[task.department.id]?.name}
              </p>
              <p className="text-dark-text text-sm font-normal leading-[150%]">
                {task.employee.name} {task.employee.surname}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Image
              src={"/icons/calendar.svg"}
              alt="calendar icon"
              width={24}
              height={24}
            />
            <span className="text-custom-dark-light leading-[150%] font-normal">
              დავალების ვადა
            </span>
          </div>
          <div className="text-sm text-dark-text font-normal leading-[150%]">
            {formattedDueDate}
          </div>
        </div>
      </div>
    </section>
  );
}
