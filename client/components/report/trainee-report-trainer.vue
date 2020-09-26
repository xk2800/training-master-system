<template>
  <b-card class="border-round border-0 shadow-sm">
    <div>
      <Title>Report of all trainees</Title>
      <div>Please select your course to generate report</div>
      <b-form>
        <b-form-select
          v-model="selectedCourse"
          class="m-md-2"
          @change="loadReport()"
        >
          <b-form-select-option
            value="null"
          >
            Please select the course
          </b-form-select-option>
          <b-form-select-option
            v-for="(course, i) in courses"
            :key="`course-${i}`"
            :value="{id: course.id, text: course.title}"
          >
            {{ course.title }}
          </b-form-select-option>
        </b-form-select>
      </b-form>
      <div v-if="!isHidden">
        <div>
          Report Type: Trainee Report <br>
          Generated on: {{ date }} {{ time }}
        </div>
        <b-table bordered outlined hover :items="trainees" :fields="fields" />
        <div>
          Total number of trainee: {{ trainees.length }}
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  data () {
    return {
      isHidden: true,
      fields: [
        {
          key: 'trainee_id',
          label: 'User ID',
          sortable: true
        },
        {
          key: 'name',
          sortable: true
        }
      ],
      trainees: [],
      courses: [],
      selectedCourse: null,
      date: this.getTime().formattedDate,
      time: this.getTime().time
    }
  },
  created () {
    this.loadCourse()
  },
  methods: {
    loadCourse () {
      this.$axios
        .get('/course-trainer', {
          params: {
            token: this.$store.state.session.token,
            trainer_id: this.$store.state.session.id
          }
        })
        .then((res) => {
          if (res.data.status === 0) {
            this.courses = res.data.courses
          } else if (res.data.status === 1) {
            this.makeToast('Access denied!', 'Bad access token, please login and try again.', 'warning')
          }
        })
        .catch((err) => {
          this.makeToast('Internal Error', err, 'danger')
        })
    },
    loadReport () {
      this.$axios
        .get('/report-trainee', {
          params: {
            token: this.$store.state.session.token,
            user_id: this.$store.state.session.id,
            course_id: this.selectedCourse.id
          }
        })
        .then((res) => {
          if (res.data.status === 0) {
            this.trainees = res.data.trainees
            this.isHidden = false
          } else if (res.data.status === 1) {
            this.makeToast('Access denied!', 'Bad access token, please login and try again.', 'warning')
          }
        })
        .catch((err) => {
          this.makeToast('Internal Error', err, 'danger')
        })
    },
    getTime () {
      const today = new Date()
      const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      const formattedDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/')
      return { formattedDate, time }
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
