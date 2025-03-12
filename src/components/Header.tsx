import Image from "next/image";

export default function Header() {
  return (
    <header className="max-w-[1920px] mx-auto px-[120px] flex items-center justify-between">
      {/* LOGO */}
      <Image src="/icons/logo.svg" alt="Logo" width={210} height={38} />

      {/* BUTTONS */}
      <div className="py-[30px] flex items-center gap-10">
        {/* CREATE EMPLOYEE */}
        <button className="py-[11px] px-5 text-base font-normal leading-[100%] rounded-[5px] border border-primary text-primary-text cursor-pointer">
          თანამშრომლის შექმნა
        </button>

        {/* CREATE TASK */}
        <button className="flex items-center gap-1 px-5 text-base font-normal leading-[100%] bg-primary text-white rounded-[5px] cursor-pointer">
          <Image
            src="/icons/plus-icon.svg"
            alt="plus icon"
            width={20}
            height={20}
          />
          <span className="py-[12px]">შექმენი ახალი დავალება</span>
        </button>
      </div>
    </header>
  );
}
