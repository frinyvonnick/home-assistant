<template>
  <div id="wrapper">
    <main>
      <h1>{{city}}</h1>
      <article>
        <section>
          <h2>{{today.date}}</h2>
          <p class="temperatures">
            {{today.temperatureMin}}°<br />
            {{today.temperatureMax}}°
          </p>
          <img style="width: 100px;" :src="today.icon" />
        </section>
        <section>
          <h2>{{tomorrow.date}}</h2>
          <p class="temperatures">
            {{tomorrow.temperatureMin}}°<br />
            {{tomorrow.temperatureMax}}°
          </p>
          <img style="width: 100px;" :src="tomorrow.icon" />
        </section>
      </article>
    </main>
  </div>
</template>

<script>
import { loadWeather } from '../services/meteo'

export default {
  name: 'landing-page',
  data: () => ({
    city: '',
    today: { icon: '' },
    tomorrow: { icon: '' },
  }),
  async mounted() {
    Object.assign(this.$data, await loadWeather())
  },
};
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
  font-family: "Roboto", sans-serif;
  font-weight: 300;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Roboto Condensed", sans-serif;
  font-weight: 500;
}

article {
  display: flex;
  flex-direction: row;
}

article section {
  flex: 1;
  text-align: center;
}

article section h2 {
  text-transform: capitalize;
}
</style>
