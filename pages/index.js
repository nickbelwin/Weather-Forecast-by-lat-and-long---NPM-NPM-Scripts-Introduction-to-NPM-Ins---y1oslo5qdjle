import { useState } from "react";

export default function Home() {
  const [weatherData, setWeatherData] = useState([]);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const getWeatherData = async () => {
    try {
      let response = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`);
      let jsonResponse = await response.json();
      setWeatherData(jsonResponse.properties.timeseries.slice(0, 30));
    } catch (error) {
      alert(error);
    }
  }
  const submitData = (e) => {
    e.preventDefault();
    getWeatherData();
  }
  const updateData = (e) => {
    if (e.target.id === "lati") {
      setLatitude(e.target.value);
    }
    else if (e.target.id === "longi") {
      setLongitude(e.target.value)
    }
  }


  return (
    <>
      <div id="root">
        <h1>Weather Forecast</h1>
        <form onSubmit={submitData}>
          <label for="latitude" >Latitude:</label>
          <input onChange={updateData} id="lati" type="number" name="latitude" className="latitude" />
          <label for="longitude" >Longitude:</label>
          <input onChange={updateData} id="longi" type="number" name="longitude" className="longitude" />
          <button type="submit">Get Forecast</button>
        </form>
        <table>
          <tr>
            <th>Time</th>
            <th>Temperature (°C)</th>
            <th>Summary</th>
          </tr>
          {weatherData?.map((val) => {
            return (
              <tr>
                <td>{val.time.toLocaleString()}</td>
                <td>{val.data.instant.details.air_temperature}</td>
                <td>{val.data.next_12_hours.summary.symbol_code}</td>
              </tr>
            )
          })}
        </table>
      </div>
    </>
  );
}
