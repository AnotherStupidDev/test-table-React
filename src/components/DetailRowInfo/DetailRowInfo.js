import React from "react"

export default ({ person }) => {
  return (
    <div className="thumbnail">
      <div className="thumbnail-caption">
        <h3>{person.firstName + " " + person.lastName}</h3>
        <table className="user-info table table-responsive">
          <tbody>
            <tr>
              <td>ID:</td>
              <td>{person.id}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{person.email}</td>
            </tr>
            <tr>
              <td>Phone:</td>
              <td>8 {person.phone}</td>
            </tr>
          </tbody>
        </table>

        <p>
          <b>Description:</b> {person.description}
        </p>
      </div>
    </div>
  )
}
