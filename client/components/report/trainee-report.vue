<template>
  <b-card class="border-round border-0 shadow-sm">
    <div>
      <Title>Report of all trainees</Title>
      <div>
        Report Type: Trainee Report <br>
        Generated on: {{ date }} {{ time }}
      </div>
      <b-table bordered outlined hover :items="trainees" :fields="fields" />
      <div>
        Total number of trainee: {{ trainees.length }}
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      default: null
    }
  },
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
      items: new Map(),
      trainees: [],
      date: this.getTime().formattedDate,
      time: this.getTime().time
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
