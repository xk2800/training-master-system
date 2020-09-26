<template>
  <b-container class="mt-4">
    <trainerReport />
  </b-container>
</template>

<script>
import trainerReport from '~/components/report/trainer-report'
export default {
  middleware: 'authenticated',
  components: {
    trainerReport
  }
}
</script>

<style scoped>
body {
  background-color: rgb(247, 247, 247);
}

</style>
