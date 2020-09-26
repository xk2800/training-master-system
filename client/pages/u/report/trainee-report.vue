<template>
  <b-container class="mt-4">
    <traineeReport />
  </b-container>
</template>

<script>
import traineeReport from '~/components/report/trainee-report'
export default {
  middleware: 'authenticated',
  components: {
    traineeReport
  }
}
</script>

<style scoped>
body {
  background-color: rgb(247, 247, 247);
}

</style>
