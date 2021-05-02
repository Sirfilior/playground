import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import * as dat from "dat.gui";
import MouseMove from "./mousemove.js";

THREE.Cache.enabled = true;

const loader = new GLTFLoader();

let container,
  logoModel,
  camera,
  cameraTarget,
  scene,
  renderer,
  controls,
  rtBox,
  rtGrp;

var BACKGROUND_COLOR = "#00060a";

var t = 0;
var rt = 0;

var gui = new dat.GUI();

var options = {
  colorLight1: 0x4d14de,
  colorLight2: 0xff24db,
  colorLight3: 0xffffff,
  colorPoint1: 0x38b9ff,
  colorPoint2: 0x38b9ff,
  reset: function () {},
};

var light1 = new THREE.PointLight(options.colorPoint1, 1, 100);
var light2 = new THREE.PointLight(options.colorPoint2, 1, 100);
const width = 10;
const height = 10;
const intensity = 1;
const rectLight = new THREE.RectAreaLight(
  options.colorLight1,
  intensity,
  width,
  height
);
const rectLight2 = new THREE.RectAreaLight(
  options.colorLight2,
  intensity * 3,
  width,
  height
);
const rectLight3 = new THREE.RectAreaLight(
  options.colorLight3,
  intensity,
  width,
  height
);

rectLight.position.set(5, 5, 4);
rectLight.lookAt(0, 0, 0);
rectLight2.position.set(-5, 5, -4);
rectLight2.lookAt(0, 0, 0);
rectLight3.position.set(-3, 5, 4);
rectLight3.lookAt(0, 0, 0);

gui.addColor(options, "colorLight1").onChange(() => {
  rectLight.color.set(options.colorLight1);
});
gui.addColor(options, "colorLight2").onChange(() => {
  rectLight2.color.set(options.colorLight2);
});
gui.addColor(options, "colorLight3").onChange(() => {
  rectLight3.color.set(options.colorLight3);
});
gui.addColor(options, "colorPoint1").onChange(() => {
  light1.color.set(options.colorPoint1);
});
gui.addColor(options, "colorPoint2").onChange(() => {
  light2.color.set(options.colorPoint2);
});

const clock = new THREE.Clock();
init();
animate();

function init() {
  container = document.createElement("div");
  document.getElementById("webgl").appendChild(container);

  // CAMERA

  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(0, 0, 5);
  cameraTarget = new THREE.Vector3(0, 0, 0);

  // SCENE
  scene = new THREE.Scene();

  RectAreaLightUniformsLib.init();

  // LIGHTS
  light1.position.x = 0;
  light1.position.y = 3;
  light1.position.z = -10;

  light2.position.x = 0;
  light2.position.y = 3;
  light2.position.z = -10;

  scene.add(rectLight);
  scene.add(rectLight2);
  scene.add(rectLight3);
  scene.add(light1);
  scene.add(light2);

  /*scene.add(new THREE.PointLightHelper(light2, 1));
  scene.add(new RectAreaLightHelper(rectLight));
  scene.add(new RectAreaLightHelper(rectLight2));
  scene.add(new RectAreaLightHelper(rectLight3));
  scene.add(new THREE.PointLightHelper(light1, 1));
  scene.add(new THREE.AxesHelper(10));*/

  loadLogo();

  const box = new THREE.BoxHelper(logoModel, 0xffff00);
  scene.add(box);

  // RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  //renderer.setClearColor(new THREE.Color(BACKGROUND_COLOR));
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

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
    "JassOrigMesh.glb",
    function (gltf) {
      logoModel = gltf.scene;
      logoModel.scale.set(3.5, 3.5, 3.5); // scale here
      logoModel.position.x = -2;
      logoModel.position.y = -2.2;
      scene.add(logoModel);
      rtBox = new THREE.Box3().setFromObject(logoModel);
      //rtBox.center(logoModel.position); // this re-sets the mesh position
      rtGrp = new THREE.Group();
      scene.add(rtGrp);
      rtGrp.add(logoModel);
      //scene.add(new THREE.BoxHelper(logoModel));
      const mousemove = new MouseMove(rtGrp);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

function animate() {
  t += 0.1;
  const time = Date.now() * 0.0005;
  const delta = clock.getDelta();

  //directionalLight.position.y += Math.sin(t * 1);
  //directionalLight.position.x += Math.cos(t + 10);

  //light1.position.y += Math.sin(t * 0.2) * 0.5;
  light2.position.y += Math.cos(t * 0.05) * 0.1;
  /*if (rtGrp) {
    rtGrp.rotation.y -= 0.5 * delta;
  }*/

  requestAnimationFrame(animate);

  render();
}

function render() {
  camera.lookAt(cameraTarget);
  controls.update();
  renderer.clear();
  renderer.render(scene, camera);
}
