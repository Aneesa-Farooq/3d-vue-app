<template>
    <div class="ar">
      <ARModelViewer />
    </div>
  </template>
  <script>
  import ARModelViewer from '../components/ARModelViewer.Vue';
  export default {
  name: "Augmented",
  components: {
    ARModelViewer,
  },
};
  </script>
  <style>
  .ar {
    margin: 1em;
    padding: 0;
    font-family: Google Sans, Noto, Roboto, Helvetica Neue, sans-serif;
    color: #244376;
  }
  </style>