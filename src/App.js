import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./Menu";
import CurrencyConverter from "./CurrencyConverter";
import ViewHistory from "./ViewHistory";
import { v4 as uuidv4 } from "uuid";

const initialValues = {
  amount: "",
  from: "",
  to: "",
};

const calcDate = (n = 6) => {
  const newDate = Date.now() + -n * 24 * 3600 * 1000; // date 7 days ago in milliseconds UTC
  return new Date(newDate).toJSON().slice(0, 10);
};

function App() {
  const [values, setValues] = useState(initialValues);
  const [result, setResult] = useState(0);
  const [rate, setRate] = useState(0);
  const [startDate, setStartDate] = useState(calcDate());
  const [exHistory, setExHistory] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [avg, setAvg] = useState(0);
  const endDate = new Date().toJSON().slice(0, 10);
  const currentTime = new Date().toJSON().slice(11, 19);

  let axiosInstance = axios.create({
    baseURL: "https://api.exchangerate.host/",
  });

  const clearForm = () => {
    setValues(initialValues);
    setResult(0);
  };

  useEffect(() => {
    getRange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setResult(0);
  };

  const handleChangeValues = (e) => {
    e.preventDefault();
    const [from, to] = [values.to, values.from];
    setValues({ ...values, from, to });
    setResult(0);
    setStartDate(calcDate());
  };

  const onChangeSelect = (e) => {
    setStartDate(calcDate(+e.target.value));
  };

  const getRange = async (from, to, sDate, eDate) => {
    const [start_date, end_date, base, symbols] = [
      sDate ? sDate : startDate,
      eDate ? eDate : endDate,
      from ? from : values.from.toUpperCase(),
      to ? to : values.to.toUpperCase(),
    ];
    await axiosInstance
      .get(
        `timeseries?start_date=${start_date}&end_date=${end_date}&base=${base}&symbols=${symbols}`
      )
      .then((response) => {
        // handle success
        const objValues = Object.values(response.data.rates);
        const valueArr = [
          ...Object.values(objValues.map((item) => Number(item[symbols]))),
        ];
        setMin(Math.min(...valueArr).toFixed(6));
        setMax(Math.max(...valueArr).toFixed(6));
        setAvg(
          (valueArr.reduce((acc, crr) => acc + crr) / valueArr.length).toFixed(
            6
          )
        );
        setExHistory(Object.entries(response.data.rates).reverse());
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const getData = async () => {
    await axiosInstance
      .get(
        `convert?from=${values.from.toUpperCase()}&to=${values.to.toUpperCase()}&amount=${
          values.amount
        }`
      )
      .then((response) => {
        // handle success
        setResult(response.data.result);
        setRate(response.data.info.rate);
      })
      .then(() => {
        const session = localStorage.getItem("session")
          ? JSON.parse(localStorage.getItem("session"))
          : {
              data: [],
              state: true,
            };
        session.data.push({
          ...values,
          currentTime,
          endDate,
          startDate,
          id: uuidv4(),
        });

        localStorage.setItem("session", JSON.stringify(session));
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const getDataHistory = async (from, to, amount, eDate) => {
    await axiosInstance
      .get(`convert?from=${from}&to=${to}&amount=${amount}&date=${eDate}`)
      .then((res) => {
        setResult(res.data.result);
        setRate(res.data.info.rate);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const handleConvert = (e) => {
    e.preventDefault();
    getData();
    getRange();
  };

  const fetchHistory = (from, to, amount, sDate, eDate) => {
    setValues({ ...values, from, to, amount });
    setStartDate(sDate);
    getDataHistory(from.toUpperCase(), to.toUpperCase(), amount, eDate);
    getRange(from.toUpperCase(), to.toUpperCase(), sDate, eDate);
  };

  return (
    <div className="App">
      <Router>
        <Menu clearForm={clearForm} />
        <Routes>
          <Route
            path="/"
            element={
              <CurrencyConverter
                values={values}
                handleInputChange={handleInputChange}
                handleChangeValues={handleChangeValues}
                handleConvert={handleConvert}
                result={result}
                rate={rate}
                exHistory={exHistory}
                onChangeSelect={onChangeSelect}
                min={min}
                max={max}
                avg={avg}
              />
            }
          ></Route>
          <Route
            path="/history"
            element={<ViewHistory fetchHistory={fetchHistory} />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
