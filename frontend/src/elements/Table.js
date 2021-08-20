import React from "react";

export const Table = ({ columns, data }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(({ name, email, phone }) => (
          <tr key={name + email + phone}>
            <td>{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
