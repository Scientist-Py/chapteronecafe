import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-3.5 sm:p-4 shadow-apple-light animate-pulse flex items-center justify-between gap-3">
      <div className="flex-1 space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 bg-gray-200 rounded-sm"></div>
          <div className="h-4 bg-gray-200 rounded-md w-3/5"></div>
        </div>
        <div className="h-3 bg-gray-100 rounded-md w-4/5"></div>
        <div className="h-3 bg-gray-100 rounded-md w-2/5"></div>
        <div className="h-5 bg-amber-100/60 rounded-md w-1/4 mt-2"></div>
      </div>

      <div className="relative flex-shrink-0">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-gray-200"></div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-7 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  );
}
