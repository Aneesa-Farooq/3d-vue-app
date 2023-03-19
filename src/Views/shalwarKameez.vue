<template>
  <div class="options">
    <div class="option --is-active" data-option="CC_Base_Teeth2_lambert2_0">
      <p>Kameez</p>
    </div>
    <div class="option" data-option="CC_Base_Teeth2_lambert3_0">
      <p>Shalwar</p>
    </div>
  </div>
  <canvas id="c" class="canvas"></canvas>
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

export default {
  name: "ShalwarKameez",
  mounted() {
    const canvasOnDom = document.querySelectorAll(".canvas");
    if (canvasOnDom.length  > 1){
      canvasOnDom[0].remove();
      console.log("hello")
    }
    
    const TRAY = document.getElementById("js-tray-slide");
    var activeOption = "CC_Base_Teeth2_lambert2_0";

    const colors = [
      {
        texture: "/assets/flowers.jpg",
        size: [2, 2, 2],
        shininess: 60,
      },
      {
        texture: "/assets/flower2.jpg",
        size: [3, 3, 3],
        shininess: 0,
      },
      {
        color: "66533C",
      },
      {
        color: "173A2F",
      },
      {
        color: "153944",
      },
      {
        color: "7B4E5D",
      },
      {
        color: "438AAC",
      },
    ];

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
    var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(50, 0, 110);
    camera.lookAt(0, 0, 0);

    // var camerahelper=new THREE.CameraHelper(camera);
    // scene.add(camerahelper);

    var axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    var theModel;
    var gltfLoader = new GLTFLoader();

    const INITIAL_MTL = new THREE.MeshPhongMaterial({ color: 0x808080, shininess: 10 });

    const INITIAL_MAP = [
      { childID: "CC_Base_Teeth2_lambert2_0", mtl: INITIAL_MTL },
      { childID: "CC_Base_Teeth2_lambert3_0", mtl: INITIAL_MTL },
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

    gltfLoader.load("/assets/shalwarKameez/scene.gltf", function (gltf) {
      theModel = gltf.scene;
      theModel.position.y = -25;
      theModel.position.x = -50;
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

    // Select Option
    const options = document.querySelectorAll(".option");

    for (const option of options) {
      option.addEventListener("click", selectOption);
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

      setMaterial(theModel, activeOption, new_mtl);
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
  },
};
</script>
