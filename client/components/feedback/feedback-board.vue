<template>
  <b-form @submit="onSubmit">
    <b-form-group
      label="Title: "
      label-for="title1"
    >
      <b-form-input
        v-model="form.title"
        type="text"
        required
        placeholder="Enter your title"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      class="mt-4"
      label="Desciption"
    >
      <b-form-textarea
        v-model="form.content"
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
</template>

<script>
export default {
  data () {
    return {
      form: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.$axios
        .post('/feedback', {
          token: this.$store.state.session.token,
          user_id: this.$store.state.session.id,
          title: this.form.title,
          content: this.form.content
        })
        .then((res) => {
          if (res.data.status === 0) {
            this.makeToast('Success!', 'Feedback successfully submitted', 'success')
            this.loadContent(0)
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
