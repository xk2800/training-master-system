<template>
  <div>
    <b-container>
      <Title class="text-center my-3 bold">
        Discussion Forum
      </Title>
      <Discussionboard />
    </b-container>
  </div>
</template>

<script>
import Title from '~/components/text/title'
import Discussionboard from '~/components/discussion/discussion-board'

export default {
  middleware: 'authenticated',
  components: {
    Title,
    Discussionboard
  }
}
</script>

<style scoped>
body {
  background-color: rgb(247, 247, 247);
}
</style>
