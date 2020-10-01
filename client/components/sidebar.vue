<template>
  <div>
    <b-button v-b-toggle.sidebar-variant class="mt-3 ml-3">
      <i class="fa fa-bars mr-3" />Navigation
    </b-button>
    <b-sidebar id="sidebar-variant" title="Training Master System" bg-variant="dark" text-variant="light" shadow>
      <div class="px-3 py-2 text-center">
        <b-img src="/profile.png" class="mb-3" fluid />
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
          v-if="userType !== 2"
          variant="light"
          class="border-round"
          block
        >
          <n-link :to="reportNav.href" class="no-deco">
            {{ reportNav.nav }}
          </n-link>
        </b-button>
        <b-button
          v-if="userType === 2"
          variant="light"
          class="border-round"
          block
        >
          <n-link :to="reportNav.href" class="no-deco">
            Personal Report
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
      userType: this.$store.state.session.type,
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
        }
      ],
      reportNav: {
        nav: 'Generate Report',
        href: '/u/report/report'
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
