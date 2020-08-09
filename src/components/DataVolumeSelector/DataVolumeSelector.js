import React from "react"
import classes from "./DataVolumeSelector.module.css"

const DataVolumeSelector = (props) => {
  const smallUrl = `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`
  const bigUrl = `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`
  const failUrl = `http://www.3333.com`

  return (
    <div className={classes.main}>
      <div className="btn-group btn-group-lg" role="group" aria-label="...">
        <button
          onClick={() => props.onSelect(smallUrl)}
          className="btn btn-success btn-lg btn-block"
        >
          Загрузить 32 элемента
        </button>
      </div>
      <div className="btn-group btn-group-lg" role="group" aria-label="...">
        <button
          onClick={() => props.onSelect(bigUrl)}
          className="btn btn-secondary btn-lg btn-block"
        >
          Загрузить 1000 элементов
        </button>
      </div>
      <div className="btn-group btn-group-lg" role="group" aria-label="...">
        <button
          onClick={() => props.onSelect(failUrl)}
          className="btn btn-warning btn-lg btn-block"
        >
          Проверить ошибку.. :)
        </button>
      </div>
    </div>
  )
}

export default DataVolumeSelector
