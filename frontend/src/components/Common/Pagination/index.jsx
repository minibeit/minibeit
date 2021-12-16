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
      prevPageText={"이전"}
      nextPageText={"다음"}
      hideFirstLastPages={true}
      onChange={(e) => {
        if (setPage) {
          setPage(e);
          window.scrollTo(0, 0);
        }
        if (onChange) {
          onChange(e);
          window.scrollTo(0, 0);
        }
      }}
    />
  );
};

export default Paging;
