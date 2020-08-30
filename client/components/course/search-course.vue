<template>
  <div>
    <input class="form-control border-round" type="text" placeholder="Search" aria-label="Search">
    <div class="mt-4">
      <Coursepreview />
    </div>
  </div>
</template>

<script>
import Coursepreview from '~/components/course/course-preview'

export default {
  components: {
    Coursepreview
  }
}
</script>

<style>

</style>
