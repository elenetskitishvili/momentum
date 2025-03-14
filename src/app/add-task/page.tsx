import AddTaskForm from "@/components/AddTaskForm";

export default function AddTask() {
  return (
    <section className="max-w-[1920px] mx-auto h-[1000px] mt-[140px]">
      <h1 className="text-[34px] font-semibold mb-[90px] text-primary-text">
        დავალებების გვერდი
      </h1>
      <AddTaskForm />
    </section>
  );
}
