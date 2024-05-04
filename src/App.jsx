import { useEffect, useState } from 'react'
import '../src/App.css'
import axios from 'axios'

function App() {

  const [coords, setcoords] = useState()
  const [weather, setweather] = useState()

  useEffect(() => {
    const success = pos => {
      setcoords({
        lat: pos.coords.latitude,
        long: pos.coords.longitude
      })
    }

    navigator.geolocation.getCurrentPosition(success)
  }, [])
  

  useEffect(() => {
    if (coords) {
      const apiKey = 'a41a27978c86360ce8bb31ef4a45d6bb'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&appid=${apiKey}`
      axios.get(url)
      .then(res => setweather(res.data))
      .catch(err => console.log(err))
    }
  }, [coords])

  console.log(weather)
  
  return (
    <>
      {/* --------Contenedor principal------------- */}
      <div className='container'>
        <div className='container_home'>
          <div className='container_home_icon'></div>
          <div className='container_home_temp'>
            <p className='home_temp_p1'>25.1</p>
            <p className='home_temp_p2'>°C</p>
          </div>
          {/* --------------------- */}
          <div className='container_home_temp_minmax'>
            <div className='container_home_temp_min'>
              <p className='tmin_title'>T. Mínima</p>
              <div className='tmin_container'>
                <p className='tmin_value'>18.1</p>
                <p className='tmin_units'>°C</p>
              </div>
            </div>
            {/* --------------------- */}
            <div className='container_home_temp_max'>
              <p className='tmax_title'>T. Máxima</p>
              <div className='tmax_container'>
                <p className='tmax_value'>25.1</p>
                <p className='tmax_units'>°C</p>
              </div>
            </div>
          </div>
          {/* --------------------- */}
          <div className='container_home_buttom'>
            <button className='buttom'>Cambiar a °F</button>
          </div>
          <div className='container_home_hr'>
            <hr />
          </div>
          {/* --------------------- */}
          <div className='container_home_location'>
            <div className='home_location_image'></div>
            <div className='home_location_location'>
              <p className='home_location_title'>Yanacocha,</p>
              <p className='home_location_reg'>&nbsp;EC</p>
            </div>
          </div>
        </div>

        {/* -----------Contenedor secundario----------- */}
        <div className='container_info'>
          <div className='container_info_author'>
            <div className='title'>
              <p>Estado del clima</p>
            </div>
            <div className='author'>
              ---
            </div>
          </div>
          <div className='container_info_grid'>
            {/* -------Card 1------- */}
            <div className='container_info_grid_feels_like'>
              <div className='feels_like_title'>
                <h1>Confort</h1>
              </div>
              <div className='feels_like_contain'>
                <p className='feels_like_contain_p1'>20.5</p>
                <p className='feels_like_contain_p2'>&nbsp;°C</p>
              </div>
              <div className='feels_like_bottom'>
                <div className='feels_like_bottom_1'>
                  <p>🙂</p>
                </div>
                <div className='feels_like_bottom_2'>
                  <h2 className='feels_like_bottom_2_description'>Temperatura confortable</h2>
                </div>
              </div>
            </div>

            {/* -------Card 2------- */}
            <div className='container_info_grid_humidity'>
              <div className='humidity_title'>
                <h1>Humedad</h1>
              </div>
              <div className='humidity_contain'>
                <p className='humidity_contain_p1'>78</p>
                <p className='humidity_contain_p2'>&nbsp;%</p>
              </div>
              <div className='humidity_bottom'>
                <div className='humidity_bottom_1'><i class="fa-solid fa-droplet"></i></div>
                <div className='humidity_bottom_2'>
                  <h2 className='humidity_bottom_2_description'>Humedad Relativa</h2>
                </div>
              </div>
            </div>

            {/* -------Card 3------- */}
            <div className='container_info_grid_pressure'>
              <div className='pressure_title'>
                <h1>Presión</h1>
              </div>
              <div className='pressure_contain'>
                <p className='pressure_contain_p1'>101.5</p>
                <p className='pressure_contain_p2'>&nbsp;hPa</p>
              </div>
              <div className='pressure_bottom'>
                <div className='pressure_bottom_1'><i class="fa-solid fa-ruler-vertical"></i></div>
                <div className='pressure_bottom_2'>
                  <h2 className='pressure_bottom_2_description'>Presión Atmosferica</h2>
                </div>
              </div>
            </div>

            {/* -------Card 4------- */}
            <div className='container_info_grid_rain'>
              <div className='rain_title'>
                <h1>Precipitación</h1>
              </div>
              <div className='rain_contain'>
                <p className='rain_contain_p1'>0.72</p>
                <p className='rain_contain_p2'>&nbsp;mm/h</p>
              </div>
              <div className='rain_bottom'>
                <div className='rain_bottom_1'><i class="fa-solid fa-cloud-showers-heavy"></i></div>
                <div className='rain_bottom_2'>
                  <h2 className='rain_bottom_2_description'>Precipitación esperada</h2>
                </div>
              </div>
            </div>

            {/* -------Card 5------- */}
            <div className='container_info_grid_moderate_rain'>
              <div className='moderate_rain_title'>
                <h1>Estado</h1>
              </div>
              <div className='moderate_rain_contain'>
                <p className='moderate_rain_contain_p1'>lluvia ligera</p>
                {/* <p className='moderate_rain_contain_p2'></p> */}
              </div>
              <div className='moderate_rain_bottom'>
                <div className='moderate_rain_bottom_1'><i class="fa-solid fa-sign-hanging"></i></div>
                <div className='moderate_rain_bottom_2'>
                  <h2 className='moderate_rain_bottom_2_description'>Estado Actual</h2>
                </div>
              </div>
            </div>

            {/* -------Card 6------- */}
            <div className='container_info_grid_moderate_wind'>
              <div className='moderate_wind_title'>
              <h1>Viento</h1>
              </div>
              <div className='moderate_wind_contain'>
                <p>1.04 m/s</p>
              </div>
              <div className='moderate_wind_bottom'>
                <div className='moderate_wind_bottom_1'><i class="fa-solid fa-wind"></i></div>
                <div className='moderate_wind_bottom_2'>
                  <h2 className='moderate_wind_bottom_2_description'>Velocidad del viento</h2>
                </div>
              </div>
            </div>
          </div>

          <div className='container_info_desing'></div>
        </div>
      </div>
      {/* <h1>Clima actual</h1>
      <h2>{weather.name} {weather.sys.country}</h2>
      <img src="" alt="" />
      <h3>estado</h3>
      <p>velocidad del viento</p><p>0.00</p><p>m/s</p>
      <p>nubes</p><p>00</p><p>%</p>
      <p>presion</p><p>0000</p><p>hPa</p>
      <h2>00.0</h2><p>hpa</p> */}
    </>
  )
}

export default App
