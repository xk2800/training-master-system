<template>
  <b-card class="border-round border-0 shadow-sm mt-3">
    <b-row>
      <b-col lg="8">
        <b-card-title>{{ courseTitle }}</b-card-title>
        <b-card-sub-title>{{ courseTrainer }}</b-card-sub-title>
        <b-card-text class="mt-2">
          {{ courseDesc }}
        </b-card-text>
      </b-col>
      <b-col lg="4" class="mt-4 text-center">
        <b-button variant="outline-info" href="#">
          View Course Information
        </b-button>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  data () {
    return {
      courseTitle: 'Course 1',
      courseTrainer: 'Trainer 1',
      courseDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      courseHref: ''
    }
  }
}
</script>

<style>

</style>
