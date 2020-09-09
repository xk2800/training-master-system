<template>
  <b-card>
    <b-form @submit="onSubmit">
      <b-form-group
        label="Title: "
        label-for="title1"
      >
        <b-form-input
          v-model="title"
          type="text"
          required
          placeholder="Enter your title"
        />
      </b-form-group>
      <b-form-group
        class="mt-4"
        label="Desciption"
      >
        <b-form-textarea
          v-model="content"
          type="text"
          class="form-control"
          placeholder="Enter your description"
          rows="1"
        />
      </b-form-group>
      <b-row class="justify-content-center mt-4">
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </b-row>
    </b-form>
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
      title: '',
      content: ''
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.$axios
        .post('/feedback', {
          token: this.$store.state.session.token,
          trainee_id: this.$store.state.session.id,
          course_id: this.course.id,
          title: this.title,
          content: this.content
        })
        .then((res) => {
          if (res.data.status === 0) {
            this.makeToast('Success!', 'Feedback successfully submitted', 'success')
          } else if (res.data.status === 1) {
            this.makeToast('Failed!', 'Message couldn\'t be sent', 'warning')
          }
        })
        .catch((error) => {
          this.makeToast('Internal Error', error, 'danger')
        })
        .finally(() => {
          this.content = ''
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
