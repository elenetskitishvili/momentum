import ArrowIcon from "./ArrowIcon";

export default function Filters() {
  return (
    <div className="inline-flex items-center gap-[45px] border border-border-grey rounded-[10px] w-auto mt-[52px] mb-[79px]">
      <div className="flex items-center gap-2 cursor-pointer pl-[18px] pr-[30px] py-[13px] text-dark-text hover:text-primary transition-colors duration-200 ease-in-out">
        <span className="text-base font-normal">დეპარტამენტი</span>
        <ArrowIcon />
      </div>
      <div className="flex items-center gap-2 cursor-pointer pl-[18px] pr-[30px] py-[13px] text-dark-text hover:text-primary transition-colors duration-200 ease-in-out">
        <span className="text-base font-normal">პრიორიტეტი</span>
        <ArrowIcon />
      </div>
      <div className="flex items-center gap-2 cursor-pointer pl-[18px] pr-[30px] py-[13px] text-dark-text hover:text-primary transition-colors duration-200 ease-in-out">
        <span className="text-base font-normal">თანამშრომელი</span>
        <ArrowIcon />
      </div>
    </div>
  );
}
