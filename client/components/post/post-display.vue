<template>
  <b-container>
    <div v-if="posts.length===0 && userType === 2">
      Your trainer has not posted any material so far. If you think this is a mistake, please contact him/her via the feedback
    </div>
    <div v-else-if="posts.length===0 && userType === 1">
      You has not posted any material so far.
    </div>
    <div v-else-if="posts.length===0">
      The trainer has not posted any material so far.
    </div>
    <b-list-group>
      <b-list-group-item
        v-for="(post, index) in posts"
        :key="index"
        :class="{ active: index == currentIndex }"
      >
        <h4>{{ index + 1 }}. {{ post.title }}</h4>
        {{ post.desc }}
        <b-button-group class="float-right">
          <b-button variant="outline-info" @click="setActiveNDownload(post, index)">
            Download
          </b-button>
          <b-button v-if="userType === 1" v-b-modal.editModal variant="outline-warning" @click="setSelectedPost(post, index)">
            Edit Material
          </b-button>
          <b-button v-if="userType === 1" variant="outline-danger" @click="onDelete(post, index)">
            Delete
          </b-button>
        </b-button-group>
      </b-list-group-item>
    </b-list-group>
    <div v-if="userType === 1">
      <b-button-group class="mt-2">
        <b-button v-b-modal.postFormModal variant="outline-success">
          Add Material
        </b-button>
        <b-button variant="outline-danger" @click="deleteAll">
          Delete All
        </b-button>
      </b-button-group>
      <b-modal id="postFormModal" hide-footer title="Add Material" @hidden="refreshList">
        <postForm :course="course" />
      </b-modal>
      <b-modal id="editModal" hide-footer title="Edit Material" @hidden="refreshList">
        <editForm :course="course" :material="post" />
      </b-modal>
    </div>
  </b-container>
</template>

<script>
import postForm from './post-form'
import editForm from './edit-form'

export default {
  components: {
    postForm,
    editForm
  },
  props: {
    course: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      posts: [],
      currentPost: null,
      currentIndex: -1,
      userType: this.$store.state.session.type,
      post: null
    }
  },
  created () {
    this.retrieveMaterials()
  },
  methods: {
    setSelectedPost (post) {
      this.post = post
    },
    retrieveMaterials () {
      this.$axios
        .get('/post', {
          params: {
            token: this.$store.state.session.token,
            user_id: this.$store.state.session.id,
            course_id: this.course.id
          }
        })
        .then((res) => {
          if (res.data.status === 0) {
            this.posts = res.data.posts
          } else if (res.data.status === 1) {
            this.makeToast('Access denied!', 'Bad access token, please login and try again.', 'warning')
          }
        })
        .catch((error) => {
          this.makeToast('Cannot get message!', error, 'danger')
        })
    },
    deleteAll () {
      const dltConfirm = confirm('Are you sure to delete all materials?')
      if (dltConfirm) {
        this.$axios
          .delete('/post', {
            params: {
              token: this.$store.state.session.token,
              trainer_id: this.$store.state.session.id,
              course_id: this.course.id
            }
          })
          .then((res) => {
            this.makeToast('Success!', 'Materials have been deleted', 'success')
            this.refreshList()
          })
          .catch((err) => {
            console.log(err)
            this.makeToast('Error while deleting Material', err, 'danger')
          })
      }
    },
    onDelete (post, index) {
      const dltConfirm = confirm('Are you sure to delete this material?')
      if (dltConfirm) {
        this.$axios
          .delete('/post', {
            params: {
              token: this.$store.state.session.token,
              trainer_id: this.$store.state.session.id,
              course_id: this.course.id,
              post_id: post.id
            }
          })
          .then((res) => {
            this.makeToast('Success!', 'Materials have been deleted', 'success')
            this.refreshList()
          })
          .catch((err) => {
            console.log(err)
            this.makeToast('Error while deleting Material', err, 'danger')
          })
      }
    },
    refreshList () {
      this.retrieveMaterials()
      this.currentPost = null
      this.currentIndex = -1
    },
    setActiveNDownload (post, index) {
      this.currentPost = post
      this.currentIndex = index
      this.$axios({
        url: `http://localhost:8000/post/${post.id}`,
        method: 'GET',
        responseType: 'blob'
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', post.fileName)
        document.body.appendChild(link)
        link.click()
        this.makeToast('Downloading...', 'Please wait to download', 'success')
      }).catch((err) => {
        this.makeToast(`Error occurred while downloading material with id = ${post.id}`, err, 'danger')
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
