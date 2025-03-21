import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FormSkeleton = () => {
  return (
    <form className="max-w-[1370px]">
      <div className="grid grid-cols-[1fr_32px_1fr_160px_1fr_32px_1fr] grid-rows-[repeat(7,_auto)] items-start gap-y-[20px] w-full">
        {/* Title */}
        <div className="col-start-1 col-span-3">
          <div className="flex justify-between items-center mb-1">
            <Skeleton width={100} height={16} />
            <span className="text-[10px] h-[10px] block"></span>
          </div>
          <Skeleton height={42} />
          <div className="h-[12px]"></div>
          <div className="h-[12px]"></div>
        </div>

        {/* Department */}
        <div className="col-start-5 col-span-3">
          <div className="flex justify-between items-center mb-1">
            <Skeleton width={100} height={16} />
            <span className="text-[10px] h-[10px] block"></span>
          </div>
          <Skeleton height={42} />
          <div className="h-[12px]"></div>
        </div>

        {/* Description */}
        <div className="col-span-3">
          <div className="flex justify-between items-center mb-1">
            <Skeleton width={100} height={16} />
          </div>
          <Skeleton height={133} />
          <div className="h-[12px]"></div>
          <div className="h-[12px]"></div>
        </div>

        {/* Employee */}
        <div className="col-start-5 col-span-3">
          <div className="flex justify-between items-center mb-1">
            <Skeleton width={150} height={16} />
            <span className="text-[10px] h-[10px] block"></span>
          </div>
          <Skeleton height={42} />
          <div className="h-[12px]"></div>
        </div>

        {/* Priority */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <Skeleton width={100} height={16} />
            <span className="text-[10px] h-[10px] block"></span>
          </div>
          <Skeleton height={42} />
          <div className="h-[12px]"></div>
        </div>

        {/* Status */}
        <div className="col-start-3">
          <div className="flex justify-between items-center mb-1">
            <Skeleton width={100} height={16} />
            <span className="text-[10px] h-[10px] block"></span>
          </div>
          <Skeleton height={42} />
          <div className="h-[12px]"></div>
        </div>

        {/* Due Date */}
        <div className="col-start-5 col-span-3">
          <Skeleton height={42} />
          <div className="h-[12px]"></div>
        </div>

        {/* Submit Button */}
        <div className="col-start-7 row-start-7 mt-[30px] place-self-end">
          <Skeleton width={208} height={42} />
        </div>
      </div>
    </form>
  );
};

export default FormSkeleton;
