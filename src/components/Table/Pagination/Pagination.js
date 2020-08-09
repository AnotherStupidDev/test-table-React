import React, { useState } from "react"

export const Pagination = ({
  rowsPerPage,
  totalRows,
  onPageChanged,
  portionSize,
}) => {
  const [portionNumber, setPortionNumber] = useState(1)

  let pagesCount = Math.ceil(totalRows / rowsPerPage)

  const pages = []

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
  let rightPortionPageNumber = portionNumber * portionSize
  let portionCount = Math.ceil(pagesCount / portionSize)

  return (
    <nav>
      <ul className="pagination">
        {portionNumber > 1 && (
          <button
            className="btn btn-sm btn-link"
            onClick={() => {
              setPortionNumber(portionNumber - 1)
            }}
          >
            &laquo;
          </button>
        )}
        {pages
          .filter((page) => {
            return (
              page >= leftPortionPageNumber && page <= rightPortionPageNumber
            )
          })
          .map((page) => (
            <li key={page} className="page-item">
              <a
                onClick={() => onPageChanged(page)}
                href="#!"
                className="page-link"
              >
                {page}
              </a>
            </li>
          ))}
        {portionCount > portionNumber && (
          <button
            className="btn btn-sm btn-link"
            onClick={() => setPortionNumber(portionNumber + 1)}
          >
            &raquo;
          </button>
        )}
      </ul>
    </nav>
  )
}
