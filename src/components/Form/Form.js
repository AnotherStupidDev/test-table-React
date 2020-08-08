import React from "react"

const Form = (props) => {
  //   constructor() {
  //     super()

  //     this.state = {
  //       name: this.props.name,
  //       email: this.props.email,
  //     }

  //     this.handleChange = this.handleChange.bind(this)
  //     this.addPerson = this.addPerson.bind(this)

  //     /*    this.formSubmit = this.formSubmit.bind(this); */
  //   }
  //   const [newPerson, setNewPerson] = useState({
  //     id: "",
  //     firstName: "",
  //     lastName: "",
  //     phone: "",
  //   })

  //   const handleChange = (e) => {
  //     setNewPerson({ [e.target.id]: e.target.value })
  //   }

  const formSubmitHandler = (event) => {
    event.preventDefault()
    const form = event.target
    const id = form.elements["formId"].value
    const firstName = form.elements["formName"].value
    const email = form.elements["formMail"].value
    const lastName = form.elements["formSurname"].value
    const phone = form.elements["formPhone"].value
    props.addPerson(id, firstName, email, lastName, phone)
    form.reset()
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="form-group">
        <label htmlFor="formId">ID</label>
        <input
          type="text"
          className="form-control"
          id="formId"
          placeholder="ID"
        />
      </div>
      <div className="form-group">
        <label htmlFor="formName">First Name</label>
        <input
          type="text"
          className="form-control"
          id="formName"
          placeholder="Enter name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="formSurname">Last Name</label>
        <input
          type="text"
          className="form-control"
          id="formSurname"
          placeholder="Enter surname"
        />
      </div>
      <div className="form-group">
        <label htmlFor="formMail">Email address</label>
        <input
          type="email"
          className="form-control"
          id="formMail"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="formPhone">Phone</label>
        <input
          type="tel"
          className="form-control"
          id="formPhone"
          placeholder="Enter phone"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  )
}

export default Form
