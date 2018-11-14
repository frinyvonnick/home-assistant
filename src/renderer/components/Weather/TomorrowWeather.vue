<template>
  <article class="tomorrow">
    <p>{{day.date}}</p>
    <img :src="day.icon" />
    <Temperatures :day="day" inline />
  </article>
</template>

<script>
import Temperatures from './Temperatures'
export default {
  name: 'tomorrow-weather',
  components: { Temperatures },
  props: ['day']
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
</style>
