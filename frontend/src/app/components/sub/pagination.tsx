import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  return (
    <nav className="flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-600">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
      </span>
      <ul className="inline-flex items-center">
        <li className="flex-grow">
          <button
            onClick={onPrevPage}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-full px-4 py-2 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaChevronLeft className="mr-1" />
            Previous
          </button>
        </li>
        <li className="flex-grow">
          <button
            onClick={onNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-full px-4 py-2 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <FaChevronRight className="ml-1" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
