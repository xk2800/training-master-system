<template>
  <div>
    <input v-model="searchQuery" class="form-control border-round" type="text" placeholder="Search" aria-label="Search">
    <div v-if="!searchQuery" class="mt-4">
      <Coursepreview />
    </div>
    <div v-else>
      <b-card
        v-for="(course, i) in courses"
        :key="`course-${i}`"
        class="border-round border-0 shadow-sm mt-3"
      >
        <b-row>
          <b-col lg="8">
            <b-card-title>{{ course.title }}</b-card-title>
            <b-card-sub-title>Trainer: {{ course.name }} Duration: {{ course.duration }} month(s) Status: {{ course.status }}</b-card-sub-title>
            <b-card-text class="mt-2">
              {{ course.desc }}
            </b-card-text>
          </b-col>
          <b-col lg="4" class="mt-4 text-center">
            <b-button variant="outline-info" @click="selectedCourse(course, i); $bvModal.show('ViewCourse');">
              View Course Information
            </b-button>
          </b-col>
        </b-row>
      </b-card>
    </div>
    <b-modal
      v-if="currentCourse"
      id="ViewCourse"
      :title="currentCourse.title"
      size="lg"
      centered
      hide-footer
    >
      <courseDetail :selected-course="currentCourse" />
    </b-modal>
  </div>
</template>

<script>
import Coursepreview from '~/components/course/course-preview'
import courseDetail from '~/components/course/course-detail'

export default {
  components: {
    Coursepreview,
    courseDetail
  },
  data () {
    return {
      searchQuery: '',
      courses: [],
      currentCourse: null,
      currentIndex: ''
    }
  },
  watch: {
    async searchQuery (searchQuery) {
      if (!searchQuery) {
        this.courses = []
        return
      }
      const { data } = await this.$axios.get('/search', {
        params: {
          token: this.$store.state.session.token,
          searchName: searchQuery.toLowerCase()
        }
      })
      this.courses = data.courses
    }
  },
  methods: {
    selectedCourse (course, i) {
      this.currentCourse = course
      this.currentIndex = i
    }
  }
}
</script>

<style>

</style>
