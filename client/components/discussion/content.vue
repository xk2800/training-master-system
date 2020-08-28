<template>
  <div>
    <b-card-group v-for="discussions in discussion" :key="discussions">
      <b-card class="text-center">
        {{ discussions.content }}
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      discussion: [],
      error: ''
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
