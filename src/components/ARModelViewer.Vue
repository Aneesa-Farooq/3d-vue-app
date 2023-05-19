<template>
    <div id="card">
      <model-viewer
        src="https://cdn.glitch.me/81dd8c77-da82-4f08-a6d3-061e396b1c3e/dress_3_la_dame_a_la_licorne.glb?v=1683915695442"
        poster="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b%2Fposter-astronaut.png?v=1599079951717"
        alt="A 3D model of an astronaut"
        shadow-intensity="1"
        camera-controls
        auto-rotate
        ar
      ></model-viewer>
      <section class="attribution">
        <span>
          <h1>PATTERN GENERATION</h1>
          <span>By <a href="https://poly.google.com/view/dLHpzNdygsg" target="_blank">VDESIGNER</a></span>
        </span>
        <a class="cc" href="https://creativecommons.org/licenses/by/2.0/" target="_blank">
          <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg">
          <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg">
        </a>
      </section>
    </div>
  </template>
  
  <script>
  //import '@google/model-viewer/dist/model-viewer.min.js';
  export default {
    name: "ARModelViewer",
    data() {
      return {
        modelSrc:"https://cdn.glitch.me/81dd8c77-da82-4f08-a6d3-061e396b1c3e/dress_3_la_dame_a_la_licorne.glb?v=1683915695442",
        posterSrc: require("@/assets/load-icon.png")+ "?v=" + Date.now(),
      };
    },
  };
  </script>
  
  <style scoped>
  #card {
    margin: 3em auto;
    display: flex;
    flex-direction: column;
    max-width: 600px;
    border-radius: 6px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
    overflow: hidden;
  }
  
  model-viewer {
    width: 100%;
    height: 400px;
    background-color: #70BCD1;
    --poster-color: #ffffff00;
  }
  
  .attribution {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 1em;
  }
  
  .attribution h1 {
    margin: 0 0 0.25em;
  }
  
  .attribution img {
    opacity: 0.5;
    height: 2em;
  }
  
  .attribution .cc {
    flex-shrink: 0;
    text-decoration: none;
  }
  .ar-model-viewer {
  width: 100%;
  height: 400px;
  background-color: #70BCD1;
  --poster-color: #ffffff00;
}
  </style>
  