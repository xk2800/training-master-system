<template>
  <b-card class="border-round border-0 shadow-sm">
    <div v-if="discussions.length === 0">
      There's no discussion yet. Post the very first comment here!
    </div>
    <div>
      <b-card-group v-for="(discussion, i) in discussions" :key="`discussion-${i}`">
        <b-card class="border-0" :sub-title="discussion.name">
          <b-card-text>
            {{ discussion.content }}
            <b-button
              v-if="curruser === discussion.user_id"
              size="sm"
              class="float-right"
              variant="outline-danger"
              @click="onDelete(discussion.id)"
            >
              Delete
            </b-button>
          </b-card-text>
          <b-card-text class="grey"><em>{{ discussion.datetime }}</em></b-card-text>
        </b-card>
      </b-card-group>
    </div>
    <div>
      <b-form @submit="onSubmit">
        <b-form-group class="mt-4">
          <b-form-textarea
            v-model="content"
            type="text"
            class="form-control border-round"
            placeholder="Enter your discussions"
            rows="1"
          />
        </b-form-group>
        <b-row class="justify-content-center mt-4">
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </b-row>
      </b-form>
    </div>
  </b-card>
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
      nameMap: new Map(),
      discussions: [],
      content: '',
      curruser: this.$store.state.session.id
    }
  },
  created () {
    this.loadContent(0)
  },
  methods: {
    loadContent (offset) {
      this.$axios
        .get('/discussion', {
          params: {
            token: this.$store.state.session.token,
            limit: 7,
            offset,
            course_id: this.course.id
          }
        })
        .then((res) => {
          if (res.data.status === 0) {
            this.discussions = res.data.discussions.reverse()
            this.discussions.forEach(async (discussion) => {
              const id = discussion.user_id
              if (!this.nameMap.has(id)) {
                const { data } = await this.$axios.get('/name', { params: { id } })
                const name = data.name
                this.nameMap.set(id, name)
              }
              discussion.name = this.nameMap.get(id)
            })
          } else if (res.data.status === 1) {
            this.makeToast('Access denied!', 'Bad access token, please login and try again.', 'warning')
          }
        })
        .catch((error) => {
          this.makeToast('Cannot get message!', error, 'danger')
        })
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.$axios
        .post('/discussion', {
          token: this.$store.state.session.token,
          user_id: this.$store.state.session.id,
          course_id: this.course.id,
          content: this.content
        })
        .then((res) => {
          if (res.data.status === 0) {
            this.makeToast('Success!', 'Discussion successfully posted', 'success')
            this.loadContent(0)
          } else if (res.data.status === 1) {
            this.makeToast('Failed!', 'Message couldn\'t be sent', 'warning')
          }
        })
        .catch((error) => {
          this.makeToast('Internal Error', error, 'danger')
        })
        .finally(() => {
          this.content = ''
        })
    },
    makeToast (title, message, variant) {
      this.$bvToast.toast(message, {
        title,
        variant,
        autoHideDelay: 2500,
        appendToast: true
      })
    },
    onDelete (i) {
      this.$axios
        .delete('/discussion', {
          params: {
            token: this.$store.state.session.token,
            id: i
          }
        })
        .then((res) => {
          if (res.data.status === 0) {
            this.makeToast('Success!', 'Discussion successfully deleted', 'success')
            this.loadContent(0)
          } else if (res.data.status === 1) {
            this.makeToast('Failed!', 'Message could\'t be sent', 'warning')
          }
        })
        .catch((error) => {
          this.makeToast('Internal Error', error, 'danger')
        })
    }
  }
}
</script>

<style>

</style>
