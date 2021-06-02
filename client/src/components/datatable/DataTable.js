import React from "react";
import "./DataTable.css";

const DataTable = ({ data }) => {
  let columns = data[0] && Object.keys(data[0]);
  return (
    <table>
      <thead>
        <tr>{data[0] && columns.map((heading) => <th>{heading}</th>)}</tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr>
            {columns.map((column) => (
              <td>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
