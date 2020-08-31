<template>
  <div>
    <Navbar />
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
import Navbar from '~/components/navbar'
import Discussionboard from '~/components/discussion/discussion-board'

export default {
  middleware: 'authenticated',
  components: {
    Navbar,
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
