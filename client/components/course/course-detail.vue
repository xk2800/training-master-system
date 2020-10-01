<template>
  <div>
    <b-card class="border-round border-0 shadow-sm mt-3">
      <b-card-sub-title>Trainer: {{ selectedCourse.name }}, Course Duration: {{ selectedCourse.duration }}, Course Status: {{ courseState }}</b-card-sub-title>
      <b-card-text class="mt-2">
        {{ selectedCourse.desc }}
      </b-card-text>
      <div v-if="this.$store.state.session.type === 2">
        <b-button v-if="!enrolled" id="enroll" variant="outline-success" :disabled="isDisable" @click="enrollCourse(selectedCourse)">
          Enroll Course
        </b-button>
        <b-button v-if="enrolled" variant="outline-danger" @click="dropCourse(selectedCourse)">
          Drop Course
        </b-button>
        <b-button v-if="enrolled" variant="outline-success" :disabled="isDisable" @click="$bvModal.show('postBoard')">
          View Material
        </b-button>
        <b-button v-if="enrolled" variant="outline-info" @click="$bvModal.show('discussion')">
          View Discussion
        </b-button>
        <b-button variant="outline-primary" @click="$bvModal.show('feedback')">
          My feedback
        </b-button>
        <b-button v-if="enrolled && selectedCourse.status === 2" variant="outline-info" @click="$bvModal.show('TE')">
          Training Evaluation
        </b-button>
        <div class="mt-3">
          <b-card-text v-b-tooltip.hover.left="'It could happen when the course has been set as complete or close. If you think this is a mistake, please report to us via feedback'" class="text-secondary">
            Why I can't enroll into the course?
          </b-card-text>
        </div>
      </div>
      <div v-else-if="this.$store.state.session.type === 1 && selectedCourse.trainer_id === trainerId">
        <b-form-group label="Course Status:">
          <b-form-radio-group
            id="courseStatus"
            v-model="selected"
            name="CourseStatus"
            :options="options"
            @change="changeStatus($event)"
          />
        </b-form-group>
        <b-button variant="outline-success" :disabled="isDisable" @click="$bvModal.show('postBoard')">
          Manage Material
        </b-button>
        <b-button variant="outline-primary" @click="$bvModal.show('feedbackBoard')">
          View Feedback
        </b-button>
        <b-button variant="outline-info" @click="$bvModal.show('discussion')">
          View Discussion
        </b-button>
        <div class="mt-2">
          <b-button variant="outline-dark" @click="$bvModal.show('courseRecord')">
            Training Records/Remarks
          </b-button>
        </div>
      </div>
      <div v-else-if="this.$store.state.session.type === 0 && selectedCourse.admin_id === adminId">
        <b-button variant="outline-success" @click="$bvModal.show('updateCourse')">
          Update Course
        </b-button>
        <b-button variant="outline-danger" @click="deleteCourse(selectedCourse)">
          Delete Course
        </b-button>
        <div class="mt-2">
          <b-button variant="outline-info" @click="$bvModal.show('discussion')">
            View Discussion
          </b-button>
          <b-button variant="outline-primary" @click="$bvModal.show('feedbackBoard')">
            View Feedback
          </b-button>
          <b-button variant="outline-warning" @click="$bvModal.show('postBoard')">
            View Material
          </b-button>
        </div>
      </div>
    </b-card>
    <b-modal id="feedback" hide-header centered hide-footer>
      <FeedbackSubmit :course="selectedCourse" />
    </b-modal>
    <b-modal id="updateCourse" title="Update Course" centered hide-footer>
      <CourseUpdate :selected-course="selectedCourse" />
    </b-modal>
    <b-modal id="feedbackBoard" title="Feedback List" hide-footer>
      <FeedbackBoard :course="selectedCourse" />
    </b-modal>
    <b-modal id="postBoard" size="lg" title="Material List" centered hide-footer>
      <CourseMaterial :course="selectedCourse" />
    </b-modal>
    <b-modal id="courseRecord" size="xl" title="Training Record" centered hide-footer>
      <CourseRecord :course="selectedCourse" />
    </b-modal>
    <b-modal id="TE" size="xl" title="Training Evaluation" centered hide-footer>
      <TEvaluation :course="selectedCourse" />
    </b-modal>
    <b-modal id="discussion" size="xl" title="Discussion Board" centered hide-footer>
      <DiscussionBoard :course="selectedCourse" />
    </b-modal>
  </div>
</template>

<script>
import FeedbackSubmit from '~/components/feedback/feedback-submit'
import CourseUpdate from '~/components/course/course-update'
import FeedbackBoard from '~/components/feedback/feedback-board'
import CourseMaterial from '~/components/post/post-display'
import CourseRecord from '~/components/course/course-record'
import TEvaluation from '~/components/course/course-evaluation'
import DiscussionBoard from '~/components/discussion/discussion-board'

