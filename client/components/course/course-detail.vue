<template>
  <div>
    <b-card class="border-round border-0 shadow-sm mt-3">
      <b-card-sub-title>{{ selectedCourse.name }}</b-card-sub-title>
      <b-card-text class="mt-2">
        {{ selectedCourse.desc }}
      </b-card-text>
      <div v-if="this.$store.state.session.type === 2">
        <b-button variant="outline-success" href="#">
          Enroll Course
        </b-button>
        <b-button variant="outline-danger" href="#">
          Drop Course
        </b-button>
        <div class="mt-2">
          <b-button v-b-modal="feedback" variant="outline-primary">
            Submit a feedback
          </b-button>
        </div>
      </div>
      <div v-else-if="this.$store.state.session.type === 1 && selectedCourse.trainer_id === id">
        <b-button variant="outline-success" href="#">
          Manage Material
        </b-button>
        <b-button variant="outline-danger" href="#">
          Drop Course
        </b-button>
        <div class="mt-2">
          <b-button v-b-modal="feedback" variant="outline-primary">
            Submit a feedback
          </b-button>
        </div>
      </div>
    </b-card>
    <b-modal :id="feedback" title="Submit a feedback" :hide-header="true" :hide-footer="true">
      <Feedbackboard />
    </b-modal>
  </div>
</template>

<script>
import Feedbackboard from '~/components/feedback/feedback-board'

export default {
  components: {
    Feedbackboard
  },
  props: {
    selectedCourse: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      id: null
    }
  },
  mounted () {
    this.getTrainerId()
  },
  methods: {
    getTrainerId () {
      this.$axios
        .get('/trainer', {
          params: {
            token: this.$store.state.session.token,
            id: this.$store.state.session.id
          }
        })
        .then((res) => {
          if (res.data.status === 0) {
            this.id = res.data.id
            console.log(this.id)
          } else if (res.data.status === 1) {
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
