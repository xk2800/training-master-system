<template>
  <b-container class="mt-4">
    <myReport />
  </b-container>
</template>

<script>
import myReport from '~/components/report/performance-report'
export default {
  middleware: 'authenticated',
  components: {
    myReport
  }
}
</script>

<style scoped>
body {
  background-color: rgb(247, 247, 247);
}

</style>
