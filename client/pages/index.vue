<template>
  <div>
    <b-container>
      <b-row class="align-self-center vertical-center">
        <b-col lg="6" md="12" class="mx-auto">
          <b-card class="px-sm-1 px-md-3 py-2 border-round shadow border-0" style="background-color: rgb(247, 247, 247)">
            <Title class="text-center my-3 bold">
              Training Master System
            </Title>
            <AuthTab />
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import AuthTab from '~/components/index/auth-tabs'
import Title from '~/components/text/title'

export default {
  layout: 'auth',
  middleware: 'redirect',
  components: {
    AuthTab,
    Title
  }
}
</script>

<style scoped>
.vertical-center {
  padding-top: 10rem;
  padding-bottom: 15rem;
}
</style>
