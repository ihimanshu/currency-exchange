import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ViewHistory = ({ fetchHistory }) => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const goToHomePage = () => navigate("/");

  useEffect(() => {
    const restoredSession = JSON.parse(localStorage.getItem("session"));
    setData(restoredSession?.data);
  }, []);

  const handleDelete = (id) => {
    return () => {
      let session = JSON.parse(localStorage.getItem("session"));
      session = {
        ...session,
        data: session.data.filter((item) => item.id !== id),
      };
      localStorage.setItem("session", JSON.stringify(session));
      const restoredSession = JSON.parse(localStorage.getItem("session"));
      setData(restoredSession?.data);
    };
  };
  return (
    <section className="wrapper">
      <h1 className="my-20">Convertion history</h1>
      <table className="customTable my-20">
        <thead>
          <tr>
            <th>Date</th>
            <th>Event</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.length ? (
            data.map(
              ({ amount, currentTime, endDate, from, to, id, startDate }) => (
                <tr key={id}>
                  <td>
                    {new Date(endDate).toLocaleDateString("en-GB")} @{" "}
                    {currentTime}
                  </td>
                  <td>
                    Converted an amount of {amount} from {from.toUpperCase()} to{" "}
                    {to.toUpperCase()}
                  </td>
                  <td>
                    <p className="d-flex hover-diplay">
                      <button
                        className="btn white-btn"
                        onClick={() => {
                          goToHomePage();
                          fetchHistory(from, to, amount, startDate, endDate);
                        }}
                      >
                        <span className="material-icons">remove_red_eye</span>
                        <span className="span-text">View</span>
                      </button>
                      <button
                        className="btn red-btn"
                        onClick={handleDelete(id)}
                      >
                        <span className="material-icons">delete_forever</span>
                        <span className="span-text">Delete from history</span>
                      </button>
                    </p>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No convertion history data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default ViewHistory;
