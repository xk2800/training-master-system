<template>
  <b-container class="mt-4">
    <b-row class="justify-content-center my-5">
      <b-col
        v-if="type === 0"
        lg="4"
        sm="10"
      >
        <n-link class="text-decoration-none" to="/u/report/trainer-report">
          <b-card class="border-0 border-round shadow-sm mt-4 h-100">
            <b-card-title class="text-center">
              Report for Trainers
            </b-card-title>
            <b-card-body class="text-center">
              <b-img src="/trainer.png" fluid />
            </b-card-body>
          </b-card>
        </n-link>
      </b-col>
      <b-col
        v-if="type !== 2"
        lg="4"
        sm="10"
      >
        <n-link class="text-decoration-none" to="/u/report/trainee-report">
          <b-card class="border-0 border-round shadow-sm mt-4 h-100">
            <b-card-title class="text-center">
              Report for Trainees
            </b-card-title>
            <b-card-body class="text-center">
              <b-img src="/trainee.png" fluid />
            </b-card-body>
          </b-card>
        </n-link>
      </b-col>
      <b-col
        v-if="type === 2"
        lg="4"
        sm="10"
      >
        <n-link class="text-decoration-none" to="/u/report/my-performance">
          <b-card class="border-0 border-round shadow-sm mt-4 h-100">
            <b-card-title class="text-center">
              View My Performance
            </b-card-title>
            <b-card-body class="text-center">
              <b-img src="/my-performance.png" fluid />
            </b-card-body>
          </b-card>
        </n-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  middleware: 'authenticated',
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
