<template>
  <b-form v-if="show" @submit="savePost" @reset="onReset">
    <b-form-group
      id="getTitle"
      label="Title: "
      label-for="title"
    >
      <b-form-input
        id="title"
        v-model="title"
        type="text"
        required
        placeholder="Enter Title"
      />
    </b-form-group>

    <b-form-group
      id="getDesc"
      label="Description: "
      label-for="Desc"
    >
      <b-form-textarea
        id="Desc"
        v-model="desc"
        type="text"
        placeholder="Enter Description (optional)"
        row="4"
      />
    </b-form-group>

    <b-form-group
      id="getMaterial"
      label="Material: "
      label-for="material"
    >
      <b-form-file
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a file or drop it here"
        drop-placeholder="Drop file here..."
      />
    </b-form-group>
    <div class="mt-3">
      Selected file: {{ file ? file.name: '' }}
    </div>

    <b-button type="submit" variant="primary">
      Submit
    </b-button>
  </b-form>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      title: '',
      desc: '',
      file: null,
      show: true
    }
  },
  methods: {
    savePost (evt) {
      evt.preventDefault()
      if (!this.file) {
        alert('Please insert the material file')
        return
      }
      this.$axios
        .post('/post', {
          token: this.$store.state.session.token,
          trainer_id: this.$store.state.session.id,
          course_id: this.course.id,
          title: this.title,
          desc: this.desc,
          fileName: this.file.name,
          content: this.file
        })
        .then((response) => {
          this.makeToast('Success!', 'Material has been uploaded', 'success')
        })
        .catch((err) => {
          console.log(err)
          this.makeToast('Error while uploading file', err, 'danger')
        })
    },
    onReset (evt) {
      evt.preventDefault()
      this.title = ''
      this.desc = ''
      this.file = null
      this.content = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
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
