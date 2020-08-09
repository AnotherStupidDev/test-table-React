import React, { useState } from "react"
import { updateObject, checkValidity } from "../../utility/utility"

const Form = (props) => {
  const initialAddPersonFormState = {
    id: {
      id: "id",
      value: "",
      valid: false,
    },
    firstName: {
      id: "firstName",
      value: "",
      valid: false,
    },
    lastName: {
      id: "lastName",
      value: "",
      valid: false,
    },
    email: {
      id: "email",
      value: "",
      valid: false,
    },
    phone: {
      id: "phone",
      value: "",
      valid: false,
    },
  }
  const [addPersonForm, setAddPersonForm] = useState(initialAddPersonFormState)
  const [isFormFilled, setIsFormFilled] = useState(false)

  const inputChangedHandler = (event) => {
    const inputId = event.target.id
    const updatedFormElement = updateObject(addPersonForm[inputId], {
      value: event.target.value,
      valid: checkValidity(event.target.value),
    })

    const updatedAddPersonForm = updateObject(addPersonForm, {
      [inputId]: updatedFormElement,
    })

    let formIsValid = true

    for (let inputIdentifier in updatedAddPersonForm) {
      formIsValid = updatedAddPersonForm[inputIdentifier].valid && formIsValid
    }
    setAddPersonForm(updatedAddPersonForm)
    setIsFormFilled(formIsValid)
  }

  const formSubmitHandler = (event) => {
    event.preventDefault()
    props.addPerson(addPersonForm)
    setAddPersonForm(initialAddPersonFormState)
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <p>Добавить пользователя в таблицу</p>
      <div className="form-group">
        <label htmlFor={addPersonForm.id.id}>ID</label>
        <input
          type="number"
          min="0"
          className="form-control"
          id={addPersonForm.id.id}
          placeholder="ID"
          value={addPersonForm.id.value}
          onChange={(event) => inputChangedHandler(event)}
        />
      </div>
      <div className="form-group">
        <label htmlFor={addPersonForm.firstName.id}>First Name</label>
        <input
          type="text"
          className="form-control"
          id={addPersonForm.firstName.id}
          placeholder="Enter name"
          value={addPersonForm.firstName.value}
          onChange={(event) => inputChangedHandler(event)}
        />
      </div>
      <div className="form-group">
        <label htmlFor={addPersonForm.lastName.id}>Last Name</label>
        <input
          type="text"
          className="form-control"
          id={addPersonForm.lastName.id}
          placeholder="Enter surname"
          value={addPersonForm.lastName.value}
          onChange={(event) => inputChangedHandler(event)}
        />
      </div>
      <div className="form-group">
        <label htmlFor={addPersonForm.email.id}>Email address</label>
        <input
          type="email"
          className="form-control"
          id={addPersonForm.email.id}
          aria-describedby="emailHelp"
          placeholder="Enter email"
          value={addPersonForm.email.value}
          onChange={(event) => inputChangedHandler(event)}
        />
      </div>
      <div className="form-group">
        <label htmlFor={addPersonForm.phone.id}>Phone</label>
        <input
          type="tel"
          className="form-control"
          id={addPersonForm.phone.id}
          placeholder="Enter phone"
          value={addPersonForm.phone.value}
          onChange={(event) => inputChangedHandler(event)}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={!isFormFilled}
      >
        Add to the table
      </button>
    </form>
  )
}

export default Form
