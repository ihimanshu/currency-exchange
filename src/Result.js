const Result = ({ values, result, rate }) => {
  return (
    <div className="text-center">
      <div className="text-transform font-size-48 my-20">
        {values.amount} {values.from} =
        <span className="color-accent">
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
  );
};

export default Result;
