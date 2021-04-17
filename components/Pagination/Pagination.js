import React, { useState } from "react";
import { Pagination as PaginationSU } from "semantic-ui-react";
import { useRouter } from "next/router";
import queryString from "query-string";

export default function Pagination(props) {
  const { totalproducts, page, limitPerPage, setactivePage } = props;

  const totalPages = Math.ceil(totalproducts / limitPerPage);

  const gotoPage = (newPage) => {
    setactivePage(newPage);
  };

  return (
    <div className="pagination">
      <PaginationSU
        activePage={page}
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
