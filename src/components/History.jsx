import { StoreContext } from "../store";
import { useContext, useEffect, useState } from "react";

const History = () => {
  const { store, setStore } = useContext(StoreContext);
  const { history } = store;

  console.log(history);

  return (
    <div className="card">
      <h2>History</h2>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Amount</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {history.map(({ status, amount, time }) => (
            <tr>
              <td>{status}</td>
              <td>{amount}</td>
              <td>{time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
