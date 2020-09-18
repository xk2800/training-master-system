<template>
  <div>
    <b-button v-b-toggle.sidebar-variant class="mt-3 ml-3"><i class="fa fa-bars mr-3" />Navigation</b-button>
    <b-sidebar id="sidebar-variant" title="Training Master System" bg-variant="dark" text-variant="light" shadow>
      <div class="px-3 py-2 text-center">
        <b-img src="/profile.png" class="mb-3" fluid></b-img>
        <b-button
          v-for="(nav,i) in navs"
          :key="`item-${i}`"
          variant="light"
          class="border-round"
          block
        >
          <n-link :to="nav.href" class="no-deco">
            {{ nav.nav }}
          </n-link>
        </b-button>
        <b-button
          variant="light"
          class="border-round"
          block
        >
          <n-link :to="adminNav.href" class="no-deco">
            {{ adminNav.nav }}
          </n-link>
        </b-button>
        <b-button
          variant="danger"
          class="border-round"
          block
          @click="logout()"
        >
          Sign Out
        </b-button>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navs: [
        {
          nav: 'Home',
          href: '/u/home'
        },
        {
          nav: 'My Courses',
          href: '/u/course/mycourse'
        },
        {
          nav: 'Search Courses',
          href: '/u/course/search'
        },
        {
          nav: 'Discussion Forums',
          href: '/u/discussion'
        }
      ],
      adminNav: {
        nav: 'Generate Report',
        href: '/u/report'
      }
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.go('/')
    }
  }
}
</script>

<style>
.no-deco {
  text-decoration: none;
  color: black;
}

.no-deco:hover {
  text-decoration: none;
  color: black;
}
</style>
