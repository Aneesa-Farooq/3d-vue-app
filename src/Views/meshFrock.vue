<template>
<div class="options close z-50">
    <a href="javascript:void(0)" class="close-btn sm-d" @click="closeNav">×</a>
    <div class="option --is-active" data-option="AC_001_Belt_Buttons_0">
        <p>Belt</p>
    </div>
    <div class="option" data-option="AC_001_Collar_Buttons_0">
        <p>Collar</p>
    </div>
    <div class="option" data-option="SL_001_Right_Buttons_0">
        <p>Right Sleeve</p>
    </div>
    <div class="option" data-option="SL_001_Left_Buttons_0">
        <p>Left Sleeve</p>
    </div>
    <div class="option" data-option="FO_001_Buttons_0">
        <p>Front Bodice</p>
    </div>
    <div class="option" data-option="BO_001_Buttons_0">
        <p>Back Bodice</p>
    </div>
    <div class="option" data-option="AC_001_Cuff_Right_Buttons_0">
        <p>Right Cuff</p>
    </div>
    <div class="option" data-option="AC_001_Cuff_Left_Buttons_0">
        <p>Left Cuff</p>
    </div>
    <div class="option" data-option="BTM_001_front_Buttons_0">
        <p>Front Flare</p>
    </div>
    <div class="option" data-option="BTM_001_Back_Buttons_0">
        <p>Back Flare</p>
    </div>
    <div>
        <button id="save"><span class="spinner-border spinner-border-sm display" role="status" aria-hidden="true"></span>View in AR</button>
    </div>
</div>
<button class="open-btn sm-d" @click="openNav">☰ Menu</button>

<canvas id="c" class="canvas"></canvas>
<div class="controls">
    <div id="js-tray" class="tray">
        <div id="js-tray-slide" class="tray__slide"></div>
    </div>
</div>
</template>

<script>
import * as THREE from "three";
import {
    OrbitControls
} from "three/examples/jsm/controls/OrbitControls.js";
import {
    GLTFLoader
} from "three/examples/jsm/loaders/GLTFLoader.js";
import {
    RGBELoader
} from "three/examples/jsm/loaders/RGBELoader.js";
import {
    GLTFExporter
} from "three/examples/jsm/exporters/GLTFExporter.js";
import axios from "axios";
import {
    db,
    storage
} from "../firebase";
import {
    ref,
    uploadBytes,
    getDownloadURL
} from "firebase/storage";
export default {
    name: "MeshFrock",
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

        const colors = [{
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

                const BACKGROUND_COLOR = 0xf1f1f1;

                // Init the scene
                const scene = new THREE.Scene();

                // Set background
                scene.background = new THREE.Color(BACKGROUND_COLOR);
                //scene.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100);

                const canvas = document.querySelector("#c");

                // Init the renderer
                const renderer = new THREE.WebGLRenderer({
                    canvas,
                    antialias: true
                });
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

                const INITIAL_MTL = new THREE.MeshPhongMaterial({
                    color: 0x808080,
                    shininess: 10
                });

                const INITIAL_MAP = [{
                        childID: "AC_001_Belt_Buttons_0",
                        mtl: INITIAL_MTL
                    },
                    {
                        childID: "AC_001_Collar_Buttons_0",
                        mtl: INITIAL_MTL
                    },
                    {
                        childID: "SL_001_Right_Buttons_0",
                        mtl: INITIAL_MTL
                    },
                    {
                        childID: "SL_001_Left_Buttons_0",
                        mtl: INITIAL_MTL
                    },
                    {
                        childID: "FO_001_Buttons_0",
                        mtl: INITIAL_MTL
                    },
                    {
                        childID: "BO_001_Buttons_0",
                        mtl: INITIAL_MTL
                    },
                    {
                        childID: "AC_001_Cuff_Right_Buttons_0",
                        mtl: INITIAL_MTL
                    },
                    {
                        childID: "AC_001_Cuff_Left_Buttons_0",
                        mtl: INITIAL_MTL
                    },
                    {
                        childID: "BTM_001_front_Buttons_0",
                        mtl: INITIAL_MTL
                    },
                    {
                        childID: "BTM_001_Back_Buttons_0",
                        mtl: INITIAL_MTL
                    },
                    {
                        childID: "Button_R_Buttons_0",
                        mtl: INITIAL_MTL
                    },
                    {
                        childID: "Button_L_Buttons_0",
                        mtl: INITIAL_MTL
                    },
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

                gltfLoader.load("/assets/meshFrock/scene.gltf", function (gltf) {
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

                const navigateToArEvent = new Event("navigate-to-ar");
                const saveValue = document.querySelector("#save");

                async function store() {
                    console.log(scene);
                    const exporter = new GLTFExporter();
                    exporter.parse(
                        scene,
                        async function (result) {
                            console.log(result);
                            const gltf = JSON.stringify(result);
                            const url = new Blob([gltf], {
                                type: "apllication/octet-stream"
                            });
                            const filename = Date.now() + ".glb";
                            const storageRef = ref(storage, `models/${filename}`);
                            const snapshot = await uploadBytes(storageRef, url);
                            const downloadUrl = await getDownloadURL(snapshot.ref);
                            console.log(downloadUrl);
                            localStorage.setItem("finalUrl", downloadUrl);
                            await saveArrayBuffer(gltf, "model1.glb");
                            saveValue.dispatchEvent(navigateToArEvent);
                        }, {
                            binary: true
                        }
                    );
                }

                function saveArrayBuffer(buffer, filename) {
                    save(new Blob([buffer], {
                        type: "apllication/octet-stream"
                    }), filename);
                }
                const link = document.createElement("a");
                document.body.appendChild(link);

                function save(blob, filename) {
                    link.href = URL.createObjectURL(blob);
                    //  storeLink(link.href);
                    console.log(link.href);
                    link.download = filename;
                    link.click();
                }
                if (saveValue) {
                    saveValue.addEventListener("click", async () => {

                        const saveBtn = document.querySelector("#save");
                        saveBtn.disabled = true;
                        saveBtn.querySelector("span").classList.remove("display");

                        await store();
                    });
                    saveValue.addEventListener("navigate-to-ar", () => {
                        console.log("navigating to ar");

                        const saveBtn = document.querySelector("#save");
                        saveBtn.disabled = false;
                        saveBtn.querySelector("span").classList.add("display");

                        this.$router.push({
                            name: "ar"
                        });
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
                if (posFinal - posInitial < -threshold) {} else if (posFinal - posInitial > threshold) {} else {
                    items.style.left = posInitial + "px";
                }

                document.onmouseup = null;
                document.onmousemove = null;
            }
        }

        slide(slider, sliderItems);
    },
    methods: {
        openNav() {
            document.querySelector(".options").classList.remove("close");
        },
        closeNav() {
            document.querySelector(".options").classList.add("close");
        },
    },
};
</script>

<style scoped>
.close-btn {
    text-decoration: none;
    color: black;
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem !important;
    cursor: pointer;
}

.open-btn {
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 1.2rem !important;
    cursor: pointer;
}

.close {
    transform: translateX(0);
}

.z-50 {
    z-index: 50;
}

.sm-d {
    display: none;
}
@media (max-width:750px) {
  .sm-d {
    display: block;
  }
  .close {
      transform: translateX(-100%);
  }
}
</style>
