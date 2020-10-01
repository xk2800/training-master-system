<template>
  <div>
    <b-container>
      <b-row class="align-self-center vertical-center">
        <b-col lg="6" md="12" class="mx-auto">
          <Title class="text-center mt-3 bold">
            Welcome back {{ name }}!
          </Title>
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
            <b-card class="border-0 border-round shadow-sm">
              <b-card-title class="text-center">
                {{ nav.title }}
              </b-card-title>
              <b-card-body class="text-center">
                <b-img :src="`/${nav.image}`" fluid />
              </b-card-body>
            </b-card>
          </n-link>
        </b-col>
        <b-col
          v-for="(reportNav, i) in reportNavs"
          :key="`reportNav${i}`"
          lg="4"
          sm="10"
        >
          <n-link v-if="type !== 2" class="text-decoration-none" :to="reportNav.href">
            <b-card class="border-0 border-round shadow-sm">
              <b-card-title class="text-center">
                {{ reportNav.title }}
              </b-card-title>
              <b-card-body class="text-center">
                <b-img :src="`/${reportNav.image}`" fluid />
              </b-card-body>
            </b-card>
          </n-link>
          <n-link v-else class="text-decoration-none" :to="reportNav.href">
            <b-card class="border-0 border-round shadow-sm">
              <b-card-title class="text-center">
                Personal Report
              </b-card-title>
              <b-card-body class="text-center">
                <b-img :src="`/performance.png`" fluid />
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
          title: 'Search Course',
          image: 'searchcourse.png',
          href: '/u/course/search'
        }
      ],
      reportNavs: [
        {
          title: 'Generate Report',
          image: 'report.png',
          href: '/u/report/report'
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
