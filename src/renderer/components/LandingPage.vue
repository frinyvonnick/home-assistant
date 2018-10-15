<template>
  <div id="wrapper">
    <h1>{{city}} <Clock /></h1>
    <article>
      <DayWeather :day="today" />
      <DayWeather :day="tomorrow" />
    </article>
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
    Clock
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
h1 {
  text-align: center;
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
