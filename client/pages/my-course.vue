<template>
  <b-container class="mt-4">
    <Title class="my-3 bold">
      My Courses
    </Title>
    <Coursepreview />
  </b-container>
</template>

<script>
import Coursepreview from '~/components/course/course-preview'

export default {
  components: {
    Coursepreview
  }
}
</script>

<style>
body {
  background-color: rgb(247, 247, 247);
}
</style>
