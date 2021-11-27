import React from "react";
import "./Paging.css";
import Pagination from "react-js-pagination";

const Paging = ({ page, count, setPage, onChange }) => {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={count}
      pageRangeDisplayed={10}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={(e) => {
        if (setPage) {
          setPage(e);
        }
        if (onChange) {
          onChange(e);
        }
      }}
    />
  );
};

export default Paging;
