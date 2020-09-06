<template>
  <b-card class="border-round border-0 shadow-sm mt-3">
    <b-form @submit="onSubmit">
      <b-form-select
        v-model="form.trainerSelected"
        text="Select Trainer"
        class="m-md-2"
      >
        <b-form-select-option
          v-for="(trainer, i) in trainers"
          :key="`trainer-${i}`"
          :value="{id: trainer.trainer_id, text: trainer.name}"
        >
          {{ trainer.name }}
        </b-form-select-option>
      </b-form-select>
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
      },
      nameMap: new Map(),
      trainers: []
    }
  },
  mounted () {
    this.getTrainers()
  },
  methods: {
    getTrainers () {
      this.$axios
        .get('/all-trainer', {
          params: {
            token: this.$store.state.session.token,
            user_id: this.$store.state.session.id
          }
        })
        .then((res) => {
          if (res.data.status === 0) {
            this.trainers = res.data.trainers
            this.trainers.forEach(async (trainer) => {
              const id = trainer.trainer_id
              if (!this.nameMap.has(id)) {
                const { data } = await this.$axios.get('/name', { params: { id } })
                const name = data.name
                this.nameMap.set(id, name)
              }
              trainer.name = this.nameMap.get(id)
            })
          } else if (res.data.status === 1) {
            this.makeToast('Access denied!', 'Bad access token, please login and try again.', 'warning')
          }
        })
        .catch((error) => {
          this.makeToast('Cannot get message!', error, 'danger')
        })
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.$axios
        .post('/course', {
          token: this.$store.state.session.token,
          admin_id: this.$store.state.session.id,
          trainer_id: this.form.trainerSelected.id,
          title: this.form.title,
          desc: this.form.description
        })
        .then((res) => {
          if (res.data.status === 0) {
            this.makeToast('Success!', 'Course successfully created', 'success')
          } else if (res.data.status === 1) {
            this.makeToast('Failed!', 'Message couldn\'t be sent', 'warning')
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
