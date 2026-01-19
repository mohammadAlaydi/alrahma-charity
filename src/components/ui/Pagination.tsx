"use client";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center gap-2.5">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex h-8.75 w-8.75 -scale-x-100 items-center justify-center overflow-clip rounded-[37px] border border-[#d3d3d3] bg-[#007f5e] p-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="الصفحة السابقة"
      >
        <div className="flex h-5.25 w-5.25 rotate-90 items-center justify-center overflow-clip">
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
            <path
              d="M10.5 6.5625L14.4375 10.5L10.5 14.4375M6.5625 14.4375L10.5 10.5L6.5625 6.5625"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex h-8.75 w-8.75 items-center justify-center overflow-clip rounded-[39px] p-2.5 ${
            page === currentPage
              ? "bg-[#b4bb5f]"
              : "border border-[#d3d3d3] bg-white"
          }`}
        >
          <p
            className={`font-dm-sans text-sm font-medium leading-[1.1] tracking-[-0.56px] ${
              page === currentPage ? "text-white" : "text-[#474747]"
            }`}
          >
            {page}
          </p>
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex h-8.75 w-8.75 items-center justify-center overflow-clip rounded-[37px] border border-[#d3d3d3] bg-[#007f5e] p-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="الصفحة التالية"
      >
        <div className="flex h-5.25 w-5.25 rotate-90 items-center justify-center overflow-clip">
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
            <path
              d="M10.5 6.5625L14.4375 10.5L10.5 14.4375M6.5625 14.4375L10.5 10.5L6.5625 6.5625"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
    </div>
  );
}
