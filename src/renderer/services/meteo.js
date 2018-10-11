import { isToday, format, addDays } from 'date-fns'
import frLocale from 'date-fns/locale/fr'
import { countBy, flatten, transform } from 'lodash'
import path from 'path'

const { CITY_CODE, WEATHER_API_KEY } = process.env

const mapIcon = key =>
  ({
    8: 'day',
    2: 'thunder',
    3: 'rainy',
    5: 'rainy',
    6: 'snowy',
    7: 'cloudy',
    9: 'cloudy'
  }[key] || 'day')

export async function loadWeather() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?id=${CITY_CODE}&units=metric&appid=${WEATHER_API_KEY}`
  )
  if (!response.ok) throw Error('Invalid server response', response)

  const data = await response.json()
  const today = new Date()

  return {
    city: data.city.name,
    today: parse(today, data),
    tomorrow: parse(addDays(today, 1), data)
  }
}

function parse(date, data) {
  const { format: formatNumber } = new Intl.NumberFormat('fr-FR', { maximumSignificantDigits: 3 })

  return {
    icon: path.join(__dirname, '..', `assets/${mapIcon(getWeatherFor(data.list, isToday))}.svg`),
    temperatureMax: formatNumber(getMaxTemperature(data.list, isToday)),
    temperatureMin: formatNumber(getMinTemperature(data.list, isToday)),
    date: format(date, 'dddd D/M', { locale: frLocale }),
  }
}

function getMaxTemperature(data, fn) {
  return Math.max(
    ...flatten(
      data
        .filter(item => fn(new Date(item.dt_txt)))
        .map(item => Number(item.main.temp_max))
    )
  )
}

function getMinTemperature(data, fn) {
  return Math.min(
    ...flatten(
      data
        .filter(item => fn(new Date(item.dt_txt)))
        .map(item => Number(item.main.temp_min))
    )
  )
}

function getWeatherFor(data, fn) {
  return transform(
    countBy(
      flatten(
        data.filter(item => fn(new Date(item.dt_txt))).map(item => item.weather)
      ).map(item => {
        const id = `${item.id}`.substr(0, 1)
        if (id === 8 && item.id > 800) return 9
        return id
      })
    ),
    (result, value, key) => {
      if (value > result.value) {
        return { key, value }
      }
      return result
    },
    { key: 8, value: 0 }
  ).key
}
