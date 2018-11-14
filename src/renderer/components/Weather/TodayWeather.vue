<template>
  <article class="today">
    <h1>{{day.date}}</h1>
    <img :src="day.icon" />
    <Temperatures :day="day" />
  </article>
</template>

<script>
import Temperatures from './Temperatures'

export default {
  name: 'today-weather',
  components: { Temperatures },
  props: ['day']
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
