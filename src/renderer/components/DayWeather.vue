<template>
  <section>
    <h2>{{day.date}}</h2>
    <img style="width: 100px;" :src="day.icon" />
    <p class="temperatures">
      {{day.temperatureMin}} °C<br />
      {{day.temperatureMax}} °C
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
</style>
