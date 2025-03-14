import Filters from "@/components/Filters";

export default function Home() {
  return (
    <section className="max-w-[1920px] mx-auto h-[1000px] mt-[140px]">
      <h1 className="text-[34px] font-semibold text-primary-text">
        დავალებების გვერდი
      </h1>
      <Filters />
    </section>
  );
}
