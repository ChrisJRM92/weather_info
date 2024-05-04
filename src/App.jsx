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

  function temp(params) {
    const tempK = params?.main.temp;
    const tempC = (tempK - 273.15).toFixed(1)
    const tempF = ((((tempK - 273.15)*(9))/5)+32).toFixed(1)
    
    const tempKMin = params?.main.temp_min;
    const tempCMin = (tempKMin - 273.15).toFixed(1)
    const tempFMin = ((((tempKMin- 273.15)*(9))/5)+32).toFixed(1) 

    const tempKMax = params?.main.temp_max;
    const tempCMax = (tempKMax- 273.15).toFixed(1)
    const tempFMax = ((((tempKMax - 273.15)*(9))/5)+32).toFixed(1)
    
    const tempKFL = params?.main.feels_like;
    const tempCFL = (tempKFL- 273.15).toFixed(1)
    const tempFFL = ((((tempKFL - 273.15)*(9))/5)+32).toFixed(1)

    const zone = params?.timezone;
    const hour = 3600;
    const GMT = zone/hour
    

    return {tempC, tempCMin, tempCMax, tempF, tempFMin, tempFMax, tempCFL, tempFFL, GMT}
  }
  
  const tempG = temp(weather)

  const [isCelsius, setisCelsius] = useState(true)

  const changeTemperature = () =>{
    setisCelsius(!isCelsius)
  }

  console.log(isCelsius)

  
  return (
    <>
      {/* --------Contenedor principal------------- */}
      <div className='container'>
        <div className='container_home'>
          <div className='container_home_icon'><img src={`https://openweathermap.org/img/wn/${weather?.weather['0'].icon}@4x.png`} alt="" /></div>
          <div className='container_home_temp'>
            <p className='home_temp_p1'>{isCelsius ? `${tempG.tempC}`:`${tempG.tempF}`}</p>
            <p className='home_temp_p2'>{isCelsius ? '°C': '°F'}</p>
          </div>
          {/* --------------------- */}
          <div className='container_home_temp_minmax'>
            <div className='container_home_temp_min'>
              <p className='tmin_title'>T. Mínima</p>
              <div className='tmin_container'>
                <p className='tmin_value'>{isCelsius ? `${tempG.tempCMin}`:`${tempG.tempFMin}`}</p>
                <p className='tmin_units'>{isCelsius ? '°C': '°F'}</p>
              </div>
            </div>
            {/* --------------------- */}
            <div className='container_home_temp_max'>
              <p className='tmax_title'>T. Máxima</p>
              <div className='tmax_container'>
                <p className='tmax_value'>{isCelsius ? `${tempG.tempCMax}`:`${tempG.tempFMax}`}</p>
                <p className='tmax_units'>{isCelsius ? '°C': '°F'}</p>
              </div>
            </div>
          </div>
          {/* --------------------- */}
          <div className='container_home_buttom'>
            <button className='buttom' onClick={changeTemperature}>{isCelsius ? `Cambiar a °F`:`Cambiar a °C`}</button>
          </div>
          <div className='container_home_hr'>
            <hr />
          </div>
          {/* --------------------- */}
          <div className='container_home_location'>
            <div className='home_location_image'></div>
            <div className='home_location_location'>
              <p className='home_location_title'>{weather?.name}</p>
              <p className='home_location_reg'>&nbsp;{weather?.sys.country}</p>
            </div>
          </div>
        </div>

        {/* -----------Contenedor secundario----------- */}
        <div className='container_info'>
          <div className='container_info_author'>
            <div className='title'>
              <p>Estado del clima</p>
            </div>
            <a className='author' href="https://christianromero.netlify.app/#home" target='_post' >
              <p className='nameAuthor'>Christian R. |&nbsp;</p>
              <div className='profile'></div>
            </a>
          </div>
          <div className='container_info_grid'>
            {/* -------Card 1------- */}
            <div className='container_info_grid_feels_like'>
              <div className='feels_like_title'>
                <h1>Confort</h1>
              </div>
              <div className='feels_like_contain'>
                <p className='feels_like_contain_p1'>{isCelsius ? `${tempG.tempCFL}`:`${tempG.tempFFL}`}</p>
                <p className='feels_like_contain_p2'>&nbsp;{isCelsius ? '°C': '°F'}</p>
              </div>
              <div className='feels_like_bottom'>
                <div className='feels_like_bottom_1'>
                  <p>
                  {(tempG.tempC < 0) ? "Muy frío" :
                    (tempG.tempC >= 0 && tempG.tempC < 10) ? "🥶" :
                    (tempG.tempC>= 10 && tempG.tempC < 20) ? "😌" :
                    (tempG.tempC >= 20 && tempG.tempC < 25) ? "🙂" :
                    (tempG.tempC>= 25 && tempG.tempC < 30) ? "😎" :
                    (tempG.tempC >= 30 && tempG.tempC < 35) ? "🥵" :
                    "🫠"}
                  </p>
                </div>
                <div className='feels_like_bottom_2'>
                  <h2 className='feels_like_bottom_2_description'>
                    {(tempG.tempC < 0) ? "Muy frío" :
                    (tempG.tempC >= 0 && tempG.tempC < 10) ? "El clima es frío" :
                    (tempG.tempC>= 10 && tempG.tempC < 20) ? "El clima es Fresco" :
                    (tempG.tempC >= 20 && tempG.tempC < 25) ? "El clima es confortable" :
                    (tempG.tempC>= 25 && tempG.tempC < 30) ? "El clima es cálido" :
                    (tempG.tempC >= 30 && tempG.tempC < 35) ? "El clima es caluroso" :
                    "El clima es sofocante"}
                  </h2>
                </div>
              </div>
            </div>

            {/* -------Card 2------- */}
            <div className='container_info_grid_humidity'>
              <div className='humidity_title'>
                <h1>Humedad</h1>
              </div>
              <div className='humidity_contain'>
                <p className='humidity_contain_p1'>{weather?.main.humidity}</p>
                <p className='humidity_contain_p2'>&nbsp;%</p>
              </div>
              <div className='humidity_bottom'>
                <div className='humidity_bottom_1'><i className="fa-solid fa-droplet"></i></div>
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
                <p className='pressure_contain_p1'>{weather?.main.pressure}</p>
                <p className='pressure_contain_p2'>&nbsp;hPa</p>
              </div>
              <div className='pressure_bottom'>
                <div className='pressure_bottom_1'><i className="fa-solid fa-ruler-vertical"></i></div>
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
                <p className='rain_contain_p1'>{weather?.rain['1h']}</p>
                <p className='rain_contain_p2'>&nbsp;mm/h</p>
              </div>
              <div className='rain_bottom'>
                <div className='rain_bottom_1'><i className="fa-solid fa-cloud-showers-heavy"></i></div>
                <div className='rain_bottom_2'>
                  <h2 className='rain_bottom_2_description'>Precipitación esperada</h2>
                </div>
              </div>
            </div>

            {/* -------Card 5------- */}
            <div className='container_info_grid_moderate_rain'>
              <div className='moderate_rain_title'>
                <h1>Zona actual</h1>
              </div>
              <div className='moderate_rain_contain'>
                <p className='moderate_rain_contain_p1'>GMT{tempG.GMT}</p>
                <p className='moderate_rain_contain_p2'></p>
              </div>
              <div className='moderate_rain_bottom'>
                <div className='moderate_rain_bottom_1'><i className="fa-solid fa-globe"></i></div>
                <div className='moderate_rain_bottom_2'>
                  <h2 className='moderate_rain_bottom_2_description'>Zona horaria actual</h2>
                </div>
              </div>
            </div>

            {/* -------Card 6------- */}
            <div className='container_info_grid_moderate_wind'>
              <div className='moderate_wind_title'>
              <h1>Viento</h1>
              </div>
              <div className='moderate_wind_contain'>
                <div className='moderate_wind_contain_data'>
                  <p className='wind_contain_data_p1'>{weather?.wind.speed}</p>
                  <p className='wind_contain_data_p2'>m/s</p>
                </div>
                <div className='moderate_wind_contain_generator'>
                  <div className="aero_container_1"></div>
                  <div className="aero_container_2">
                      <div className="img"></div>
                  </div>
                </div>
                
              </div>
              <div className='moderate_wind_bottom'>
                <div className='moderate_wind_bottom_1'><i className="fa-solid fa-wind"></i></div>
                <div className='moderate_wind_bottom_2'>
                  <h2 className='moderate_wind_bottom_2_description'>Velocidad del viento</h2>
                </div>
              </div>
            </div>
          </div>

          <div className='container_info_desing'>
            <p>Diseño UI/UX &nbsp;</p><a href="https://dribbble.com/mikhaltsov23" target='_post'>Dribbble - Anton Mihalcov&nbsp;</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
