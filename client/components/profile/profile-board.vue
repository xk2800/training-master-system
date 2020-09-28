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
          <p><b>User type:</b> {{ (userType == 1) ? 'Trainer' : (userType == 2) ? 'Trainee' : 'Administrator' }}</p>
          <b-button variant="outline-primary" @click="foo = !foo">
            Update
          </b-button>
        </b-col>
        <b-col v-if="foo" cols="9" class="py-lg-5">
          <p><b>Name:</b><b-form-input v-model="newname" :placeholder="name" /></p>
          <p>
            <b>Email:</b><b-form-input v-model="newemail" :placeholder="email" />
            <span v-if="msg.email">{{ msg.email }}</span>
          </p>
          <p><b>User type:</b> {{ (userType == 1) ? 'Trainer' : (userType == 2) ? 'Trainee' : 'Administrator' }}</p>
          <p>
            <b-form-checkbox
              id="changePass"
              v-model="changePassw"
              name="changePassw"
              value="true"
              unchecked-value="false"
            >
              I would like to change my password
            </b-form-checkbox>
          </p>
          <p><b>Current password:</b><b-form-input v-model="prevpassword" type="password" placeholder="Current password" /></p>
          <p v-if="changePassw == 'true'">
            <b>New password:</b><b-form-input v-model="newpassword" type="password" placeholder="New password" />
          </p>
          <b-button v-if="foo == true" variant="outline-primary" @click="onUpdate">
            Confirm
          </b-button>
          <b-button v-if="foo == true" variant="outline-danger" @click="onReset">
            Cancel
          </b-button>
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
      userType: this.$store.state.session.type,
      newname: '',
      newemail: '',
      prevpassword: '',
      pwdState: null,
      newpassword: '',
      foo: false,
      msg: [],
      validEmail: true,
      changePassw: 'false'
    }
  },
  watch: {
    newemail (value) {
      this.newemail = value
      this.validEmail = this.validateEmail(value)
    }
  },
  created () {
    this.loadProfile(0)
  },
  methods: {
    validateEmail (value) {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.msg.email = ''
        return true
      } else if (value === '') {
        this.msg.email = ''
        return true
      } else {
        this.msg.email = 'Invalid Email Address'
        return false
      }
    },
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
            this.pwd = res.data.password
          } else if (res.data.status === 1) {
            this.makeToast('Access denied!', 'Bad access token, please login and try again.', 'warning')
          }
        })
        .catch((error) => {
          console.log(this.$store.state.session.token)
          console.log(this.$store.state.session.id)
          this.makeToast('Cannot get message!', error, 'danger')
        })
    },
    onReset () {
      this.newname = ''
      this.newemail = ''
      this.prevpassword = ''
      this.newpassword = ''
      this.foo = !this.foo
      this.changePassw = 'false'
      this.validEmail = true
    },
    onUpdate () {
      if (!this.validEmail) {
        this.makeToast('Failed!', 'Please input a proper email address', 'warning')
        return
      }
      if (this.changePassw === 'false') {
        this.newpassword = this.prevpassword
      }
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
          this.makeToast('Internal Error', 'Kindly check your password entered' || error, 'danger')
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
