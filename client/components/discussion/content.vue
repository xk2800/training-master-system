<template>
  <div>
    <b-card title="Discussion Forum" class="mb-2 text-center">
      {{ discussion }}
    </b-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      discussion: []
    }
  },
  created () {
    this.loadContent()
  },
  methods: {
    loadContent () {
      this.$axios.get('http://localhost:8000/discussion/')
        .then((res) => {
          this.discussion = res.data
        })
        .catch((error) => {
          this.content = error
        })
    }
  }
}
</script>

<style>

</style>
