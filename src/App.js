import React, { useState } from "react"
import Loader from "./components/Loader/Loader"
import { Table } from "./components/Table/Table"
import { TableSearch } from "./components/TableSearch/TableSearch"
import DetailRowInfo from "./components/DetailRowInfo/DetailRowInfo"
import DataVolumeSelector from "./components/DataVolumeSelector/DataVolumeSelector"
import { Pagination } from "./components/Pagination/Pagination"
import Form from "./components/Form/Form"
import Modal from "./components/UI/Modal/Modal"

const App = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [sortType, setSortType] = useState("desc")
  const [sortField, setSortField] = useState("")
  const [showRowInfo, setShowRowInfo] = useState(null)
  const [isDataVolumeSelected, setIsDataVolumeSelected] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage] = useState(30)
  const [searchField, setSearchField] = useState("")
  const [isAddingPerson, setIsAddingPerson] = useState(false)

  const onSortHandler = (sortFieldName) => {
    const dataClone = [...data]
    let sortDirection = sortType === "asc" ? 1 : -1

    const orderedData = dataClone.sort((a, b) => {
      if (a[sortFieldName] === b[sortFieldName]) return 0
      return a[sortFieldName] > b[sortFieldName]
        ? sortDirection
        : sortDirection * -1
    })

    sortDirection = sortDirection * -1
    sortDirection === 1 ? (sortDirection = "asc") : (sortDirection = "desc")

    setData(orderedData)
    setSortType(sortDirection)
    setSortField(sortFieldName)
  }

  const onRowSelectHandler = (itemInfo) => {
    setShowRowInfo(itemInfo)
  }

  const dataVolumeSelectHandler = (url) => {
    setIsDataVolumeSelected(true)
    setIsLoading(true)
    fetchData(url)
  }

  const searchHandler = (search) => {
    setSearchField(search)
    setCurrentPage(1)
  }

  const resetHandler = () => {
    setSearchField("")
  }

  const getFilteredData = () => {
    if (!searchField) {
      return data
    }

    return data.filter((elem) => {
      return (
        elem["firstName"].toLowerCase().includes(searchField.toLowerCase()) ||
        elem["lastName"].toLowerCase().includes(searchField.toLowerCase()) ||
        elem["email"].toLowerCase().includes(searchField.toLowerCase()) ||
        elem["phone"].toLowerCase().includes(searchField.toLowerCase())
      )
    })
  }

  const addPerson = (id, firstName, lastName, email, phone) => {
    setData([{ id, firstName, lastName, email, phone }, ...data])
    setIsAddingPerson(false)
  }

  const onAddPersonHandler = () => {
    setIsAddingPerson(true)
  }

  async function fetchData(url) {
    const response = await fetch(url)
    const data = await response.json()
    setData(data)
    setIsLoading(false)
  }

  // Get Current Rows
  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentData = getFilteredData().slice(indexOfFirstRow, indexOfLastRow)
  const onPageChangedHandler = (pageNumber) => setCurrentPage(pageNumber)

  // useEffect(() => {
  //   // fetchData()
  // }, [])

  if (!isDataVolumeSelected) {
    return (
      <div className="container">
        <DataVolumeSelector onSelect={dataVolumeSelectHandler} />
      </div>
    )
  }
  console.log(data)
  return (
    <div className="container">
      {isLoading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Modal
            show={isAddingPerson}
            modalClosed={() => setIsAddingPerson(false)}
          >
            <Form addPerson={addPerson} />
          </Modal>

          <TableSearch
            onSearch={searchHandler}
            onReset={resetHandler}
            onAddPerson={onAddPersonHandler}
          />
          <Table
            data={currentData}
            onSort={onSortHandler}
            sort={sortType}
            sortField={sortField}
            onRowSelect={onRowSelectHandler}
          />
        </React.Fragment>
      )}
      {showRowInfo ? <DetailRowInfo person={showRowInfo} /> : null}
      {rowsPerPage > getFilteredData().length ? null : (
        <Pagination
          rowsPerPage={rowsPerPage}
          totalRows={data.length}
          onPageChanged={onPageChangedHandler}
          portionSize={27}
        />
      )}
    </div>
  )
}

export default App
