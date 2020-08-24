<template>
  <div>
    <b-card :v-for="contents in content" title="Discussion Forum" class="mb-2 text-center">
      {{ contents }}
    </b-card>
  </div>
</template>

<script>
export default {
  data () {
    return{
      content: []
    }
  },
  methods: {
    loadContent() {
      this.$axios.get('http://localhost:8000/discussion/')
      .then((res) => {
        content = res.data.content;
      })
    }
  }
}
</script>

<style>

</style>
