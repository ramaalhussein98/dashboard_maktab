import { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import "../assets/css/pagination.css";
const Pagination = ({ data, setPage }) => {
  const { currentPage, lastPage } = data?.data || {};

  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    prevNum: null,
    nextNum: null,
    firstPage: 1,
  });


  useEffect(() => {
    if (currentPage) {
      setPagination((prevPagination) => ({
        ...prevPagination,
        currentPage,
        lastPage,
        prevNum: Math.max(1, currentPage - 1),
        nextNum: Math.min(lastPage, currentPage + 1),
      }));
    }
  }, [currentPage, lastPage]);

  const rerunDataFunc = async (pageNumber) => {
    setPage(pageNumber);
  };

  const { firstPage, prevNum, nextNum } = pagination;

  return (
    <div className="bg-blocks-color  p-4 flex items-center justify-center">
      <button onClick={() => rerunDataFunc(firstPage)}>
        <KeyboardDoubleArrowRightIcon />
      </button>
      <button onClick={() => rerunDataFunc(nextNum)}>
        <ChevronRightIcon />
      </button>

      <div className="flex gap-4 items-center">
        {firstPage !== currentPage && (
          <span
            className="cursor-pointer"
            onClick={() => rerunDataFunc(firstPage)}
          >
            {firstPage}
          </span>
        )}
        {prevNum > firstPage + 1 && <span>...</span>}

        {prevNum > 0 && prevNum !== firstPage && (
          <span
            className="cursor-pointer"
            onClick={() => rerunDataFunc(prevNum)}
          >
            {prevNum}
          </span>
        )}
        <span className="cursor-pointer active-page">{currentPage}</span>
        {nextNum < lastPage && (
          <span
            className="cursor-pointer"
            onClick={() => rerunDataFunc(nextNum)}
          >
            {nextNum}
          </span>
        )}
        {nextNum < lastPage - 1 && <span>...</span>}
        {lastPage !== currentPage && (
          <span
            className="cursor-pointer"
            onClick={() => rerunDataFunc(lastPage)}
          >
            {lastPage}
          </span>
        )}
      </div>

      <button onClick={() => rerunDataFunc(lastPage)}>
        <ChevronLeftIcon />
      </button>
      <button onClick={() => rerunDataFunc(prevNum)}>
        <KeyboardDoubleArrowLeftIcon />
      </button>
    </div>
  );
};

export default Pagination;
