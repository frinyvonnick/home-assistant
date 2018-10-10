<template>
  <div id="wrapper">
    <main>
      <h1>{{city}}</h1>
      <article>
        <section>
          <h2>{{today.date}}</h2>
          <p class="temperatures">
            {{today.temperatureMin}}°<br />
            {{today.temperatureMax}}°
          </p>
          <img style="width: 100px;" :src="today.icon" />
        </section>
        <section>
          <h2>{{tomorrow.date}}</h2>
          <p class="temperatures">
            {{tomorrow.temperatureMin}}°<br />
            {{tomorrow.temperatureMax}}°
          </p>
          <img style="width: 100px;" :src="tomorrow.icon" />
        </section>
      </article>
    </main>
  </div>
</template>

<script>
import { isToday, isTomorrow, format, addDays } from 'date-fns'
import frLocale from 'date-fns/locale/fr'
import { countBy, flatten, transform } from 'lodash'
import path from 'path'

const getWeatherFor = (data, fn) => transform(
  countBy(flatten(data.filter(item => fn(new Date(item.dt_txt)))
    .map(item => item.weather))
    .map((item) => {
      const id = `${item.id}`.substr(0, 1)
      if (id === 8 && item.id > 800) return 9
      return id
    })),
  (result, value, key) => {
    if (value > result.value) {
      return { key, value }
    }
    return result
  },
  { key: 8, value: 0 },
).key

const mapIcon = key => ({
  8: 'day',
  2: 'thunder',
  3: 'rainy',
  5: 'rainy',
  6: 'snowy',
  7: 'cloudy',
  9: 'cloudy',
})[key] || 'day'

// eslint-disable-next-line
const getMaxTemperature = (data, fn) => {
  return Math.max(...flatten(data.filter(item => fn(new Date(item.dt_txt)))
    .map(item => Number(item.main.temp_max))))
}

// eslint-disable-next-line
const getMinTemperature = (data, fn) => {
  return Math.min(...flatten(data.filter(item => fn(new Date(item.dt_txt)))
    .map(item => Number(item.main.temp_min))))
}

export default {
  name: 'landing-page',
  data: () => ({ today: { icon: '' }, tomorrow: { icon: '' }, city: '' }),
  async mounted() {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${process.env.CITY_CODE}&units=metric&appid=${process.env.WEATHER_API_KEY}`, { method: 'GET' })
    const data = await res.json()
    console.log(data)

    this.city = data.city.name
    const today = new Date()

    this.today.icon = path.join(__dirname, '..', `assets/${mapIcon(getWeatherFor(data.list, isToday))}.svg`)
    this.today.temperatureMax = getMaxTemperature(data.list, isToday)
    this.today.temperatureMin = getMinTemperature(data.list, isToday)
    this.today.date = format(today, 'dddd D', { locale: frLocale })

    this.tomorrow.icon = path.join(__dirname, '..', `assets/${mapIcon(getWeatherFor(data.list, isTomorrow))}.svg`)
    this.tomorrow.temperatureMax = getMaxTemperature(data.list, isTomorrow)
    this.tomorrow.temperatureMin = getMinTemperature(data.list, isTomorrow)
    this.tomorrow.date = format(addDays(today, 1), 'dddd D', { locale: frLocale })
  },
  methods: {
  },
}
</script>

<style>
  body {
    margin: 0;
  }

  main {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: black;
  }

  * {
    color: white;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 500;
  }

  article {
    display: flex;
    flex-direction: row;
  }

  article section {
    flex: 1;
    text-align: center;
  }

  article section h2 {
    text-transform: capitalize;
  }
</style>
