<template>
  <p class="title">
    <slot />
  </p>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style scoped>
@media screen and (min-width: 601px) {
  .title {
    font-size: 2rem;
  }
}

@media screen and (max-width: 600px) {
  .title {
    font-size: 1.5rem;
  }
}
</style>
