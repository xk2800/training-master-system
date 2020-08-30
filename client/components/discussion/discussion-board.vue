<template>
  <b-card class="border-round border-0 shadow-sm">
    <Content />
    <Create />
  </b-card>
</template>

<script>
import Content from '~/components/discussion/discussion-content.vue'
import Create from '~/components/discussion/discussion-create.vue'

export default {
  components: {
    Content,
    Create
  }
}
</script>

<style>

</style>
