import React from "react";
import "./style/table.css"

const Table = ({ data }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Position</th>
            {/* <th>Artikelnummer</th> */}
            <th>Beschreibung</th>
            <th>Menge</th>
            <th>Einzelpreis</th>
            <th>Gesamtpreis</th>
          </tr>
        </thead>
        <tbody>
          {data.result.map((item, index) => (
            <tr key={index}>
              <td>{item.position}</td>
              {/* <td>{item.articlenumber}</td> */}
              <td>
                {item.description.map((desc, idx) => (
                  <p key={idx}>{desc}</p>
                ))}
              </td>
              <td>{item.amount}</td>
              <td>{item.single_price}</td>
              <td>{item.total_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
