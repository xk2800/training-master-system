<template>
  <b-container class="mt-4">
    <Title class="my-3 bold">
      My Courses
    </Title>
    <b-button v-if="this.$store.state.session.type === 0" v-b-modal.addCourse variant="outline-primary" class="mt-1 mr-2">
      Add Course
    </b-button>
    <CoursePreview />
    <b-modal id="addCourse" title="Add Course" hide-footer>
      <addCourse />
    </b-modal>
  </b-container>
</template>

<script>
import CoursePreview from '~/components/course/course-preview'
import addCourse from '~/components/course/create-course'

export default {
  middleware: 'authenticated',
  components: {
    CoursePreview,
    addCourse
  }
}
</script>

<style scoped>
body {
  background-color: rgb(247, 247, 247);
}
</style>
