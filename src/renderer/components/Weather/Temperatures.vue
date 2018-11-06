<template>
  <ul v-bind:class="{ isInline }">
    <li>{{day.temperatureMin}}°C</li>
    <li><em>{{day.temperatureMax}}°C</em></li>
  </ul>
</template>

<script>
export default {
  name: 'temperatures',
  props: {
    day: Object,
    isInline: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  font-weight: 400;
}

ul > li {
  display: inline-flex;
  font-size: 1rem;
}

ul > li > em {
  font-size: 1.5rem;
  font-style: normal;
}

ul > li:not(:last-child) {
  margin-right: 1rem;
}

ul.isInline > li {
  font-size: 1rem;
}

ul.isInline > li > em {
  font-size: 1.2rem;
}
</style>
