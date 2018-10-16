<template>
  <main id="app">
    <Carousel :perPage="1" :paginationEnabled="false">
      <Slide>
        <Weather />
      </Slide>
      <Slide>
        <Tasks />
      </Slide>
    </Carousel>
  </main>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import Weather from '@/components/Weather/Weather'
import Tasks from '@/components/Task/Tasks'

export default {
  name: 'HomeAssistant',
  components: {
    Carousel,
    Slide,
    Tasks,
    Weather
  }
}
</script>

<style>
body {
  margin: 0;
}

main {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: black;
}

* {
  color: white;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 500;
}
</style>
