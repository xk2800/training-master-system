<template>
  <b-container>
    <b-row class="align-self-center vertical-center">
      <b-col lg="6" md="12" class="mx-auto">
        <b-card class="px-sm-1 px-md-3 py-2 border-round">
          <Title class="text-center my-3 bold">
            Training Master System
          </Title>
          <AuthTab />
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AuthTab from '~/components/index/auth-tabs'
import Title from '~/components/text/title'

export default {
  components: {
    AuthTab,
    Title
  }
}
</script>

<style>
.vertical-center {
  padding-top: 10rem;
  padding-bottom: 15rem;
}

body {
  background-color: rgb(69, 177, 247);
}
</style>
