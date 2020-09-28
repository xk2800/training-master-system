<template>
  <b-container class="mt-4">
    <Title class="my-3 bold">
      List of Courses
    </Title>
    <SearchCourse />
  </b-container>
</template>

<script>
import SearchCourse from '~/components/course/search-course'

export default {
  middleware: 'authenticated',
  components: {
    SearchCourse
  }
}
</script>

<style scoped>
body {
  background-color: rgb(247, 247, 247);
}
</style>
