import { ChangeEvent } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { paginationOptionList } from './paginationOptionList';
import { searchParamsKeys } from '../../../constant/searchParams';
import { useRouter, useSearchParams } from 'next/navigation';
import { getUpdatedSearchParams } from '../../../utils/searchHelper';

const navLingsClasses = (isActive: boolean) => {
  return `text-l px-3 py-1 rounded-full ${isActive ? 'bg-gray-500 text-white font-[700]' : 'bg-gray-100 text-text-[#000] font-[400]'}`;
};

const Pagination = ({
  count,
  itemsPerPage,
  currentPage,
  handleChangeItemsPerPage,
  routePath,
}: {
  count: number;
  itemsPerPage: number;
  currentPage: number;
  handleChangeItemsPerPage: (e: ChangeEvent<HTMLSelectElement>) => void;
  routePath: string;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pages = Array.from({ length: Math.ceil(count / itemsPerPage) });

  const handleChangePage = (page: number) => {
    const newSearchParams = getUpdatedSearchParams(searchParams, {
      [searchParamsKeys.PAGE]: String(page),
    });

    router.push(`${routePath}?${newSearchParams}`);
  };

  return (
    <div className="col-span-full flex justify-center items-center relative ">
      <ul className="flex justify-center items-center gap-4 my-8 ">
        <li>
          <button
            className={`${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={() => handleChangePage(currentPage - 1)}
          >
            <ChevronLeft />
          </button>
        </li>

        {pages.map((_, index) => (
          <li key={index}>
            <button
              className={navLingsClasses(index + 1 === currentPage)}
              onClick={() => handleChangePage(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}

        <li>
          <button
            className={`${currentPage === pages.length ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={() => handleChangePage(currentPage + 1)}
          >
            <ChevronRight />
          </button>
        </li>
      </ul>

      <div className="absolute right-0 flex items-center space-x-2 ">
        <select
          id="pagination-select"
          className="px-3 py-1 border border-gray-300 rounded-xl bg-white text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gray-300"
          onChange={handleChangeItemsPerPage}
          defaultValue={paginationOptionList[1]}
        >
          {paginationOptionList.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
        <label htmlFor="pagination-select" className="text-sm pl-2 text-text-primary">
          Items per page
        </label>
      </div>
    </div>
  );
};

export default Pagination;
