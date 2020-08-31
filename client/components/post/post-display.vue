<template>
  <b-container>
    <b-list-group>
      <b-list-group-item
        v-for="(post, index) in posts"
        :key="index"
        :class="{ active: index == currentIndex }"
        @click="setActiveNDownload(post, index)"
      >
        <h4>{{ post.title }}</h4>
        {{ post.desc }}
      </b-list-group-item>
    </b-list-group>
    <!-- Should only be displayed for the trainer -->
    <b-button-group class="mt-2">
      <b-button @click="deleteAll">Delete All</b-button>
      <b-button v-b-modal.postFormModal>
        Add Material
      </b-button>
    </b-button-group>
    <b-modal id="postFormModal" hide-footer title="Add Material">
      <postForm />
    </b-modal>
  </b-container>
</template>

<script>

</script>
