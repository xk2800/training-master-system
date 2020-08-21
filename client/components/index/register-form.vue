<template>
  <b-form>
    <b-form-group>
      <label for="reg-name-input">Name</label>
      <input id="reg-name-input" type="text" class="form-control" placeholder="Enter full name">
    </b-form-group>
    <b-form-group>
      <label for="reg-email-input">Email address</label>
      <input id="reg-email-input" type="email" class="form-control" placeholder="Enter email">
    </b-form-group>
    <b-form-group>
      <label for="reg-password-input">Password</label>
      <input id="reg-password-input" type="password" class="form-control" placeholder="Password">
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

}
</script>

<style>

</style>