export default {
  components: {
    FeedbackBoard,
    CourseUpdate,
    FeedbackSubmit,
    CourseMaterial,
    CourseRecord,
    TEvaluation,
    DiscussionBoard
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
      adminId: null,
      traineeId: null,
      selected: this.selectedCourse.status,
      options: [
        { text: 'Active', value: 1 },
        { text: 'Complete', value: 2 },
        { text: 'Postpone', value: 3 },
        { text: 'Close', value: 4 }
      ],
      selectCourse: this.selectedCourse,
      isDisable: false,
      courseState: '',
      enrolled: false
    }
  },
  mounted () {
    this.getTrainerId()
    this.getAdminId()
    this.getTraineeId()
    this.statusDisable()
    this.getCourseState()
  },
  methods: {
    getCourseState () {
      if (this.selectCourse.status === 1) {
        this.courseState = 'Active'
      } else if (this.selectCourse.status === 2) {
        this.courseState = 'Complete'
      } else if (this.selectCourse.status === 3) {
        this.courseState = 'Postpone'
      } else {
        this.courseState = 'Close'
      }
    },
    statusDisable () {
      if (this.selectCourse.status === 4 || this.selectCourse.status === 2) {
        this.isDisable = true
      } else {
        this.isDisable = false
      }
      this.getCourseState()
    },
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
    getTraineeId () {
      if (this.$store.state.session.type === 2) {
        this.$axios
          .get('/trainee', {
            params: {
              token: this.$store.state.session.token,
              id: this.$store.state.session.id
            }
          })
          .then((res) => {
            this.$axios
              .get('/enrollment', {
                params: {
                  token: this.$store.state.session.token,
                  user_id: this.$store.state.session.id,
                  course_id: this.selectCourse.id
                }
              })
              .then((res) => {
                if (res.data.status === 1) {
                  this.enrolled = false
                } else if (res.data.status === 0) {
                  this.enrolled = true
                }
              })
              .catch((error) => {
                this.makeToast('Cannot get enrollment message!', error, 'danger')
              })
            if (res.data.status === 0) {
              this.traineeId = res.data.id
            } else if (res.data.status === 1) {
            }
          })
          .catch((error) => {
            this.makeToast('Cannot get message!', error, 'danger')
          })
      }
    },
    enrollCourse (course) {
      this.$bvModal.msgBoxConfirm('Please confirm that you want to enroll to this course.', {
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
        .then((value) => {
          if (value) {
            this.$axios
              .post('/enrollment', {
                params: {
                  token: this.$store.state.session.token,
                  trainee_id: this.$store.state.session.id,
                  course_id: course.id
                }
              })
              .then((res) => {
                if (res.data.status === 0) {
                  this.makeToast('Success!', 'You have enrolled into the course', 'success')
                } else if (res.data.status === 1) {
                  this.makeToast('Failed!', 'You have already enrolled into the course.', 'info')
                }
              })
              .catch((error) => {
                this.makeToast('Cannot get message!', error, 'danger')
              })
          }
        })
        .catch((err) => {
          this.makeToast('Internal Error!', err, 'danger')
        })
    },
    dropCourse (course) {
      this.$bvModal.msgBoxConfirm('Please confirm that you want to drop to this course.', {
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
        .then((value) => {
          if (value) {
            this.$axios
              .delete('/enrollment', {
                params: {
                  token: this.$store.state.session.token,
                  trainee_id: this.$store.state.session.id,
                  course_id: course.id
                }
              })
              .then((res) => {
                if (res.data.status === 0) {
                  this.makeToast('Success!', 'You have dropped out from the course', 'success')
                } else if (res.data.status === 1) {
                  this.makeToast('Failed!', 'You are not enrolled into the course.', 'info')
                }
              })
              .catch((error) => {
                this.makeToast('Cannot get message!', error, 'danger')
              })
          }
        })
        .catch((err) => {
          this.makeToast('Internal Error!', err, 'danger')
        })
    },
    deleteCourse (course) {
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
        .then((value) => {
          if (value) {
            this.$axios
              .delete('/course', {
                params: {
                  token: this.$store.state.session.token,
                  admin_id: this.$store.state.session.id,
                  course_id: course.id
                }
              })
              .then((res) => {
                if (res.data.status === 0) {
                  this.makeToast('Success!', 'Materials have been deleted', 'success')
                } else if (res.data.status === 1) {
                  this.makeToast('Access denied!', 'Bad access token, please login and try again.', 'warning')
                }
              })
              .catch((error) => {
                this.makeToast('Cannot get message!', error, 'danger')
              })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    changeStatus (event) {
      this.selected = event
      this.$axios
        .put('/course-status', {
          params: {
            token: this.$store.state.session.token,
            trainer_id: this.$store.state.session.id,
            course_id: this.selectCourse.id,
            status: this.selected
          }
        })
        .then((res) => {
          if (res.data.status === 0) {
            this.selectCourse.status = this.selected
            this.statusDisable()
            this.makeToast('Success!', 'Course Status has been changed', 'success')
          } else if (res.data.status === 1) {
            this.makeToast('Access denied!', 'Bad access token, please login and try again.', 'warning')
          }
        })
        .catch((error) => {
          this.makeToast('Internal Error occurs!', error, 'danger')
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
