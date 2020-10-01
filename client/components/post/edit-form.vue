<template>
  <b-form @submit="savePost">
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
        :placeholder="fileName"
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
    },
    material: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      title: this.material.title,
      desc: this.material.desc,
      file: null,
      fileName: this.material.fileName
    }
  },
  methods: {
    savePost (evt) {
      evt.preventDefault()
      if (!this.file) {
        this.$axios
          .put('/post', {
            token: this.$store.state.session.token,
            trainer_id: this.$store.state.session.id,
            course_id: this.course.id,
            post_id: this.material.id,
            title: this.title,
            desc: this.desc
          })
          .then((response) => {
            this.makeToast('Success!', 'Material has been uploaded', 'success')
          })
          .catch((err) => {
            console.log(err)
            this.makeToast('Error while uploading file', err, 'danger')
          })
      } else {
        this.$axios
          .put('/post', {
            token: this.$store.state.session.token,
            trainer_id: this.$store.state.session.id,
            post_id: this.material.id,
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
      }
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
