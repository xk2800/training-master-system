<template>
  <b-container>
    <div class="mt-5">
      <Coursedetail />
    </div>
  </b-container>
</template>

<script>
import Coursedetail from '~/components/course/course-detail'

export default {
  components: {
    Coursedetail
  }
}
</script>

<style scoped>
body {
  background-color: rgb(247, 247, 247);
}
</style>
