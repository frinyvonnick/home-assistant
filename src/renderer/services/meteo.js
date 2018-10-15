import { isToday, isTomorrow, format, addDays } from 'date-fns'
import { day, thunder, rainy, cloudy, snowy } from '@/services/meteo-icons'

import frLocale from 'date-fns/locale/fr'
import { countBy, flatten, transform } from 'lodash'

const { CITY_CODE, WEATHER_API_KEY } = process.env

const mapIcon = key =>
  ({
    8: day,
    2: thunder,
    3: rainy,
    5: rainy,
    6: snowy,
    7: cloudy,
    9: cloudy
  }[key] || day)

export async function loadWeather() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?id=${CITY_CODE}&units=metric&appid=${WEATHER_API_KEY}`
  )
  if (!response.ok) throw Error('Invalid server response', response)

  const data = await response.json()
  const today = new Date()

  return {
    city: data.city.name,
    today: parse(today, data, isToday),
    tomorrow: parse(addDays(today, 1), data, isTomorrow)
  }
}

function parse(date, data, checkDayFn) {
  return {
    icon: mapIcon(getWeatherFor(data.list, checkDayFn)),
    temperatureMax: getMaxTemperature(data.list, checkDayFn),
    temperatureMin: getMinTemperature(data.list, checkDayFn),
    date: format(date, 'dddd D', { locale: frLocale })
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

export function getWeatherFor(data, fn) {
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
