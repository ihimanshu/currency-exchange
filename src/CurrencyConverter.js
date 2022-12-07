import Statistics from "./Statistics";
import Result from "./Result";
import Inputs from "./Inputs";

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
      <Inputs
        values={values}
        handleInputChange={handleInputChange}
        handleChangeValues={handleChangeValues}
        handleConvert={handleConvert}
      />
      {result ? (
        <>
          <Result values={values} result={result} rate={rate} />
          <hr className="my-30" />
          <Statistics
            exHistory={exHistory}
            values={values}
            min={min}
            max={max}
            avg={avg}
            onChangeSelect={onChangeSelect}
          />
        </>
      ) : null}
    </section>
  );
};

export default CurrencyConverter;
