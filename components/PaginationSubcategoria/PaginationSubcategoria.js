import React, { useState, useEffect } from "react";
import { Pagination as PaginationSU } from "semantic-ui-react";

export default function PaginationSubcategoria(props) {
  const {
    setactivepagesArry,
    activepagesArry,
    totalproducts,
    page,
    limitPerPage,
    setactivePages,
    index,
    activepages,
  } = props;
  const newarray = activepagesArry;
  const totalPages = Math.ceil(totalproducts / limitPerPage);
  setactivePages(newarray[index]);
  const gotoPage = (newPage) => {
    setactivePages(newPage);
    activepagesArry[index] = newPage;
  };

  return (
    <div className="pagination">
      <PaginationSU
        activePage={activepages}
        totalPages={totalPages}
        firstItem={null}
        lastItem={null}
        onPageChange={(_, data) => gotoPage(data.activePage)}
        boundaryRange={0}
        siblingRange={1}
        ellipsisItem={null}
      ></PaginationSU>
    </div>
  );
}
