import axios from "axios";

let axiosInstance = axios.create({
  baseURL: "https://api.exchangerate.host/",
});

export const getData = async function (from, to, amount, date) {
  let response = await axiosInstance.get(
    `convert?from=${from}&to=${to}&amount=${amount}&date=${date}`
  );

  return response.data;
};

// export const getRange = async function (from, to, sDate, eDate) {
//   let response = await axiosInstance.get(
//     `timeseries?start_date=${sDate}&end_date=${eDate}&base=${from}&symbols=${to}`
//   );

//   return response.data;
// };
