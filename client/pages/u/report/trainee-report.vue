<template>
  <b-container class="mt-4">
    <div v-if="type === 0">
      <traineeReport />
    </div>
    <div v-if="type === 1">
      <traineeReportTrainer />
    </div>
  </b-container>
</template>

<script>
import traineeReport from '~/components/report/trainee-report'
import traineeReportTrainer from '~/components/report/trainee-report-trainer'
export default {
  middleware: 'authenticated',
  components: {
    traineeReport,
    traineeReportTrainer
  },
  data () {
    return {
      type: this.$store.state.session.type
    }
  }
}
</script>

<style scoped>
body {
  background-color: rgb(247, 247, 247);
}

</style>
