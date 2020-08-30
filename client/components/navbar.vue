<template>
  <div>
    <b-nav pills>
      <b-nav-item
        v-for="(nav,i) in navs"
        :key="`item-${i}`"
        :href="`${nav.href}`"
        class="mt-2"
      >
        {{ nav.nav }}
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
          nav: 'Auth',
          href: '/'
        },
        {
          nav: 'Discussion',
          href: '/discussion'
        },
        {
          nav: 'My Courses',
          href: '/my-course'
        },
        {
          nav: 'Search Course',
          href: '/search-course'
        },
        {
          nav: 'Course Detail',
          href: '/course'
        }
      ]
    }
  }
}
</script>

<style>

</style>
