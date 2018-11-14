<template>
  <div id="wrapper">
    <section>
      <header>
        <p>{{city}}</p>
        <Clock />
      </header>
      <TodayWeather :day="today" :city="city" />
      <TomorrowWeather :day="tomorrow" />
    </section>
  </div>
</template>

<script>
import Clock from 'vue-digital-clock'
import { loadWeather } from '@/services/meteo'
import TodayWeather from './TodayWeather'
import TomorrowWeather from './TomorrowWeather'

export default {
  name: 'weather',
  components: {
    TodayWeather,
    TomorrowWeather,
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
  font-size: 2rem;
  margin: 0;
  text-transform: capitalize;
}

header {
  display: flex;
  font-weight: 300;
  justify-content: space-between;
  margin: 1rem 1rem 0;
}

header > p {
  font-size: 1.3rem;
  margin: 0;
}

.clock {
  font-size: 1.3rem;
}
</style>
