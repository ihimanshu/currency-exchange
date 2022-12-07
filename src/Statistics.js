const Statistics = ({ exHistory, values, min, max, avg }) => {
  return (
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
              <td>{item[1][values.to.toUpperCase()]}</td>
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
  );
};

export default Statistics;
