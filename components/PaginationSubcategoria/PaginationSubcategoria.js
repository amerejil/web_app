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
  console.log("hola total productos", totalproducts);

  const gotoPage = (newPage) => {
    const newarray = [...activepagesArry];
    newarray[index] = newPage;
    setactivepagesArry(newarray);
  };

  return (
    <div className="pagination">
      {totalPages > 1 ? (
        <PaginationSU
          activePage={activepagesArry[index]}
          totalPages={totalPages}
          firstItem={null}
          lastItem={null}
          onPageChange={(_, data) => {
            gotoPage(data.activePage);
          }}
          boundaryRange={0}
          siblingRange={1}
          ellipsisItem={null}
        ></PaginationSU>
      ) : null}
    </div>
  );
}
