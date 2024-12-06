import { Skeleton } from "../ui";
const TableSkeleton = () => {
  return (
    <div className="space-y-3">
      {/* Skeleton for Table Header */}
      <div className="flex space-x-2">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-6 w-1/4" />
      </div>

      {/* Skeleton for Table Rows */}
      <div className="space-y-2">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex space-x-2">
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-5 w-1/4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
