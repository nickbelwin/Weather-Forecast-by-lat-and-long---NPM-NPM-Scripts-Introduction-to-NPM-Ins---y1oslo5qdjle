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


  return (
    <>
      <div id="root">
        <h1>Weather Forecast</h1>
        <form onSubmit={submitData}>
          <label for="latitude" >Latitude:
            <input onChange={(e) => { setLatitude(e.target.value); }} id="lati" type="number" value={latitude} className="latitude" /></label>
          <label for="longitude" >Longitude:
            <input onChange={(e) => { setLongitude(e.target.value); }} id="longi" type="number" value={longitude} className="longitude" /></label>
          <button type="submit">Get Forecast</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Temperature (°C)</th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            {weatherData?.map((val) => {
              return (
                <tr>
                  <td>{new Date(val.time).toLocaleString()}</td>
                  <td>{val.data.instant.details.air_temperature.toFixed(1)}</td>
                  <td>{val.data.next_1_hours.summary.symbol_code}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
