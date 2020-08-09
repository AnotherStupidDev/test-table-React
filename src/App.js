import React, { useState } from "react"
import Loader from "./components/UI/Loader/Loader"
import { Table } from "./components/Table/Table"
import { TableSearch } from "./components/Table/TableSearch/TableSearch"
import DetailRowInfo from "./components/UI/DetailRowInfo/DetailRowInfo"
import DataVolumeSelector from "./components/DataVolumeSelector/DataVolumeSelector"
import { Pagination } from "./components/Table/Pagination/Pagination"
import Form from "./components/Form/Form"
import Modal from "./components/UI/Modal/Modal"
import axios from "axios"

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
  const [error, setError] = useState(false)

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

  const addPerson = ({ id, firstName, lastName, email, phone }) => {
    id = id.value
    firstName = firstName.value
    lastName = lastName.value
    email = email.value
    phone = phone.value

    setData([{ id, firstName, lastName, email, phone }, ...data])
    setIsAddingPerson(false)
  }

  const onAddPersonHandler = () => {
    setIsAddingPerson(true)
  }

  const errorClickedHandler = () => {
    setError("")
    setIsDataVolumeSelected(false)
  }

  const onBackHandler = () => {
    setData([])
    setIsDataVolumeSelected(false)
  }

  async function fetchData(url) {
    try {
      const response = await axios.get(url)
      setData(response.data)
      setIsLoading(false)
    } catch (e) {
      setError(
        "Не удалось загрузить объем данных, возможно это проверка ошибки, или проблемы с сервером :)",
      )
    }
  }

  // Get Current Rows
  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentData = getFilteredData().slice(indexOfFirstRow, indexOfLastRow)
  const onPageChangedHandler = (pageNumber) => setCurrentPage(pageNumber)

  if (!isDataVolumeSelected) {
    return (
      <div className="container">
        <DataVolumeSelector onSelect={dataVolumeSelectHandler} />
      </div>
    )
  }
  if (error) {
    return (
      <Modal show={error} modalClosed={errorClickedHandler}>
        {error ? error : null}
      </Modal>
    )
  }
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
            onBacking={onBackHandler}
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
