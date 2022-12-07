// import Statistics from "./Statistics";

const CurrencyConverter = ({
  values,
  handleInputChange,
  handleChangeValues,
  handleConvert,
  result,
  rate,
  exHistory,
  onChangeSelect,
  min,
  max,
  avg,
}) => {
  return (
    <section className="wrapper">
      <h1 className="my-20">I want to convert</h1>
      <form>
        <div className="mb-10 input-box">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="text"
            name="amount"
            value={values.amount}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-10 input-box">
          <label htmlFor="from">From</label>
          <input
            id="from"
            type="text"
            name="from"
            value={values.from}
            onChange={handleInputChange}
            className="width-100"
          />
        </div>
        <div className="mb-10 input-box text-center">
          <button onClick={handleChangeValues} className="btn white-btn">
            <span className="material-icons">compare_arrows</span>
          </button>
        </div>
        <div className="mb-10 input-box">
          <label htmlFor="from">To</label>
          <input
            id="to"
            type="text"
            name="to"
            value={values.to}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-10 input-box">
          <button onClick={handleConvert} className="btn green-btn">
            Convert
          </button>
        </div>
      </form>
      {result ? (
        <>
          <div className="text-center">
            <div className="text-transform font-size-48 my-20">
              {values.amount} {values.from} =
              <span className="color-accent">
                {" "}
                {result.toFixed(3).toString().replace(".", ",")} {values.to}
              </span>
            </div>
            <div className="text-transform">
              1 {values.from} = {rate.toFixed(6)} {values.to}
            </div>
            <div className="text-transform">
              1 {values.to} = {(1 / rate).toFixed(6)} {values.from}
            </div>
          </div>
          <hr className="my-30" />
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
                    <td>{item[1][values.to.toUpperCase()].toFixed(6)}</td>
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
      ) : null}
    </section>
  );
};

export default CurrencyConverter;
