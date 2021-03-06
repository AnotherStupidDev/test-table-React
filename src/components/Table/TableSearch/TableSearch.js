import React, { useState } from "react"

export const TableSearch = (props) => {
  const [value, setValue] = useState("")

  const valueChangeHandler = (event) => {
    setValue(event.target.value)
  }

  return (
    <div className="input-group mb-3 mt-3">
      <div className="input-group-prepend">
        <button
          className="btn btn-outline-secondary"
          onClick={() => props.onSearch(value)}
        >
          Search
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={props.onAddPerson}
        >
          Add Person
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            props.onReset()
            setValue("")
          }}
        >
          Reset
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            props.onBacking()
            setValue("")
          }}
        >
          Back to the Root
        </button>
      </div>
      <input
        type="text"
        className="form-control"
        onChange={valueChangeHandler}
        value={value}
      />
    </div>
  )
}
