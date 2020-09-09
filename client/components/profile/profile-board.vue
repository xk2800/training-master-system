<template>
  <div>
    <div>
      <b-row>
        <b-col cols="3">
          <b-img src="/profile.png" class="mb-3" fluid />
        </b-col>
        <b-col v-if="!foo" cols="9" class="py-lg-5">
          <p><b>Name:</b> {{ name }}</p>
          <p><b>Email:</b> {{ email }}</p>
          <p><b>User type:</b> {{ (type == 1) ? 'Trainee' : (type == 2) ? 'Trainer' : 'Administrator' }}</p>
          <b-button variant="outline-primary" @click="foo = !foo">Update</b-button>
        </b-col>
        <b-col v-if="foo" cols="9" class="py-lg-5">
          <p><b>Name:</b><b-form-input type="name" v-model="newname" :placeholder="name" /></p>
          <p><b>Email:</b><b-form-input type="email" v-model="newemail" :placeholder="email" /></p>
          <p><b>User type:</b> {{ (type == 1) ? 'Trainee' : (type == 2) ? 'Trainer' : 'Administrator' }}</p>
          <p><b>Current password:</b><b-form-input type="password" v-model="prevpassword" placeholder="Current password" /></p>
          <p><b>New password:</b><b-form-input type="password" v-model="newpassword" placeholder="New password" /></p>
          <b-button v-if="foo == true" variant="outline-primary" @click="onUpdate">Confirm</b-button>
          <b-button v-if="foo == true" variant="outline-danger" @click="onReset">Cancel</b-button>
        </b-col>
      </b-row>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      type: '',
      newname: '',
      newemail: '',
      prevpassword: '',
      pwdState: null,
      newpassword: '',
      foo: false
    }
  },
  created () {
    this.loadProfile(0)
  },
  methods: {
    loadProfile (offset) {
      this.$axios
        .get('/user', {
          params: {
            token: this.$store.state.session.token,
            id: this.$store.state.session.id
          }
        })
        .then((res) => {
          if (res.data.status === 0) {
            this.name = res.data.name
            this.email = res.data.email
            this.type = res.data.type
            this.pwd = res.data.password
          } else if (res.data.status === 1) {
            this.makeToast('Access denied!', 'Bad access token, please login and try again.', 'warning')
          }
        })
        .catch((error) => {
          this.makeToast('Cannot get message!', error, 'danger')
        })
    },
    onReset () {
      this.newname = ''
      this.newemail = ''
      this.prevpassword = ''
      this.newpassword = ''
      this.foo = !this.foo
    },
    onUpdate () {
      this.$axios
        .put('/user', {
          token: this.$store.state.session.token,
          id: this.$store.state.session.id,
          email: this.newemail,
          name: this.newname,
          ppassword: this.prevpassword,
          npassword: this.newpassword
        })
        .then((res) => {
          if (res.data.status === 0) {
            this.makeToast('Success!', 'Profile successfully updated', 'success')
            this.loadProfile(0)
          } else if (res.data.status === 1) {
            this.makeToast('Failed!', 'Message couldn\'t be sent', 'warning')
          }
        })
        .catch((error) => {
          this.makeToast('Internal Error', error, 'danger')
        })
        .finally(() => {
          this.newname = ''
          this.newemail = ''
          this.prevpassword = ''
          this.newpassword = ''
          this.foo = !this.foo
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
.bg-none {
  background-color: rgba(0,0,0,0);
}
</style>
