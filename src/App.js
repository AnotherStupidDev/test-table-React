import React, { useEffect, useState } from "react"
import Loader from "./components/Loader/Loader"
import { Table } from "./components/Table/Table"
import _ from "lodash"
import DetailRowInfo from "./components/DetailRowInfo/DetailRowInfo"
import DataVolumeSelector from "./components/DataVolumeSelector/DataVolumeSelector"

const App = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [sortType, setSortType] = useState("asc")
  const [sortField, setSortField] = useState("")
  const [showRowInfo, setShowRowInfo] = useState(null)
  const [isDataVolumeSelected, setIsDataVolumeSelected] = useState(false)

  const onSortHandler = (sortFieldName) => {
    const dataClone = [...data]
    const sortDirection = sortType === "asc" ? "desc" : "asc"
    const orderedData = _.orderBy(dataClone, sortFieldName, sortDirection)

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

  async function fetchData(url) {
    const response = await fetch(url)
    const data = await response.json()
    setData(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (!isDataVolumeSelected) {
    return (
      <div className="container">
        <DataVolumeSelector onSelect={dataVolumeSelectHandler} />
      </div>
    )
  }

  return (
    <div className="container">
      {isLoading ? (
        <Loader />
      ) : (
        <Table
          data={data}
          onSort={onSortHandler}
          sort={sortType}
          sortField={sortField}
          onRowSelect={onRowSelectHandler}
        />
      )}
      {showRowInfo ? <DetailRowInfo person={showRowInfo} /> : null}
    </div>
  )
}

export default App
