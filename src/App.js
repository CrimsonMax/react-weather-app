import { useState } from "react"

const api = {
  key: '31616a28ad6a1d7c3d05c32a36fc582a',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = e => {
    if (e.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('')
        })
    }
  }

  const dateBuilder = d => {
    const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"]
    const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main !== 'undefined') ?
        ((weather.main.temp > 15) ? 'app warm' : 'app')
        : 'app main'
    }>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Поиск..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main !== "undefined") ? (
          <>
            <div className="location-container">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-container">
              <div className="temperature">{Math.round(weather.main.temp)}°c</div>
              <div className="condition">{weather.weather[0].main}</div>
            </div>
          </>
        ) : (
          <>
            <div className="message-container">
              <div className="location">Выбери свой город</div>
            </div>
          </>
        )}

      </main>
    </div>
  );
}

export default App;
