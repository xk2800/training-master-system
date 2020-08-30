<template>
  <div>
    <b-card-group v-for="discussions in discussion" :key="`discussion-${discussions}`">
      <b-card class="border-0">
        <b>{{ user }}</b>
        <div>
          {{ discussions.content }}
        </div>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: 'User',
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
