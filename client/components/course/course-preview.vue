<template>
  <div>
    <b-card
      class="border-round border-0 shadow-sm mt-3"
      v-for="(course, i) in courses"
      :key="`course-${i}`"
    >
      <b-row>
        <b-col lg="8">
          <b-card-title>{{ course.title }}</b-card-title>
          <b-card-sub-title>{{ course.name }}</b-card-sub-title>
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
    <b-modal
        v-if="currentCourse"
        id="ViewCourse"
        :title="currentCourse.title"
        centered
        hide-footer
        @hidden="getCourses"
      >
        <courseDetail :selected-course="currentCourse" />
      </b-modal>
  </div>
</template>

<script>
import courseDetail from '~/components/course/course-detail'

export default {
  components: {
    courseDetail
  },
  data () {
    return {
      nameMap: new Map(),
      courses: [],
      currentCourse: null,
      currentIndex: ''
    }
  },
  mounted () {
    this.getCourses()
  },
  methods: {
    getCourses () {
      this.$axios
        .get('/all-course', {
          params: {
            token: this.$store.state.session.token
          }
        })
        .then((res) => {
          if (res.data.status === 0) {
            this.courses = res.data.courses
            this.courses.forEach(async (course) => {
              const id = course.trainer_id
              if (!this.nameMap.has(id)) {
                const { data } = await this.$axios.get('/name', { params: { trainer_id: id } })
                if (data.name) {
                  const name = data.name
                  this.nameMap.set(id, name)
                }
              }
              course.name = this.nameMap.get(id)
            })
          } else if (res.data.status === 1) {
            this.makeToast('Access denied!', 'Bad access token, please login and try again.', 'warning')
          }
        })
        .catch((error) => {
          this.makeToast('Cannot get message!', error, 'danger')
        })
    },
    selectedCourse (course, i) {
      this.currentCourse = course
      this.currentIndex = i
    },
    makeToast (title, message, variant) {
      this.$bvToast.toast(message, {
        title,
        variant,
        autoHideDelay: 2500,
        appendToast: true
      })
    }
  }

}
</script>

<style>

</style>
