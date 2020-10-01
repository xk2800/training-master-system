<template>
  <b-card class="border-round border-0 shadow-sm">
    <div v-if="feedbacks.length===0">
      There's no feedback received yet.
    </div>
    <div>
      <b-card-group v-for="(feedback, i) in feedbacks" :key="`feedback-${i}`">
        <b-card class="border-0" :title="feedback.title" :sub-title="feedback.name">
          <b-card-text>
            {{ feedback.content }}
          </b-card-text>
        </b-card>
      </b-card-group>
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
      nameMap: new Map(),
      feedbacks: []
    }
  },
  created () {
    this.loadContent(0)
  },
  methods: {
    loadContent (offset) {
      this.$axios
        .get('/feedback', {
          params: {
            token: this.$store.state.session.token,
            user_id: this.$store.state.session.id,
            course_id: this.course.id,
            limit: 7,
            offset
          }
        })
        .then((res) => {
          if (res.data.status === 0) {
            this.feedbacks = res.data.feedbacks.reverse()
            this.feedbacks.forEach(async (feedback) => {
              const id = feedback.trainee_id
              if (!this.nameMap.has(id)) {
                const { data } = await this.$axios.get('/name', { params: { id } })
                const name = data.name
                this.nameMap.set(id, name)
              }
              feedback.name = this.nameMap.get(id)
            })
          } else if (res.data.status === 1) {
            this.makeToast('Access denied!', 'Bad access token, please login and try again.', 'warning')
          }
        })
        .catch((error) => {
          this.makeToast('Cannot get message!', error, 'danger')
        })
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
