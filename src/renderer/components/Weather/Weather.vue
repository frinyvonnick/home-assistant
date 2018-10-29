<template>
  <div id="wrapper">
    <!--<h1>{{city}} <Clock /></h1>-->
    <article>
      <TodayWeather :day="today" :city="city" />
      <TomorrowWeather :day="tomorrow" />
    </article>
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
article section {
  flex: 1;
  text-align: center;
}
</style>
