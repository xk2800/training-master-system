<template>
  <b-card>
    <Title>My Personal Performance</Title>
    <b-tabs pills align="center" fill>
      <b-tab title="General Performance View" active>
        <chartBar />
      </b-tab>
      <b-tab title="Detail Performance View">
        <div>
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
            <b-card
              :title="selectedCourse.text"
            >
              <div class="card-subtitle mb-2 text-muted">
                Report Type: My Report <br>
                Generated on: {{ date }} {{ time }}
              </div>

              <b-row class="mb-2 mt-2">
                <b-col sm="3" class="text-sm">
                  <b>Description: </b>
                </b-col>
                <b-col>{{ result.desc }}</b-col>
              </b-row>

              <b-row class="mb-2 mt-2">
                <b-col sm="3" class="text-sm">
                  <b>Duration: </b>
                </b-col>
                <b-col>{{ result.duration }} month(s)</b-col>
              </b-row>

              <b-row class="mb-2 mt-2">
                <b-col sm="3" class="text-sm">
                  <b>Enrolled on: </b>
                </b-col>
                <b-col>{{ result.enrollDate }}</b-col>
              </b-row>

              <b-row class="mb-2 mt-2">
                <b-col sm="3" class="text-sm">
                  <b>Trainer: </b>
                </b-col>
                <b-col>ID-{{ result.id }} {{ result.name }}</b-col>
              </b-row>

              <b-row class="mb-2 mt-2">
                <b-col sm="3" class="text-sm">
                  <b>Progress: </b>
                </b-col>
                <b-col class="mt-1">
                  <b-progress :value="result.progress" variant="info" :max="100" show-progress animated />
                </b-col>
                <b-col>{{ result.progress }}%</b-col>
              </b-row>

              <b-row class="mb-2 mt-2">
                <b-col sm="3" class="text-sm">
                  <b>Grade: </b>
                </b-col>
                <b-col class="mt-1">
                  <b-progress :value="result.grade" variant="primary" :max="100" show-progress animated />
                </b-col>
                <b-col>{{ result.grade }}%</b-col>
              </b-row>
            </b-card>
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import chartBar from './chart-bar'
export default {
  components: {
    chartBar
  },
  data () {
    return {
      isHidden: true,
      courses: [],
      selectedCourse: null,
      date: this.getTime().formattedDate,
      time: this.getTime().time,
      result: null
    }
  },
  created () {
    this.loadCourse()
  },
  methods: {
    loadCourse () {
      this.$axios
        .get('/enrolled-course', {
          params: {
            token: this.$store.state.session.token,
            user_id: this.$store.state.session.id,
            type: this.$store.state.session.type
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
        .get('/my-report', {
          params: {
            token: this.$store.state.session.token,
            user_id: this.$store.state.session.id,
            course_id: this.selectedCourse.id
          }
        })
        .then((res) => {
          if (res.data.status === 0) {
            this.result = res.data
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
