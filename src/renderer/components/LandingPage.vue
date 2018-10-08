<template>
  <div id="wrapper">
    <main>
      <h1>Météo</h1>
      <article>
        <section>
          <h2>Aujourd'hui {{today.temperature }}°</h2>
          <img style="width: 100px;" :src="today.icon" />
        </section>
        <section>
          <h2>Demain {{ tomorrow.temperature }}°</h2>
          <img style="width: 100px;" :src="tomorrow.icon" />
        </section>
      </article>
    </main>
  </div>
</template>

<script>
import { isToday, isTomorrow } from 'date-fns'
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

export default {
  name: 'landing-page',
  data: () => ({ today: { icon: '' }, tomorrow: { icon: '' } }),
  async mounted() {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=6434507&units=metric&appid=${process.env.WEATHER_API_KEY}`, { method: 'GET' })
    const data = await res.json()

    this.today.icon = path.join(__dirname, '..', `assets/${mapIcon(getWeatherFor(data.list, isToday))}.svg`)
    this.today.temperature = getMaxTemperature(data.list, isToday)

    this.tomorrow.icon = path.join(__dirname, '..', `assets/${mapIcon(getWeatherFor(data.list, isTomorrow))}.svg`)
    this.tomorrow.temperature = getMaxTemperature(data.list, isTomorrow)
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

  h1, h2 {
    color: white;
  }

  article {
    display: flex;
    flex-direction: row;
  }

  article section {
    flex: 1;
  }
</style>
