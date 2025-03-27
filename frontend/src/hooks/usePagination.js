import { useState } from 'react';

export const usePagination = (initialPage = 1, initialLimit = 9) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const nextPage = () => setPage(prev => prev + 1);
  const prevPage = () => setPage(prev => Math.max(1, prev - 1));
  const goToPage = (pageNum) => setPage(pageNum);
  const changeLimit = (newLimit) => {
    setLimit(newLimit);
    setPage(1); 
  };

  return {
    page,
    limit,
    setPage: goToPage,
    nextPage,
    prevPage,
    changeLimit
  };
};