import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
//import MouseMove from "./mousemove.js";

THREE.Cache.enabled = true;

const loader = new GLTFLoader();

let container;

let camera, controls, cameraTarget, scene, renderer;

let logoModel;

var BACKGROUND_COLOR = "#00060a";
var t = 0;

var directionalLight = new THREE.DirectionalLight(
  new THREE.Color("#21cbff"),
  2
);
var light1 = new THREE.PointLight(new THREE.Color("#38b9ff"), 5, 50);
//#ff9300
var light2 = new THREE.PointLight(new THREE.Color("#4d14de"), 5, 50);

init();
animate();

function init() {
  container = document.createElement("div");
  document.getElementById("webgl").appendChild(container);

  // CAMERA

  camera = new THREE.PerspectiveCamera(
    50,
    (window.innerWidth * 0.6666) / window.innerHeight,
    1,
    1000
  );
  camera.position.set(0, 0, 5);
  cameraTarget = new THREE.Vector3(0, 0, 0);

  // SCENE
  scene = new THREE.Scene();

  // LIGHTS

  directionalLight.position.set(0, 1, 10);
  directionalLight.target.position.set(0, 0, 0);
  scene.add(directionalLight);
  scene.add(light1);
  scene.add(light2);

  light1.position.x = 5;
  light1.position.z = 10;

  light2.position.x = 7;
  light2.position.y = 4;
  light2.position.z = 6;

  loadLogo();

  // RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  renderer.setClearColor(new THREE.Color(BACKGROUND_COLOR));
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth * 0.6666, window.innerHeight);
  container.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2;
  controls.enableZoom = false;
  controls.enablePan = false;

  //container.appendChild( stats.dom );

  // EVENTS

  container.style.touchAction = "none";
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function loadLogo() {
  loader.load(
    "IntersimLogo.glb",
    function (gltf) {
      logoModel = gltf.scene;
      logoModel.traverse((node) => {
        if (!node.isMesh) return;
        node.material.wireframe = true;
      });
      //const mousemove = controls = new MouseMove(logoModel);
      logoModel.scale.set(2, 2, 2); // scale here
      scene.add(logoModel);
      logoModel.position.x = -1;
      logoModel.position.y = -1;
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

function animate() {
  t += 0.1;
  //directionalLight.position.y += Math.sin(t * 1);
  //directionalLight.position.x += Math.cos(t + 10);

  light1.position.y += Math.sin(t * 0.2) * 0.5;
  light2.position.y += Math.cos(20 + t * 0.1) * 0.2;

  requestAnimationFrame(animate);

  render();
  controls.update();
}

function render() {
  camera.lookAt(cameraTarget);
  renderer.clear();
  renderer.render(scene, camera);
}
