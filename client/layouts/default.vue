<template>
  <div class="body">
    <div class="background" />
    <Sidebar />
    <Nuxt />
  </div>
</template>

<script>
import Sidebar from '~/components/sidebar'

export default {
  components: {
    Sidebar
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');

.body {
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
}

.background {
  position: fixed;
  background-color: rgb(247, 247, 247);
  height: 100vh;
  width: 100vw;
  z-index: -100;
}

.border-round {
  border-radius: 25px;
}
</style>
