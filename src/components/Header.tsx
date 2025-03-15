import Image from "next/image";
import AddEmployeeBtnMain from "./AddEmployeeBtnMain";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-white">
      <div className="max-w-[1920px] mx-auto px-[120px] flex items-center justify-between">
        <Link href={"/"}>
          <Image src="/icons/logo.svg" alt="Logo" width={210} height={38} />
        </Link>

        <div className="py-[30px] flex items-center gap-10">
          <AddEmployeeBtnMain />
          <Link
            href={"/add-task"}
            className="flex items-center gap-1 px-5 text-base font-normal leading-[100%] bg-primary text-white rounded-[5px] cursor-pointer hover:bg-primary-light transition-colors duration-200 ease-in-out"
          >
            <Image
              src="/icons/plus-icon.svg"
              alt="plus icon"
              width={20}
              height={20}
            />
            <span className="py-[12px]">შექმენი ახალი დავალება</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
