<template>
  <b-container class="mt-4">
    <Title class="my-3 bold">
      Give us your feedback!
    </Title>
    <feedback />
  </b-container>
</template>

<script>
import feedback from '~/components/feedback/feedback-board'

export default {
  middleware: 'authenticated',
  components: {
    feedback
  }
}
</script>

<style scoped>
body {
  background-color: rgb(247, 247, 247);
}
</style>
