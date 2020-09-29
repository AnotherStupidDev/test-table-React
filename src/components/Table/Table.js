import React from "react"
import { ArrowUpIcon, ArrowDownIcon } from "@primer/octicons-react"

export const Table = (props) => (
  <table className="table table-hover">
    <thead>
      <tr>
        <th scope="col" onClick={() => props.onSort("id")}>
          ID{" "}
          {props.sortField === "id" ? (
            <span>
              {props.sort === "asc" ? (
                <ArrowUpIcon size="24" />
              ) : (
                <ArrowDownIcon size="24" />
              )}
            </span>
          ) : null}
        </th>
        <th scope="col" onClick={() => props.onSort("firstName")}>
          First Name
          {props.sortField === "firstName" ? (
            <span>
              {props.sort === "asc" ? (
                <ArrowUpIcon size="24" />
              ) : (
                <ArrowDownIcon size="24" />
              )}
            </span>
          ) : null}
        </th>
        <th scope="col" onClick={() => props.onSort("lastName")}>
          Last Name
          {props.sortField === "lastName" ? (
            <span>
              {props.sort === "asc" ? (
                <ArrowUpIcon size="24" />
              ) : (
                <ArrowDownIcon size="24" />
              )}
            </span>
          ) : null}
        </th>
        <th scope="col" onClick={() => props.onSort("email")}>
          Email
          {props.sortField === "email" ? (
            <span>
              {props.sort === "asc" ? (
                <ArrowUpIcon size="24" />
              ) : (
                <ArrowDownIcon size="24" />
              )}
            </span>
          ) : null}
        </th>
        <th scope="col" onClick={() => props.onSort("phone")}>
          Phone
          {props.sortField === "phone" ? (
            <span>
              {props.sort === "asc" ? (
                <ArrowUpIcon size="24" />
              ) : (
                <ArrowDownIcon size="24" />
              )}
            </span>
          ) : null}
        </th>
      </tr>
    </thead>
    <tbody>
      {props.data.map((item) => (
        <tr
          key={item.id + item.lastName}
          onClick={() => props.onRowSelect(item)}
        >
          <td>{item.id}</td>
          <td>{item.firstName}</td>
          <td>{item.lastName}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
        </tr>
      ))}
    </tbody>
  </table>
)
