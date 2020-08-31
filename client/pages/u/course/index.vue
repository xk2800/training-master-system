<template>
  <b-container class="mt-4">
    <Title class="my-3 bold">
      My Courses
    </Title>
    <CoursePreview />
  </b-container>
</template>

<script>
import CoursePreview from '~/components/course/course-preview'

export default {
  middleware: 'authenticated',
  components: {
    CoursePreview
  }
}
</script>

<style scoped>
body {
  background-color: rgb(247, 247, 247);
}
</style>
