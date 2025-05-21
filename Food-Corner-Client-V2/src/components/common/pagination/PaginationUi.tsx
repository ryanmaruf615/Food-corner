interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationUi = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const createPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show the first page
      pages.push(1);

      // Show ellipsis if needed
      if (currentPage > 3) {
        pages.push("...");
      }

      // Show the two pages around the current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Show ellipsis if needed
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show the last page
      pages.push(totalPages);
    }
    return pages;
  };

  const pageNumbers = createPageNumbers();
  return (
    <div className="join">
      <button
        className="join-item btn btn-sm bg-orange-400 hover:bg-orange-400 text-white "
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {pageNumbers.map((pageNum, index) => (
        <button
          key={index}
          className={`join-item btn btn-sm bg-orange-400 hover:bg-orange-400 text-white ${
            pageNum === "..." ? "btn-disabled" : ""
          } ${pageNum === currentPage ? "bg-orange-400 text-white" : ""}`}
          disabled={pageNum === "..."}
          onClick={() => typeof pageNum === "number" && onPageChange(pageNum)}
        >
          {pageNum}
        </button>
      ))}
      <button
        className="join-item btn btn-sm bg-orange-400 hover:bg-orange-400 text-white"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationUi;
