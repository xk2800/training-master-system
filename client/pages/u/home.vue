<template>
  <div>
    <b-container>
      <b-row class="align-self-center vertical-center">
        <b-col lg="6" md="12" class="mx-auto">
          <Title class="text-center my-3 bold">
            Welcome back!
          </Title>
          <div class="text-center">
            {{ name }}
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          v-for="(nav, i) in navs"
          :key="`nav${i}`"
          lg="4"
          sm="10"
        >
          <n-link class="text-decoration-none" :to="nav.href">
            <b-card class="border-0 border-round shadow-sm mt-2">
              <b-card-title class="text-center">
                {{ nav.title }}
              </b-card-title>
              <b-card-body class="text-center">
                <b-img :src="`/${nav.image}`" fluid />
              </b-card-body>
            </b-card>
          </n-link>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          v-for="(adminNav, i) in adminNavs"
          :key="`adminNav${i}`"
          lg="4"
          sm="10"
        >
          <n-link v-if="type === 0" class="text-decoration-none" :to="adminNav.href">
            <b-card class="border-0 border-round shadow-sm mt-2">
              <b-card-title class="text-center">
                {{ adminNav.title }}
              </b-card-title>
              <b-card-body class="text-center">
                <b-img :src="`/${adminNav.image}`" fluid />
              </b-card-body>
            </b-card>
          </n-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

export default {
  middleware: 'authenticated',
  data () {
    return {
      type: this.$store.state.session.type,
      name: '',
      navs: [
        {
          title: 'My Courses',
          image: 'mycourse.png',
          href: '/u/course/mycourse'
        },
        {
          title: 'Discussion',
          image: 'discussion.png',
          href: '/u/discussion'
        },
        {
          title: 'Search Course',
          image: 'searchcourse.png',
          href: '/u/course/search'
        }
      ],
      adminNavs: [
        {
          title: 'Generate Report',
          image: 'report.png',
          href: '/u/course/report'
        }
      ]
    }
  },
  created () {
    this.getName()
  },
  methods: {
    getName () {
      this.$axios
        .get('/name', {
          params: {
            id: this.$store.state.session.id
          }
        })
        .then((res) => {
          this.name = res.data.name
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.vertical-center {
  padding-top: 10rem;
  padding-bottom: 5rem;
}

.text-decoration-none {
  text-decoration: none;
}
</style>
