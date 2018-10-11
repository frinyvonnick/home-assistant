<template>
  <section>
    <h2>{{day.date}}</h2>
    <img style="width: 100px;" :src="day.icon" />
    <p class="temperatures">
      {{day.temperatureMax}} °C<br />
      <span class="min">{{day.temperatureMin}} °C</span>
    </p>
  </section>
</template>

<script>
export default {
  name: 'day-weather',
  props: ['day']
}
</script>

<style>
section {
  flex: 1;
  text-align: center;
}

section h2 {
  text-transform: capitalize;
}

section p {
  margin: 0;
  font-size: 24px;
  line-height: 1.5em;
  font-weight: 400;
}

section .min {
  font-size: 18px;
  font-weight: 300;
}
</style>
