import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import MouseMove from "./mousemove.js";

THREE.Cache.enabled = true;

const loader = new GLTFLoader();

let container;

let camera, cameraTarget, scene, renderer;

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

  camera = new THREE.PerspectiveCamera(50, 800 / 800, 1, 1000);
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
  renderer.setSize(800, 800);
  container.appendChild(renderer.domElement);

  //container.appendChild( stats.dom );

  // EVENTS

  container.style.touchAction = "none";
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = 800 / 800;
  camera.updateProjectionMatrix();
  renderer.setSize(800, 800);
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
      logoModel.scale.set(2.5, 2.5, 2.5); // scale here
      scene.add(logoModel);
      logoModel.position.x = -1.51;
      logoModel.position.y = -1.5;
      const mousemove = new MouseMove(logoModel);
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
}

function render() {
  camera.lookAt(cameraTarget);
  renderer.clear();
  renderer.render(scene, camera);
}
