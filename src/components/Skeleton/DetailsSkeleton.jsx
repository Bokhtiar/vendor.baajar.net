import React from "react";

const DetailsSkeleton = () => {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* Top Section: User & Rider Skeleton */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* User Skeleton */}
        <div className=" rounded-lg p-4 shadow-sm space-y-3">
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-3 w-40 bg-gray-300 rounded"></div>
              <div className="h-3 w-32 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>

        {/* Rider Skeleton */}
        <div className="rounded-lg p-4 shadow-sm space-y-3">
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-3 w-40 bg-gray-300 rounded"></div>
              <div className="h-3 w-32 bg-gray-300 rounded"></div>
              <div className="h-3 w-44 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Status Skeleton Tabs */}
      <div className="flex gap-3 flex-wrap mt-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-6 w-20 bg-gray-300 rounded-full"></div>
        ))}
      </div>

      {/* Vendor Blocks */}
      {[...Array(2)].map((_, vendorIndex) => (
        <div key={vendorIndex} className=" rounded-md p-4 space-y-4">
          <div className="h-4 w-44 bg-gray-300 rounded"></div>

          {/* Table Header Skeleton */}
          <div className="grid grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>

          {/* Table Rows Skeleton */}
          {[...Array(2)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-5 gap-4 items-center mt-2"
            >
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
              <div className="h-3 w-32 bg-gray-300 rounded"></div>
              <div className="h-3 w-10 bg-gray-300 rounded"></div>
              <div className="h-3 w-16 bg-gray-300 rounded"></div>
              <div className="h-3 w-16 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DetailsSkeleton;
