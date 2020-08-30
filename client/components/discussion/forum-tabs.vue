<template>
  <b-tabs pills align="center">
    <b-tab title="Create" active>
      <Create />
    </b-tab>
    <b-tab title="View">
      <Content />
    </b-tab>
  </b-tabs>
</template>

<script>
import Content from '~/components/discussion/content.vue'
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
