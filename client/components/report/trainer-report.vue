<template>
  <b-card class="border-round border-0 shadow-sm">
    <div>
      <Title>Report of all trainers</Title>
      <div>
        Report Type: Trainer Report <br>
        Generated on: {{ date }} {{ time }}
      </div>
      <b-table
        bordered
        outlined
        hover
        :items="trainers"
        :fields="fields"
        @row-clicked="item=>$set(item, '_showDetails', !item._showDetails) "
      >
        <template v-slot:row-details="row">
          <b-card>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm">
                <b>Number of course(s) assigned: </b>
              </b-col>
              <b-col>{{ row.item.numCourse }}</b-col>
            </b-row>
            <b-table
              bordered
              outlined
              hover
              :items="row.item.courses"
              :fields="courseFields"
            />
          </b-card>
        </template>
      </b-table>
      <div>
        Total number of trainer: {{ trainers.length }}
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
          key: 'trainer_id',
          label: 'User ID',
          sortable: true
        },
        {
          key: 'name',
          sortable: true
        },
        {
          key: 'numCourse',
          label: 'Number of course assigned',
          sortable: true
        },
        {
          key: 'rating',
          label: 'Rating',
          sortable: true
        }
      ],
      courseFields: [
        {
          key: 'id',
          label: 'Course ID'
        },
        {
          key: 'trainer_id',
          label: 'Trainer ID'
        },
        {
          key: 'admin_id',
          label: 'Admin ID'
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
          key: 'duration',
          label: 'Course Duration'
        },
        {
          key: 'enrolledNum',
          label: 'Number of enrollment'
        }
      ],
      items: new Map(),
      trainers: [],
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
        .get('/all-trainer', {
          params: {
            token: this.$store.state.session.token,
            user_id: this.$store.state.session.id
          }
        })
        .then((res) => {
          if (res.data.status === 0) {
            this.trainers = res.data.trainers
            this.trainers.forEach(async (trainer) => {
              const id = trainer.trainer_id
              if (!this.items.has(id)) {
                const { data } = await this.$axios.get('/course-num', { params: { token: this.$store.state.session.token, user_id: this.$store.state.session.id, id, report_type: 1 } })
                const numCourse = data.numCourse
                this.items.set(id, numCourse)
              }
              trainer.numCourse = this.items.get(id)
              if (!this.courses.has(id)) {
                const { data } = await this.$axios.get('/enrolled-course',
                  {
                    params: {
                      token: this.$store.state.session.token,
                      user_id: trainer.trainer_id,
                      type: 1
                    }
                  })
                const courses = data.courses
                this.courses.set(id, courses)
              }
              trainer.courses = this.courses.get(id)
              trainer.courses.forEach(async (course) => {
                const courseId = course.id
                if (!this.courseDetail.has(courseId)) {
                  const { data } = await this.$axios.get('/report-trainee', {
                    params: {
                      token: this.$store.state.session.token,
                      user_id: this.$store.state.session.id,
                      course_id: courseId
                    }
                  })
                  const courseDtl = data.models.length
                  this.courseDetail.set(courseId, courseDtl)
                }
                course.enrolledNum = this.courseDetail.get(courseId)
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
