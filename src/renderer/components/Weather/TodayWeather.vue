<template>
  <section>
    <header>
      <p>{{day.date}}</p>
      <Clock />
    </header>
    <img style="width: 200px;" :src="day.icon" />
    <h1>{{city}}</h1>
    <ul class="temperatures">
      <li>{{day.temperatureMin}}°C</li>
      <li>{{day.temperatureMax}}°C</li>
    </ul>
  </section>
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
h1 {
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
  margin-top: 0;
}

header > p {
  font-size: 1.3rem;
  font-weight: 200;
  margin: 0;
  text-transform: capitalize;
}

header {
  display: flex;
  justify-content: space-between;
  margin: 1rem 1rem 0;
}

.clock {
  font-size: 1.3rem;
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
