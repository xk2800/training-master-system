<template>
  <div>
    <b>Trainees Record List</b>
    <div class="mt-2">
      <b-table
        bordered
        outlined
        hover
        :items="trainees"
        :fields="fields"
        @row-clicked="item=>$set(item, '_showDetails', !item._showDetails)"
      >
        <template v-slot:row-details="row">
          <b-card>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm">
                <b>Grade: </b>
              </b-col>
              <b-col>{{ row.item.grade }}</b-col>
              <b-col sm="3" class="text-sm">
                <b>Progress: </b>
              </b-col>
              <b-col>{{ row.item.progress }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm">
                <b>Number of Rate submitted: </b>
              </b-col>
              <b-col>{{ row.item.rateSubmitted }}</b-col>
              <b-col v-if="row.item.rateSubmitted < course.duration" sm="3">
                <b-button variant="outline-info" size="sm" @click="$bvModal.show('submitRate')">
                  Submit a Rate
                </b-button>
              </b-col>
            </b-row>
            <b-modal id="submitRate" size="lg" title="Training Record" centered hide-footer>
              <b-form @submit.prevent="submitRate(row.item.trainee_id, row.item.rateSubmitted, row.item.grade)">
                <b-form-group label="Did this trainee attend the training session?">
                  <b-form-radio-group id="attendance" required>
                    <b-form-radio-group
                      v-model="selected"
                      :options="options"
                    />
                  </b-form-radio-group>
                </b-form-group>
                <b-form-group v-if="selected === 1" label="1. How well do you think this trainee perform during the training session?">
                  <b-form-radio-group id="rate1">
                    <b-form-radio-group
                      v-model="selectedRate1"
                      :options="optionsRate1"
                    />
                  </b-form-radio-group>
                </b-form-group>
                <b-form-group v-if="selected === 1" label="2. Quality of Work – Accuracy, thoroughness">
                  <b-form-radio-group id="rate1">
                    <b-form-radio-group
                      v-model="selectedRate2"
                      :options="optionsRate1"
                    />
                  </b-form-radio-group>
                </b-form-group>
                <b-form-group v-if="selected === 1" label="3. Ability to Learn – Grasps and retains new skills">
                  <b-form-radio-group id="rate1">
                    <b-form-radio-group
                      v-model="selectedRate3"
                      :options="optionsRate1"
                    />
                  </b-form-radio-group>
                </b-form-group>
                <b-form-group v-if="selected === 1" label="4. Works independently">
                  <b-form-radio-group id="rate1">
                    <b-form-radio-group
                      v-model="selectedRate4"
                      :options="optionsRate1"
                    />
                  </b-form-radio-group>
                </b-form-group>
                <b-form-group v-if="selected === 1" label="5. Team player – ability to work effectively with others">
                  <b-form-radio-group id="rate1">
                    <b-form-radio-group
                      v-model="selectedRate5"
                      :options="optionsRate1"
                    />
                  </b-form-radio-group>
                </b-form-group>
                <b-form-group v-if="selected === 1" label="6. Quantity of Work – Volume, pace and effort ">
                  <b-form-radio-group id="rate1">
                    <b-form-radio-group
                      v-model="selectedRate6"
                      :options="optionsRate1"
                    />
                  </b-form-radio-group>
                </b-form-group>
                <b-form-group v-if="selected === 1" label="7. Understands significance of training ">
                  <b-form-radio-group id="rate1">
                    <b-form-radio-group
                      v-model="selectedRate7"
                      :options="optionsRate1"
                    />
                  </b-form-radio-group>
                </b-form-group>
                <b-button block type="submit" variant="outline-primary">
                  Submit
                </b-button>
                <p>Once submitted, no change is allowed</p>
              </b-form>
            </b-modal>
          </b-card>
        </template>
      </b-table>
      <div>
        Total number of trainee: {{ trainees.length }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    course: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      selected: -1,
      selectedRate1: -1,
      selectedRate2: -1,
      selectedRate3: -1,
      selectedRate4: -1,
      selectedRate5: -1,
      selectedRate6: -1,
      selectedRate7: -1,
      trainees: [],
      options: [
        { text: 'Yes', value: 1 },
        { text: 'No', value: 0 }
      ],
      optionsRate1: [
        { text: 'Poor', value: 1 },
        { text: 'Fair', value: 2 },
        { text: 'Average', value: 3 },
        { text: 'Good', value: 4 },
        { text: 'Excellent', value: 5 }
      ],
      fields: [
        {
          key: 'trainee_id',
          label: 'Trainee ID'
        },
        {
          key: 'name',
          label: 'Trainee Name'
        },
        {
          key: 'email',
          label: 'Email'
        },
        {
          key: 'enrollDate',
          label: 'Enrolled Since'
        }
      ]
    }
  },
  mounted () {
    this.getTrainees()
  },
  methods: {
    submitRate (traineeId, rateNum, grade) {
      if (this.selected === -1) {
        alert('Please select one of the options first')
        return
      } else if (this.selected === 1 && (this.selectedRate1 === -1 || this.selectedRate2 === -1 || this.selectedRate3 === -1 || this.selectedRate4 === -1 || this.selectedRate5 === -1 || this.selectedRate6 === -1 || this.selectedRate7 === -1)) {
        alert('All questions must be answered before submit')
        return
      } else if (this.selected === 0) {
        this.selectedRate1 = 0
        this.selectedRate2 = 0
        this.selectedRate3 = 0
        this.selectedRate4 = 0
        this.selectedRate5 = 0
        this.selectedRate6 = 0
        this.selectedRate7 = 0
      }
      if (rateNum < this.course.duration) {
        rateNum += 1
        this.grade = grade + (((this.selectedRate1 + this.selectedRate2 + this.selectedRate3 + this.selectedRate4 + this.selectedRate5 + this.selectedRate6 + this.selectedRate7) / 5) / 7 * (100 / rateNum))
        if (this.grade === undefined) {
          this.grade = grade
        }
        this.progress = rateNum / this.course.duration * 100
        this.$axios
          .put('/course-rate', {
            params: {
              token: this.$store.state.session.token,
              trainer_id: this.course.trainer_id,
              course_id: this.course.id,
              trainee_id: traineeId,
              rateSubmitted: rateNum,
              grade: this.grade,
              progress: this.progress
            }
          })
          .then((res) => {
            if (res.data.status === 0) {
              this.makeToast('Success!', 'You have submitted the review for this trainee', 'success')
              this.selected = -1
              this.selectedRate1 = -1
              this.selectedRate2 = -1
              this.selectedRate3 = -1
              this.selectedRate4 = -1
              this.selectedRate5 = -1
              this.selectedRate6 = -1
              this.selectedRate7 = -1
            } else if (res.data.status === 1) {
              this.makeToast('Access denied!', 'Bad access token, please login and try again.', 'warning')
            }
          })
          .catch((err) => {
            console.log(err)
            this.makeToast('Internal Error', err, 'danger')
          })
      } else {
        this.makeToast('Sorry!', 'The maximum number of review is achieved', 'danger')
      }
    },
    getTrainees () {
      this.$axios
        .get('/report-trainee', {
          params: {
            token: this.$store.state.session.token,
            user_id: this.$store.state.session.id,
            course_id: this.course.id
          }
        })
        .then((res) => {
          if (res.data.status === 0) {
            this.trainees = res.data.trainees
          } else if (res.data.status === 1) {
            this.makeToast('Access denied!', 'Bad access token, please login and try again.', 'warning')
          }
        })
        .catch((err) => {
          this.makeToast('Internal Error', err, 'danger')
        })
    },
    makeToast (title, message, variant) {
      this.$bvToast.toast(message, {
        title,
        variant,
        autoHideDelay: 2500,
        appendToast: true
      })
    }
  }
}
</script>

<style>

</style>
