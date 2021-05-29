import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as dat from "dat.gui";
THREE.Cache.enabled = true;

const loader = new GLTFLoader();

let container,
  camera,
  cameraTarget,
  scene,
  renderer,
  controls,
  model;

var BACKGROUND_COLOR = "#777777";

var gui = new dat.GUI({ closed: true });

var options = {
  reset: function () { },
};


const clock = new THREE.Clock();
init();
animate();

function init() {
  container = document.getElementById("webgl");

  // CAMERA
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth * 0.6 / window.innerHeight,
    1,
    window.innerWidth * 0.6
  );
  camera.position.set(0, 0, 5);
  cameraTarget = new THREE.Vector3(0, 0, 0);

  // SCENE
  scene = new THREE.Scene();

  // MODEL
  loadModel();

  // RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, });
  renderer.setClearColor(new THREE.Color(BACKGROUND_COLOR));
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth * 0.6, window.innerHeight);
  //container.appendChild(renderer.domElement);

  // CONTROLS
  //controls = new OrbitControls(camera, renderer.domElement);
  //controls.update();

  // EVENTS
  container.style.touchAction = "none";
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth * 0.6 / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth * 0.6, window.innerHeight);
}

function loadModel() {
  /*loader.load(
    "Model.glb",
    function (gltf) {
      model = gltf.scene;
      model.scale.set(1, 1, 1); // scale here
      //model.position.x = -2.1;
      //model.position.y = -2.2;
      scene.add(model);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );*/
}


function animate() {
  const delta = clock.getDelta();;
  requestAnimationFrame(animate);
  render();
}

function render() {
  camera.lookAt(cameraTarget);
  //controls.update();
  renderer.render(scene, camera)
}
