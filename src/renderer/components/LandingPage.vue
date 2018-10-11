<template>
  <div id="wrapper">
    <main>
      <h1>{{city}}</h1>
      <article>
        <DayWeather :day="today" />
        <DayWeather :day="tomorrow" />
      </article>
    </main>
  </div>
</template>

<script>
import { loadWeather } from '../services/meteo'
import DayWeather from './DayWeather'

export default {
  name: 'landing-page',
  components: {
    DayWeather
  },
  data: () => ({
    city: '',
    today: { icon: '' },
    tomorrow: { icon: '' }
  }),
  async mounted() {
    Object.assign(this.$data, await loadWeather())
  }
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
  box-sizing: border-box;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 500;
}

h1 {
  text-align: center;
  margin: 10px 0;
}

article {
  display: flex;
  flex-direction: row;
}
</style>
