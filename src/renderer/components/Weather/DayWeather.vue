<template>
  <section>
    <h2>{{day.date}}</h2>
    <p class="temperatures">
      min {{day.temperatureMin}} C°<br />
      max {{day.temperatureMax}} C°
    </p>
    <img style="width: 100px;" :src="day.icon" />
  </section>
</template>

<script>
export default {
  name: 'day-weather',
  props: ['day']
}
</script>
