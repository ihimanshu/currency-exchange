const Statistics = ({ exHistory, values, min, max, avg, onChangeSelect }) => {
  return (
    <>
      <div className="exchange-history">
        <h4 className="font-size-24">Exchange History</h4>
        <select onChange={onChangeSelect}>
          <option value="6">7 days</option>
          <option value="13">14 days</option>
          <option value="29">30 days</option>
        </select>
      </div>
      <div className="d-flex py-15">
        <table className="customTable">
          <thead>
            <tr>
              <th>Date</th>
              <th>Exchange Rate</th>
            </tr>
          </thead>
          <tbody>
            {exHistory.map((item) => (
              <tr key={item[0]}>
                <td>{item[0]}</td>
                <td>{parseInt(item[1][values.to.toUpperCase()]).toFixed(6)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="customTable">
          <thead>
            <tr>
              <th colSpan="2">Statistics</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lowest</td>
              <td>{min}</td>
            </tr>
            <tr>
              <td>Highest</td>
              <td>{max}</td>
            </tr>
            <tr>
              <td>Avrage</td>
              <td>{avg}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Statistics;
