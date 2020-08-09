import React, { useState, useEffect } from "react"
import useHttpErrorHandler from "../../hooks/useHttpErrorHandler"
import Modal from "../../components/UI/Modal/Modal"

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, clearError] = useHttpErrorHandler(axios)

    return (
      <React.Fragment>
        <Modal show={error} closed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </React.Fragment>
    )
  }
}
// isError ? isError.message : null
export default withErrorHandler
