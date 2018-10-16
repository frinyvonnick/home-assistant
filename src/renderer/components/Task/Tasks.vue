<template>
  <div class="container">
    <article class="task" v-for="task in tasks" :key="task.id">
      <span class="label">{{ task.label }}</span>
      <svg class="icon" viewBox="0 40 75 75">
        <circle cx="30" cy="75" r="20" stroke="red" fill="transparent" stroke-width="15"/>
      </svg>
    </article>
  </div>
</template>

<script>
import { getTasks } from '@/services/task'

export default {
  data: () => ({
    tasks: getTasks()
  })
}
</script>

<style scoped>
.container {
  max-height: 100vh;
  overflow-y: auto;
}

.task {
  display: flex;
  padding: 20px;
}

.task .label {
  flex: 1;
}

.task .icon {
  height: 20px;
  width: 20px;
}
</style>
