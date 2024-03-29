import React from 'react';
import { dots, usePagination } from '../../lib/hooks/usePagination';
import { v4 as uuidv4 } from 'uuid';

interface CryptoTablePaginationProps {
  onPageChange: (x: number) => void;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
}

export const Pagination: React.FC<CryptoTablePaginationProps> = ({
  onPageChange,
  totalCount,
  siblingCount,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  const lastPage = paginationRange[paginationRange.length - 1];
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };
  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  const onChangePage = (pageNumber: number) => () => {
    onPageChange(pageNumber);
  };

  const isFirstPage = () => (currentPage === 1 ? ' pagination__item_disabled' : '');
  const isLastPage = () => (currentPage === lastPage ? ' pagination__item_disabled' : '');
  const isCurrentPage = (pageNumber: string | number) =>
    currentPage === pageNumber ? ' pagination__item_selected' : '';

  return (
    <ul className="pagination" data-cy="pagination">
      <li className={`pagination__item${isFirstPage()}`} onClick={onPrevious}>
        <div className="pagination__arrow pagination__arrow_left" data-cy="pagination-arrow-left" />
      </li>
      {paginationRange.map((pageNumber) =>
        pageNumber === dots ? (
          <li
            key={uuidv4()}
            className="pagination__item pagination__item_dots"
            data-cy="pagination-item"
          >
            &#8230;
          </li>
        ) : (
          <li
            key={uuidv4()}
            className={`pagination__item${isCurrentPage(pageNumber)}`}
            data-cy="pagination-item"
            onClick={onChangePage(+pageNumber)}
          >
            {pageNumber}
          </li>
        )
      )}
      <li className={`pagination__item${isLastPage()}`} onClick={onNext}>
        <div
          className="pagination__arrow pagination__arrow_right"
          data-cy="pagination-arrow-right"
        />
      </li>
    </ul>
  );
};
