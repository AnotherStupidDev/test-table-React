import React from "react"

export default ({ person }) => {
  return (
    <div className="thumbnail">
      <div className="thumbnail-caption">
        <h3>
          {"Выбран пользователь" +
            " " +
            person.firstName +
            " " +
            person.lastName}
        </h3>
        <table className="user-info table table-hover">
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
        <form>
          <div className="form-group">
            <textarea
              className="form-control"
              value={person.description}
              readOnly
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  )
}
