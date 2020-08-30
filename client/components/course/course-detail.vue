<template>
  <div>
    <b-card class="border-round border-0 shadow-sm mt-3">
      <b-card-title>{{ courseTitle }}</b-card-title>
      <b-card-sub-title>{{ courseTrainer }}</b-card-sub-title>
      <b-card-text class="mt-2">
        {{ courseDesc }}
      </b-card-text>
      <b-button variant="outline-success" href="#">
        Enroll Course
      </b-button>
      <b-button variant="outline-danger" href="#">
        Drop Course
      </b-button>
      <div class="mt-2">
        <b-button v-b-modal="feedback" variant="outline-primary">
          Submit a feedback
        </b-button>
      </div>
    </b-card>
    <b-modal :id="feedback" title="Submit a feedback" :hide-header="true" :hide-footer="true">
      <Feedbackboard />
    </b-modal>
  </div>
</template>

<script>
import Feedbackboard from '~/components/feedback/feedback-board'

export default {
  components: {
    Feedbackboard
  },
  data () {
    return {
      courseTitle: 'Course 1',
      courseTrainer: 'Trainer 1',
      courseDesc: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.'
    }
  }
}
</script>

<style>

</style>
