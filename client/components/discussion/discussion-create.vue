<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group class="mt-4">
        <label for="dis-content-input">Content</label>
        <b-form-textarea
          v-model="content"
          type="text"
          class="form-control"
          placeholder="Enter discussion post content"
          rows="5"
        />
      </b-form-group>
      <b-row class="justify-content-center mt-4">
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </b-row>
    </b-form>
    <div v-if="error" class="alert alert-danger">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: '',
      error: ''
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.$axios.post('http://localhost:8000/discussion/', { content: this.content })
        .then((res) => {
          if (res.data.status === 0) {
            this.makeToast('Success!', 'Discussion successfully posted', 'success')
          } else if (res.data.status === 1) {
            this.makeToast('Fail!', 'Discussion failed to post', 'error')
          }
        })
        .catch((error) => {
          this.makeToast('Internal Error', error, 'danger')
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
