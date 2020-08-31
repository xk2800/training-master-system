<template>
  <div>
    <b-nav pills>
      <b-nav-item
        v-for="(nav,i) in navs"
        :key="`item-${i}`"
        class="mt-2"
      >
        <n-link :to="nav.href">
          {{ nav.nav }}
        </n-link>
      </b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navs: [
        {
          nav: 'Discussion',
          href: '/u/discussion'
        },
        {
          nav: 'My Courses',
          href: '/u/course'
        },
        {
          nav: 'Search Course',
          href: '/u/course/search'
        }
      ]
    }
  }
}
</script>

<style>

</style>
