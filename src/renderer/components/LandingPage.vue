<template>
  <div id="wrapper">
    <main>
      <h1>{{city}} <Clock :displaySeconds="true" /></h1>
      <article>
        <DayWeather :day="today" />
        <DayWeather :day="tomorrow" />
      </article>
    </main>
  </div>
</template>

<script>
import Clock from 'vue-digital-clock'

import { loadWeather } from '../services/meteo'
import DayWeather from './DayWeather'

export default {
  name: 'landing-page',
  components: {
    DayWeather,
    Clock,
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid white;
  margin: 10px 20px 0;
}

time {
  font-size: 18px;
}

article {
  display: flex;
  flex-direction: row;
}
</style>
