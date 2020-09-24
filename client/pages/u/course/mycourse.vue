<template>
  <b-container class="mt-4">
    <ProfileBoard />
    <Title class="my-3 bold">
      My Courses
    </Title>
    <div v-if="this.$store.state.session.type === 0">
      <b-button v-b-modal.addCourse variant="outline-primary" class="mt-2">
        Add Course
      </b-button>
      <b-button variant="outline-danger" class="mt-2" @click="deleteCourses()">
        Delete All Course
      </b-button>
    </div>
    <CoursePreview />
    <b-modal id="addCourse" title="Add Course" hide-footer>
      <addCourse />
    </b-modal>
  </b-container>
</template>

<script>
import CoursePreview from '~/components/course/course-preview'
import addCourse from '~/components/course/create-course'
import ProfileBoard from '~/components/profile/profile-board'

export default {
  middleware: 'authenticated',
  components: {
    CoursePreview,
    addCourse,
    ProfileBoard
  },
  data () {
    return {
      confirm: ''
    }
  },
  methods: {
    deleteCourses () {
      this.$bvModal.msgBoxConfirm('Please confirm that you want to delete everything.', {
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
                  admin_id: this.$store.state.session.id
                }
              })
              .then((res) => {
                if (res.data.status === 0) {
                  this.makeToast('Successfully Deleted', 'All course(s) has been deleted', 'success')
                  window.location.reload(true)
                } else if (res.data.status === 1 || res.data.status === 2) {
                  this.makeToast('Couldn\'t Delete!', 'Bad token, Please try again later', 'warning')
                }
              })
              .catch((err) => {
                this.makeToast('Internal Error!', err, 'danger')
              })
          }
        })
        .catch((err) => {
          this.makeToast('Internal Error~', err, 'danger')
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

<style scoped>
body {
  background-color: rgb(247, 247, 247);
}

</style>
