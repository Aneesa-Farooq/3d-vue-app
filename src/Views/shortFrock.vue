<template>
  <canvas id="c" class="canvas"> </canvas>

  <div class="controls">
    <div id="js-tray" class="tray">
      <div id="js-tray-slide" class="tray__slide"></div>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import axios from "axios";

export default {
  name: "ShortFrock",
  data() {
    return {
      postData: [],
    };
  },
  mounted() {
    const canvasOnDom = document.querySelectorAll(".canvas");
    if (canvasOnDom.length > 1) {
      canvasOnDom[0].remove();
      console.log("hello");
    }

    const TRAY = document.getElementById("js-tray-slide");
    var activeOption = "FO_001_Buttons_0";

    const colors = [];
    axios
      .get("https://vdesigners.herokuapp.com/api/project/getProjects")
      .then((response) => {
        console.log(response.data);
        this.postData = response.data;
        console.log("Data is printed");
        console.log(this.postData);
        for (let i = 0; i < this.postData.length; i++) {
          colors.push({
            texture: response.data[i].image[0],
            size: [3, 3, 3],
            shininess: 0,
          });
        }
        console.log(colors);
        const BACKGROUND_COLOR = 0xf1f1f1;

        // Init the scene
        const scene = new THREE.Scene();

        // Set background
        scene.background = new THREE.Color(BACKGROUND_COLOR);
        //scene.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100);

        const canvas = document.querySelector("#c");

        // Init the renderer
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.shadowMap.enabled = true;
        renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(renderer.domElement);

        // Add a camera
        var camera = new THREE.PerspectiveCamera(4, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.set(50, 0, 110);

        // var camerahelper = new THREE.CameraHelper(camera);
        // scene.add(camerahelper);

        // var axesHelper = new THREE.AxesHelper(5);
        // scene.add(axesHelper);
        var theModel;
        var gltfLoader = new GLTFLoader();

        const INITIAL_MTL = new THREE.MeshPhongMaterial({ color: 0x808080, shininess: 10 });

        const INITIAL_MAP = [
          { childID: "06_Jacket_06_Jacket_0", mtl: INITIAL_MTL },
          { childID: "06_Jacket_06_Jacket_0_1", mtl: INITIAL_MTL },
          { childID: "06_Jacket_06_Jacket_0_2", mtl: INITIAL_MTL },
          { childID: "06_Jacket_06_Jacket_0_3", mtl: INITIAL_MTL },
        ];

        // Function - Add the textures to the models
        function initColor(parent, type, mtl) {
          parent.traverse((o) => {
            if (o.isMesh) {
              if (o.name.includes(type)) {
                o.material = mtl;
                o.nameID = type; // Set a new property to identify this object
              }
            }
          });
        }

        gltfLoader.load("/assets/shortFrock/scene.gltf", function (gltf) {
          theModel = gltf.scene;
          theModel.position.y = -4;
          // Add the model to the scene
          theModel.traverse((o) => {
            if (o.isMesh) {
              o.material.side = THREE.DoubleSide;
              console.log(o);
              o.castShadow = true;
              o.receiveShadow = true;
            }
          });
          theModel.scale.set(4, 4, 4);

          // Set initial textures
          for (let object of INITIAL_MAP) {
            initColor(theModel, object.childID, object.mtl);
          }
          scene.add(theModel);
        });

        var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
        hemiLight.position.set(0, 50, 0);
        // Add hemisphere light to scene
        scene.add(hemiLight);

        var dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
        dirLight.position.set(-8, 12, 8);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
        // Add directional Light to scene
        scene.add(dirLight);

        var orbit = new OrbitControls(camera, renderer.domElement);
        orbit.update();

        function animate() {
          renderer.render(scene, camera);
          requestAnimationFrame(animate);

          if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
          }
        }

        animate();

        function resizeRendererToDisplaySize(renderer) {
          const canvas = renderer.domElement;
          var width = window.innerWidth;
          var height = window.innerHeight;
          var canvasPixelWidth = canvas.width / window.devicePixelRatio;
          var canvasPixelHeight = canvas.height / window.devicePixelRatio;

          const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
          if (needResize) {
            renderer.setSize(width, height, false);
          }
          return needResize;
        }

        // Function - Build Colors
        function buildColors(colors) {
          for (let [i, color] of colors.entries()) {
            let swatch = document.createElement("div");
            swatch.classList.add("tray__swatch");

            if (color.texture) {
              swatch.style.backgroundImage = "url(" + color.texture + ")";
            } else {
              swatch.style.background = "#" + color.color;
            }

            swatch.setAttribute("data-key", i);
            TRAY.append(swatch);
          }
        }
        buildColors(colors);

        // Select Option
        const options = document.querySelectorAll(".option");

        for (const option of options) {
          option.addEventListener("click", selectOption);
        }

        function selectOption(e) {
          let option = e.target.closest(".option");
          activeOption = e.target.closest(".option").dataset.option;
          for (const otherOption of options) {
            otherOption.classList.remove("--is-active");
          }
          option.classList.add("--is-active");
        }
        // Swatches
        const swatches = document.querySelectorAll(".tray__swatch");

        for (const swatch of swatches) {
          swatch.addEventListener("click", selectSwatch);
        }

        function selectSwatch(e) {
          let color = colors[parseInt(e.target.dataset.key)];
          let new_mtl;

          if (color.texture) {
            let txt = new THREE.TextureLoader().load(color.texture);

            txt.repeat.set(color.size[0], color.size[1], color.size[2]);
            txt.wrapS = THREE.RepeatWrapping;
            txt.wrapT = THREE.RepeatWrapping;

            new_mtl = new THREE.MeshPhongMaterial({
              map: txt,
              shininess: color.shininess ? color.shininess : 10,
            });
          } else {
            new_mtl = new THREE.MeshPhongMaterial({
              color: parseInt("0x" + color.color),
              shininess: color.shininess ? color.shininess : 10,
            });
          }

          setMaterial(theModel, "06_Jacket_06_Jacket_0_1", new_mtl);
        }

        function setMaterial(parent, type, mtl) {
          parent.traverse((o) => {
            if (o.isMesh && o.nameID != null) {
              if (o.nameID == type) {
                o.material = mtl;
              }
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    var slider = document.getElementById("js-tray"),
      sliderItems = document.getElementById("js-tray-slide"),
      difference;

    function slide(wrapper, items) {
      var posX1 = 0,
        posX2 = 0,
        posInitial,
        threshold = 20,
        posFinal,
        slides = items.getElementsByClassName("tray__swatch");

      // Mouse events
      items.onmousedown = dragStart;

      // Touch events
      items.addEventListener("touchstart", dragStart);
      items.addEventListener("touchend", dragEnd);
      items.addEventListener("touchmove", dragAction);

      function dragStart(e) {
        e = e || window.event;
        posInitial = items.offsetLeft;
        difference = sliderItems.offsetWidth - slider.offsetWidth;
        difference = difference * -1;

        if (e.type == "touchstart") {
          posX1 = e.touches[0].clientX;
        } else {
          posX1 = e.clientX;
          document.onmouseup = dragEnd;
          document.onmousemove = dragAction;
        }
      }

      function dragAction(e) {
        e = e || window.event;

        if (e.type == "touchmove") {
          posX2 = posX1 - e.touches[0].clientX;
          posX1 = e.touches[0].clientX;
        } else {
          posX2 = posX1 - e.clientX;
          posX1 = e.clientX;
        }

        if (items.offsetLeft - posX2 <= 0 && items.offsetLeft - posX2 >= difference) {
          items.style.left = items.offsetLeft - posX2 + "px";
        }
      }

      function dragEnd(e) {
        posFinal = items.offsetLeft;
        if (posFinal - posInitial < -threshold) {
        } else if (posFinal - posInitial > threshold) {
        } else {
          items.style.left = posInitial + "px";
        }

        document.onmouseup = null;
        document.onmousemove = null;
      }
    }

    slide(slider, sliderItems);
  },
};
</script>
