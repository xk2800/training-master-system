<template>
  <div class="body">
    <div class="background" />
    <Nuxt />
  </div>
</template>

<script>

export default {

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');

.body {
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
}

.background {
  position: fixed;
  background-color: rgb(69, 177, 247);
  height: 100vh;
  width: 100vw;
  z-index: -100;
}

.border-round {
  border-radius: 25px;
}
</style>
