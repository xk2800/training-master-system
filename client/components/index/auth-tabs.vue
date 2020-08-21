<template>
  <div>
    <b-tabs pills align="center">
      <b-tab title="Login" active>
        <LoginForm />
      </b-tab>
      <b-tab title="Register">
        <RegisterForm />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import LoginForm from '~/components/index/login-form.vue'
import RegisterForm from '~/components/index/register-form.vue'

export default {
  components: {
    LoginForm,
    RegisterForm
  }
}
</script>

<style>

</style>
