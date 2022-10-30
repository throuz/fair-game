import { StoreContext } from "../store";
import { useContext } from "react";

const History = () => {
  const { store } = useContext(StoreContext);
  const { history } = store;

  return (
    <section className="card">
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
          {history.map(({ status, amount, time }, i) => (
            <tr key={time + i}>
              <td>{status}</td>
              <td>{amount}</td>
              <td>{time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default History;
