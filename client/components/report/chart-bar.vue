<template>
  <div class="container">
    <bar-chart v-if="loaded" :data="barChartData" :options="barChartOptions" :height="200" />
  </div>
</template>

<script>
import BarChart from './chart-bar.js'

const chartColors = {
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)'
}

export default {
  components: {
    BarChart
  },
  data () {
    return {
      loaded: false,
      barChartData: {
        labels: [],
        datasets: [
          {
            label: 'Grade',
            backgroundColor: chartColors.green,
            data: []
          },
          {
            label: 'Progress',
            backgroundColor: chartColors.blue,
            data: []
          }
        ]
      },
      barChartOptions: {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'My Performance Overview'
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    }
  },
  created () {
    this.getAllCourse()
  },
  methods: {
    getAllCourse () {
      this.$axios
        .get('/enrolled-course', {
          params: {
            token: this.$store.state.session.token,
            user_id: this.$store.state.session.id,
            type: this.$store.state.session.type
          }
        })
        .then((res) => {
          this.barChartData.labels = res.data.courses.map(course => course.title)
          console.log(this.barChartData.labels)
          res.data.courses.forEach((course) => {
            this.barChartData.datasets[0].data.push(course.grade)
            this.barChartData.datasets[1].data.push(course.progress)
          })
          this.loaded = true
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
