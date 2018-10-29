<template>
  <article class="today">
    <h1>{{day.date}}</h1>
    <img :src="day.icon" />
    <ul>
      <li>{{day.temperatureMin}}°C</li>
      <li>{{day.temperatureMax}}°C</li>
    </ul>
  </article>
</template>

<script>
import Clock from 'vue-digital-clock'

export default {
  name: 'today-weather',
  components: {
    Clock
  },
  props: ['day', 'city']
}
</script>

<style>
.today {
  margin-top: 1rem;
  text-align: center;
}

.today > img {
  height: 125px;
  width: 125px;
}
</style>
