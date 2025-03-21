import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function TaskBoardSkeleton() {
  return (
    <>
      {/* Filters Skeleton */}
      <div className="relative w-auto mt-[52px] mb-[24px]">
        {/* Single large skeleton for filter buttons */}
        <Skeleton
          width={688}
          height={44}
          borderRadius={10}
          className="rounded-[10px]"
        />

        {/* Empty Space for Selected Filters */}
        <div className="flex flex-wrap items-center gap-2 mt-[25px] min-h-[29px]">
          <div className="h-[29px] w-full"></div>
        </div>
      </div>

      {/* Status Columns Skeleton */}
      <section className="grid grid-cols-4 gap-x-[52px] mb-[152px]">
        {[...Array(4)].map((_, i) => (
          <div key={i}>
            {/* Status Title */}
            <Skeleton
              width="100%"
              height={54}
              borderRadius={10}
              className="rounded-[10px] mb-[30px]"
            />

            {/* Task Cards */}
            <ul className="flex flex-col gap-y-[30px]">
              {[...Array(3)].map((_, j) => (
                <li
                  key={j}
                  className="bg-white rounded-[15px] p-5 border border-border-grey"
                >
                  <div className="flex flex-col gap-7">
                    {/* Priority & Department + Date */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2.5">
                        <Skeleton width={60} height={20} />
                        <Skeleton width={80} height={20} />
                      </div>
                      <Skeleton width={80} height={16} />
                    </div>

                    {/* Task Title & Description */}
                    <div className="max-w-[320px] flex flex-col gap-3">
                      <Skeleton width="100%" height={18} />
                      <Skeleton width="100%" height={40} />
                    </div>

                    {/* Avatar & Comments */}
                    <div className="flex items-center justify-between">
                      <Skeleton circle width={31} height={31} />
                      <div className="flex items-center gap-1">
                        <Skeleton width={22} height={22} />
                        <Skeleton width={20} height={16} />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}
