<template>
  <article class="tomorrow">
    <p>{{day.date}}</p>
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
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}

.tomorrow > img {
  width: 50px;
}

.tomorrow > ul > li {
  font-size: 1rem;
}
</style>
