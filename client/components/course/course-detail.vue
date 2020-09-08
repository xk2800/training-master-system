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
      <div v-else-if="this.$store.state.session.type === 1 && selectedCourse.trainer_id === trainerId">
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
      <div v-else-if="this.$store.state.session.type === 0 && selectedCourse.admin_id === adminId">
        <b-button variant="outline-success" @click="$bvModal.show('updateCourse')">
          Update Course
        </b-button>
        <b-button variant="outline-danger" @click="deleteCourse()">
          Delete Course
        </b-button>
      </div>
    </b-card>
    <b-modal :id="feedback" title="Submit a feedback" :hide-header="true" :hide-footer="true">
      <Feedbackboard />
    </b-modal>
    <b-modal id="updateCourse" title="Update Course" centered hide-footer>
      <CourseUpdate :selected-course="selectedCourse" />
    </b-modal>
  </div>
</template>

<script>
import Feedbackboard from '~/components/feedback/feedback-board'
import CourseUpdate from '~/components/course/course-update'

export default {
  components: {
    Feedbackboard,
    CourseUpdate
  },
  props: {
    selectedCourse: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      trainerId: null,
      adminId: null
    }
  },
  mounted () {
    this.getTrainerId()
    this.getAdminId()
  },
  methods: {
    getTrainerId () {
      if (this.$store.state.session.type === 1) {
        this.$axios
          .get('/trainer', {
            params: {
              token: this.$store.state.session.token,
              id: this.$store.state.session.id
            }
          })
          .then((res) => {
            if (res.data.status === 0) {
              this.trainerId = res.data.id
            } else if (res.data.status === 1) {
            }
          })
          .catch((error) => {
            this.makeToast('Cannot get message!', error, 'danger')
          })
      }
    },
    getAdminId () {
      if (this.$store.state.session.type === 0) {
        this.$axios
          .get('/admin', {
            params: {
              token: this.$store.state.session.token,
              id: this.$store.state.session.id
            }
          })
          .then((res) => {
            if (res.data.status === 0) {
              this.adminId = res.data.id
            } else if (res.data.status === 1) {
            }
          })
          .catch((error) => {
            this.makeToast('Cannot get message!', error, 'danger')
          })
      }
    },
    deleteCourse () {
      this.$bvModal.msgBoxConfirm('Please confirm that you want to delete this course.', {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then((value) => {})
        .catch((err) => {
          console.log(err)
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
