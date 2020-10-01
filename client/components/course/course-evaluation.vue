<template>
  <div>
    <div class="mt-2">
      <b-form @submit.prevent="submitRate()">
        <b-form-group label="1. The trainer is prepared">
          <b-form-radio-group id="rate1">
            <b-form-radio-group
              v-model="selectedRate1"
              :options="optionsRate1"
            />
          </b-form-radio-group>
        </b-form-group>
        <b-form-group label="2. The trainer encourages participation">
          <b-form-radio-group id="rate1">
            <b-form-radio-group
              v-model="selectedRate2"
              :options="optionsRate1"
            />
          </b-form-radio-group>
        </b-form-group>
        <b-form-group label="3. Interest of material">
          <b-form-radio-group id="rate1">
            <b-form-radio-group
              v-model="selectedRate3"
              :options="optionsRate1"
            />
          </b-form-radio-group>
        </b-form-group>
        <b-form-group label="4. Relevance of material">
          <b-form-radio-group id="rate1">
            <b-form-radio-group
              v-model="selectedRate4"
              :options="optionsRate1"
            />
          </b-form-radio-group>
        </b-form-group>
        <b-form-group label="5. Using training aids (overheads, videos, handouts)">
          <b-form-radio-group id="rate1">
            <b-form-radio-group
              v-model="selectedRate5"
              :options="optionsRate1"
            />
          </b-form-radio-group>
        </b-form-group>
        <b-form-group label="6. How pertinent were the training objectives to the target audience?">
          <b-form-radio-group id="rate1">
            <b-form-radio-group
              v-model="selectedRate6"
              :options="optionsRate1"
            />
          </b-form-radio-group>
        </b-form-group>
        <b-form-group label="7. How well do you feel the training objectives were met?">
          <b-form-radio-group id="rate1">
            <b-form-radio-group
              v-model="selectedRate7"
              :options="optionsRate1"
            />
          </b-form-radio-group>
        </b-form-group>
        <b-form-group label="8. How well do you feel the training objectives were met?">
          <b-form-radio-group id="rate1">
            <b-form-radio-group
              v-model="selectedRate8"
              :options="optionsRate1"
            />
          </b-form-radio-group>
        </b-form-group>
        <b-button block type="submit" variant="outline-primary">
          Submit
        </b-button>
        <p class="text-danger">Once submitted, no change is allowed</p>
      </b-form>
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
      selectedRate1: -1,
      selectedRate2: -1,
      selectedRate3: -1,
      selectedRate4: -1,
      selectedRate5: -1,
      selectedRate6: -1,
      selectedRate7: -1,
      selectedRate8: -1,
      optionsRate1: [
        { text: 'Poor', value: 1 },
        { text: 'Fair', value: 2 },
        { text: 'Average', value: 3 },
        { text: 'Good', value: 4 },
        { text: 'Excellent', value: 5 }
      ],
      courseSelected: this.course,
      grade: -1
    }
  },
  methods: {
    submitRate () {
      if (this.selectedRate1 === -1 || this.selectedRate2 === -1 || this.selectedRate3 === -1 || this.selectedRate4 === -1 || this.selectedRate5 === -1 || this.selectedRate6 === -1 || this.selectedRate7 === -1 || this.selectedRate8 === -1) {
        alert('All questions must be answered before submit')
        return
      }
      this.$axios
        .get('/enrollment', {
          params: {
            token: this.$store.state.session.token,
            user_id: this.$store.state.session.id,
            course_id: this.courseSelected.id
          }
        })
        .then((res) => {
          if (res.data.status === 0) {
            let rateNum = res.data.traineeRateNum
            if (rateNum < 1) {
              rateNum += 1
              this.grade = (((this.selectedRate1 + this.selectedRate2 + this.selectedRate3 + this.selectedRate4 + this.selectedRate5 + this.selectedRate6 + this.selectedRate7 + this.selectedRate7) / 5) / 8)
              this.$axios
                .put('/trainer-rate', {
                  params: {
                    token: this.$store.state.session.token,
                    trainer_id: this.course.trainer_id,
                    rating: this.grade
                  }
                })
                .then((res) => {
                  if (res.data.status === 0) {
                    this.$axios
                      .put('/course-rateNum', {
                        params: {
                          token: this.$store.state.session.token,
                          trainer_id: this.courseSelected.trainer_id,
                          course_id: this.courseSelected.id,
                          trainee_id: this.$store.state.session.id,
                          traineeRateNum: rateNum
                        }
                      })
                      .then((res) => {
                      })
                      .catch((err) => {
                        console.log(err)
                        console.log('Fail to update rate num')
                      })
                    this.makeToast('Success!', 'You have submitted the review for this trainer', 'success')
                    this.selectedRate1 = -1
                    this.selectedRate2 = -1
                    this.selectedRate3 = -1
                    this.selectedRate4 = -1
                    this.selectedRate5 = -1
                    this.selectedRate6 = -1
                    this.selectedRate7 = -1
                    this.selectedRate8 = -1
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
          }
        })
        .catch((err) => {
          console.log(err)
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
