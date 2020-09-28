<template>
  <b-card class="border-round border-0 shadow-sm">
    <div>
      <Title>Report of all trainees</Title>
      <div>
        Report Type: Trainee Report <br>
        Generated on: {{ date }} {{ time }}
      </div>
      <b-table
        bordered
        outlined
        hover
        :items="trainees"
        :fields="fields"
        @row-clicked="item=>$set(item, '_showDetails', !item._showDetails) "
      >
        <template v-slot:row-details="row">
          <b-card>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm">
                <b>Number of course(s) enrolled: </b>
              </b-col>
              <b-col>{{ row.item.numCourse }}</b-col>
            </b-row>

            <b-table
              bordered
              outlined
              hover
              :items="row.item.courses"
              :fields="courseFields"
            >
              <template v-slot:cell(show_details)="row1">
                <b-button size="sm" class="mr-2" @click="row1.toggleDetails">
                  {{ row1.detailsShowing ? 'Hide' : 'Show' }} Details
                </b-button>
              </template>
              <template v-slot:row-details="row1">
                <b-card>
                  <b-row class="mb-2">
                    <b-col sm="3" class="text-sm-right">
                      <b>Progress: </b>
                    </b-col>
                    <b-col>{{ row.item.progress }}</b-col>
                    <b-col sm="3" class="text-sm-right">
                      <b>Grade: </b>
                    </b-col>
                    <b-col>{{ row.item.grade }}</b-col>
                  </b-row>

                  <b-row class="mb-2">
                    <b-col sm="3" class="text-sm-right">
                      <b>Rate Submitted: </b>
                    </b-col>
                    <b-col>{{ row.item.rateSubmitted }}</b-col>
                    <b-col sm="3" class="text-sm-right">
                      <b-button size="sm" @click="row1.toggleDetails">
                        Hide Details
                      </b-button>
                    </b-col>
                  </b-row>
                </b-card>
              </template>
            </b-table>
          </b-card>
        </template>
      </b-table>
      <div>
        Total number of trainee: {{ trainees.length }}
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  data () {
    return {
      fields: [
        {
          key: 'trainee_id',
          label: 'User ID',
          sortable: true
        },
        {
          key: 'name',
          sortable: true
        },
        {
          key: 'numCourse',
          label: 'Number of course enrolled',
          sortable: true
        }
      ],
      courseFields: [
        {
          key: 'trainer_id',
          label: 'Trainer ID'
        },
        {
          key: 'title',
          label: 'Course Name'
        },
        {
          key: 'desc',
          label: 'Course Description'
        },
        {
          key: 'show_details',
          label: 'Show Details'
        }
      ],
      items: new Map(),
      trainees: [],
      date: this.getTime().formattedDate,
      time: this.getTime().time,
      courses: new Map(),
      courseDetail: new Map()
    }
  },
  created () {
    this.loadReport()
  },
  methods: {
    loadReport () {
      this.$axios
        .get('/all-trainee', {
          params: {
            token: this.$store.state.session.token,
            user_id: this.$store.state.session.id
          }
        })
        .then((res) => {
          if (res.data.status === 0) {
            this.trainees = res.data.trainees
            this.trainees.forEach(async (trainee) => {
              const id = trainee.trainee_id
              if (!this.items.has(id)) {
                const { data } = await this.$axios.get('/course-num', { params: { token: this.$store.state.session.token, user_id: this.$store.state.session.id, id, report_type: 2 } })
                const numCourse = data.numCourse
                this.items.set(id, numCourse)
              }
              trainee.numCourse = this.items.get(id)
              if (!this.courses.has(id)) {
                const { data } = await this.$axios.get('/enrolled-course',
                  {
                    params: {
                      token: this.$store.state.session.token,
                      user_id: trainee.trainee_id,
                      type: 2
                    }
                  })
                const courses = data.courses
                this.courses.set(id, courses)
              }
              trainee.courses = this.courses.get(id)
              trainee.courses.forEach(async (course) => {
                const courseId = course.id
                if (!this.courseDetail.has(courseId)) {
                  const { data } = await this.$axios.get('/report-trainee', {
                    params: {
                      token: this.$store.state.session.token,
                      user_id: this.$store.state.session.id,
                      course_id: courseId,
                      trainee_id: id
                    }
                  })
                  const courseDtl = data.model
                  this.courseDetail.set(id, courseDtl)
                }
                trainee.progress = this.courseDetail.get(id).progress
                trainee.rateSubmitted = this.courseDetail.get(id).rateSubmitted
                trainee.grade = this.courseDetail.get(id).grade
              })
            })
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
