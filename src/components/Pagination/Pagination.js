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

// import React from "react"

// const LEFT_PAGE = "LEFT"
// const RIGHT_PAGE = "RIGHT"

// const range = (from, to, step = 1) => {
//   let i = from
//   const range = []

//   while (i <= to) {
//     range.push(i)
//     i += step
//   }

//   return range
// }

// export const Pagination = ({
//   rowsPerPage,
//   totalRows,
//   onPageChanged,
//   pageNeighbours,
// }) => {
//   const [currentPage, setCurrentPage] = useState(1)
//   const totalPages = Math.ceil(totalRows / rowsPerPage)

//   const moveToPage = (page) => {
//     const currentPage = Math.max(0, Math.min(page, totalPages))

//     const paginationData = {
//       currentPage,
//       totalPages,
//       rowsPerPage,
//       totalRows,
//     }
//   }
//   const fetchPageNumbers = () => {
//     const totalNumbers = pageNeighbours * 2 + 3
//     const totalBlocks = totalNumbers + 2

//     if (totalPages > totalBlocks) {
//       let pages = []

//       const leftBound = currentPage - pageNeighbours
//       const rightBound = currentPage + pageNeighbours
//       const beforeLastPage = totalPages - 1

//       const startPage = leftBound > 2 ? leftBound : 2
//       const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage

//       pages = range(startPage, endPage)

//       const pagesCount = pages.length
//       const singleSpillOffset = totalNumbers - pagesCount - 1

//       const leftSpill = startPage > 2
//       const rightSpill = endPage < beforeLastPage

//       const leftSpillPage = LEFT_PAGE
//       const rightSpillPage = RIGHT_PAGE

//       if (leftSpill && !rightSpill) {
//         const extraPages = range(startPage - singleSpillOffset, startPage - 1)
//         pages = [leftSpillPage, ...extraPages, ...pages]
//       } else if (!leftSpill && rightSpill) {
//         const extraPages = range(endPage + 1, endPage + singleSpillOffset)
//         pages = [...pages, ...extraPages, rightSpillPage]
//       } else if (leftSpill && rightSpill) {
//         pages = [leftSpillPage, ...pages, rightSpillPage]
//       }

//       return [1, ...pages, totalPages]
//     }

//     return range(1, totalPages)
//   }

//   return (
//     <nav>
//       <ul className="pagination">
//         {pages.map((page) => {
//           if (page === LEFT_PAGE) {
//             return (
//               <li key={page} className="page-item">
//                 <a
//                   className="page-link"
//                   href="#"
//                   aria-label="Previous"
//                   onClick={this.handleMoveLeft}
//                 >
//                   <span aria-hidden="true">&laquo;</span>
//                   <span className="sr-only">Previous</span>
//                 </a>
//               </li>
//             )
//           }
//           if (page === RIGHT_PAGE) {
//             return (
//               <li key={page} className="page-item">
//                 <a
//                   className="page-link"
//                   href="#"
//                   aria-label="Previous"
//                   onClick={this.handleMoveLeft}
//                 >
//                   <span aria-hidden="true">&laquo;</span>
//                   <span className="sr-only">Previous</span>
//                 </a>
//               </li>
//             )
//           }

//           return (
//             <li key={page} className="page-item">
//               <a onClick={() => paginate(page)} href="#!" className="page-link">
//                 {page}
//               </a>
//             </li>
//           )
//         })}
//       </ul>
//     </nav>
//   )
// }
