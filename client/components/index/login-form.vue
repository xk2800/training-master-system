<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group>
        <label for="login-email-input">Email address</label>
        <input v-model="credentials.email" type="email" class="form-control" placeholder="Enter email">
      </b-form-group>
      <b-form-group>
        <label for="login-password-input">Password</label>
        <input v-model="credentials.password" type="password" class="form-control" placeholder="Password">
      </b-form-group>
      <b-row class="justify-content-center mt-4">
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </b-row>
    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.$axios
        .post('/login', {
          email: this.credentials.email,
          password: this.credentials.password
        })
        .then((res) => {
          // action after successfully login
          if (res.data.status === 0) {
            this.$store.commit('session/auth', { id: res.data.id, token: res.data.token, type: res.data.type })
            console.log(res.data.type)
            console.log(this.$store.state.session.type)
            console.log(this.$store.state.session.type === '0')
            this.makeToast('Logged in!', 'Welcome back to Training Master System!', 'success')
            this.$router.push('/u/home')
          } else if (res.data.status === 1 || res.data.status === 2) {
            this.makeToast('Couldn\'t login!', 'Email and password combination not exists', 'warning')
          }
        })
        .catch((error) => {
          this.makeToast('Internal Error!', error, 'danger')
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
