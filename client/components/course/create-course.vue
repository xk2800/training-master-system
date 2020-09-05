<template>
  <b-card class="border-round border-0 shadow-sm mt-3">
    <b-form @submit="onSubmit">
      <!-- <b-form-select
        text="Select Trainer"
        class="m-md-2"
        v-model="trainerSelected"
        :options="trainers"
      ></b-form-select> -->
      <b-form-group
        label="Title: "
        label-for="title-1"
        description="Please enter the course name here"
      >
        <b-form-input
          v-model="form.title"
          type="text"
          required
          placeholder="Enter title"
        />
      </b-form-group>

      <b-form-group
        label="Description: "
        label-for="des-1"
      >
        <b-form-textarea
          v-model="form.description"
          type="text"
          required
          rows="3"
          placeholder="Enter title"
        />
      </b-form-group>
      <b-button type="submit" variant="primary">
        Submit
      </b-button>
    </b-form>
  </b-card>
</template>

<script>
export default {
  data () {
    return {
      form: {
        trainerSelected: '',
        title: '',
        description: ''
      }
      // trainers: []
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.$axios
        .post('/course', {
          token: this.$store.state.session.token,
          admin_id: this.$store.state.session.id,
          trainer_id: 2,
          title: this.form.title,
          desc: this.form.description
        })
        .then((res) => {
          if (res.data.status === 0) {
            this.makeToast('Success!', 'Discussion successfully posted', 'success')
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
