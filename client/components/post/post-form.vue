<template>
  <b-form @submit="savePost" @reset="onReset" v-if="show">
    <b-form-group
      id="getTitle"
      label="Title: "
      label-for="title"
    >
      <b-form-input
        id="title"
        v-model="title"
        type="text"
        required
        placeholder="Enter Title"
      />
    </b-form-group>

    <b-form-group
      id="getDesc"
      label="Description: "
      label-for="Desc"
    >
      <b-form-input
        id="Desc"
        v-model="desc"
        type="text"
        placeholder="Enter Description (optional)"
      />
    </b-form-group>

    <b-form-group
      id="getMaterial"
      label="Material: "
      label-for="material"
    >
      <b-form-file
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a file or drop it here"
        drop-placeholder="Drop file here..."
      />
    </b-form-group>
    <div class="mt-3">
      Selected file: {{ file ? file.name: '' }}
    </div>

    <b-button type="submit" variant="primary">
      Submit
    </b-button>
  </b-form>
</template>

<script>

</script>

<style>

</style>
