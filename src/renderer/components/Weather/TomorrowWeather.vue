<template>
  <section class="tomorrow">
    <p>{{day.date}}</p>
    <img style="width: 75px;" :src="day.icon" />
    <ul class="temperatures">
      <li>{{day.temperatureMin}}°C</li>
      <li>{{day.temperatureMax}}°C</li>
    </ul>
  </section>
</template>

<script>
import Clock from 'vue-digital-clock'

export default {
  name: 'tomorrow-weather',
  components: {
    Clock
  },
  props: ['day', 'city']
}
</script>

<style>
.tomorrow {
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  margin: 1rem;
}

.temperatures {
  list-style: none;
  padding: 0;
}

.temperatures > li {
  display: inline-flex;
  font-weight: 400;
}

.temperatures > li:not(:last-child) {
  margin-right: 1rem;
}
</style>
