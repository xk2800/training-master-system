<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group class="mt-4">
        <b-form-select v-model="credentials.type" :options="options" />
      </b-form-group>
      <b-form-group>
        <label for="reg-name-input">Name</label>
        <input v-model="credentials.name" type="text" class="form-control" placeholder="Enter full name">
      </b-form-group>
      <b-form-group>
        <label for="reg-email-input">Email address</label>
        <input v-model="credentials.email" type="text" class="form-control" placeholder="Enter email">
      </b-form-group>
      <b-form-group>
        <label for="reg-password-input">Password</label>
        <input v-model="credentials.password" type="text" class="form-control" placeholder="Password">
      </b-form-group>
      <b-row class="justify-content-center mt-4">
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </b-row>
    </b-form>
    <div v-if="error" class="alert alert-danger">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [
        { value: null, text: 'Please select user type' },
        { value: '1', text: 'Trainer' },
        { value: '2', text: 'Trainee' }
      ],
      credentials: {
        type: null,
        name: '',
        email: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.$axios.post('http://localhost:8000/user/', {
        type: this.credentials.type,
        name: this.credentials.name,
        email: this.credentials.email,
        password: this.credentials.password
      })
        .then((res) => {
          if (res.data.status === 0) {
            this.makeToast('Success!', 'Account is successfully created', 'success')
          } else if (res.data.status === 1) {
            this.makeToast('Oh no!', 'There is already an account with this email', 'warning')
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
