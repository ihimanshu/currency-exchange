const Inputs = ({
  values,
  handleInputChange,
  handleChangeValues,
  handleConvert,
}) => {
  return (
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
  );
};

export default Inputs;
