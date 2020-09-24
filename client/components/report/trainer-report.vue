<template>
  <b-card class="border-round border-0 shadow-sm">
    <div>
      <Title>Report of all trainers</Title>
      <div>
        Generated on: {{ date }} {{ time }}
      </div>
      <b-table bordered outlined hover :items="trainers" :fields="fields" />
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
          key: 'trainer_id',
          label: 'Trainer ID',
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
        }
      ],
      items: new Map(),
      trainers: [],
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
                const { data } = await this.$axios.get('/course-num', { params: { token: this.$store.state.session.token, user_id: this.$store.state.session.id, id: trainer.userId } })
                const numCourse = data.numCourse
                this.items.set(id, numCourse)
              }
              trainer.numCourse = this.items.get(id)
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
