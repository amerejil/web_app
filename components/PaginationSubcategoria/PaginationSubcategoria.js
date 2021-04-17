import React, { useState, useEffect } from "react";
import { Pagination as PaginationSU } from "semantic-ui-react";

export default function PaginationSubcategoria(props) {
  const {
    setactivepagesArry,
    activepagesArry,
    totalproducts,
    limitPerPage,

    index,
  } = props;

  const totalPages = Math.ceil(totalproducts / limitPerPage);

  const gotoPage = (newPage) => {
    const newarray = [...activepagesArry];
    newarray[index] = newPage;
    setactivepagesArry(newarray);
  };
  console.log("position", activepagesArry[index]);
  console.log(index);
  return (
    <div className="pagination">
      <PaginationSU
        activePage={activepagesArry[index]}
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
