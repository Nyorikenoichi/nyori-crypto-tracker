import { useMemo } from 'react';

export const dots = '...';

export const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

interface UsePaginationProps {
  totalCount: number;
  pageSize: number;
  siblingCount: number;
  currentPage: number;
}

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount,
  currentPage,
}: UsePaginationProps): (string | number)[] => {
  return useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const pageNumbersWithoutSiblings = 5;
    const totalPageNumbers = siblingCount + pageNumbersWithoutSiblings;
    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;
    /*
    	Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, dots, totalPageCount];
    }
    /*
    	Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      return [firstPageIndex, dots, ...rightRange];
    }
    /*
    	Case 4: Both left and right dots to be shown
    */
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, dots, ...middleRange, dots, lastPageIndex];
  }, [totalCount, pageSize, siblingCount, currentPage]);
};
