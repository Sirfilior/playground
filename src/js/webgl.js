import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import * as dat from "dat.gui";
import MouseMove from "./mousemove.js";
import { Vector3 } from "three";

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

var rt = 0;
var rtRight = true;
var tilt = 0;
var light2Pos = 20;

var gui = new dat.GUI({ closed: true });

var options = {
  colorLight1: 0x464696,
  light1I: 2.6,
  colorLight2: 0xffffff,
  light2I: 3,
  colorLight3: 0x3c5dc6,
  light3I: 2.8,
  colorPoint1: 0xff8312,
  pLight1I: 4.9,
  colorPoint2: 0x38b9ff,
  pLight2I: 1,
  reset: function () { },
};

var light1 = new THREE.PointLight(options.colorPoint1, options.pLight1I, 100);
var light2 = new THREE.PointLight(options.colorPoint2, options.pLight2I, 10);
const width = 10;
const height = 10;
const rectLight = new THREE.RectAreaLight(
  options.colorLight1,
  options.light1I,
  width,
  height
);
const rectLight2 = new THREE.RectAreaLight(
  options.colorLight2,
  options.light2I,
  width,
  height
);
const rectLight3 = new THREE.RectAreaLight(
  options.colorLight3,
  options.light3I,
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
gui.add(options, 'light1I', 0, 10).onChange(() => {
  rectLight.intensity = options.light1I
});
gui.add(options, 'light2I', 0, 10).onChange(() => {
  rectLight2.intensity = options.light2I
});
gui.add(options, 'light3I', 0, 10).onChange(() => {
  rectLight3.intensity = options.light3I
});

gui.add(options, 'pLight1I', 0, 10).onChange(() => {
  light1.intensity = options.pLight1I
});
gui.add(options, 'pLight2I', 0, 10).onChange(() => {
  light2.intensity = options.pLight2I
});



const clock = new THREE.Clock();
init();
animate();

function init() {
  container = document.getElementById("webgl");

  // CAMERA

  camera = new THREE.PerspectiveCamera(
    50,
    1000 / 1000,
    1,
    1000
  );
  camera.position.set(0, 0, 5);
  cameraTarget = new THREE.Vector3(0, 0, 0);

  // SCENE
  scene = new THREE.Scene();

  RectAreaLightUniformsLib.init();

  // LIGHTS
  light1.position.x = 3;
  light1.position.y = 2;
  light1.position.z = -5;

  light2.position.x = 0;
  light2.position.y = light2Pos;
  light2.position.z = -5;

  scene.add(rectLight);
  scene.add(rectLight2);
  scene.add(rectLight3);
  scene.add(light1);
  scene.add(light2);

  //scene.add(new THREE.PointLightHelper(light2, 1));
  //scene.add(new RectAreaLightHelper(rectLight));
  //scene.add(new RectAreaLightHelper(rectLight2));
  //scene.add(new RectAreaLightHelper(rectLight3));
  //scene.add(new THREE.PointLightHelper(light1, 1, 'red'));
  //scene.add(new THREE.AxesHelper(10));

  loadLogo();

  const box = new THREE.BoxHelper(logoModel, 0xffff00);
  scene.add(box);

  // RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, });

  //renderer.setClearColor(new THREE.Color(BACKGROUND_COLOR));
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(1000, 1000);
  container.appendChild(renderer.domElement);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  //container.appendChild( stats.dom );

  // EVENTS

  container.style.touchAction = "none";
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = 1000 / 1000;
  camera.updateProjectionMatrix();
  renderer.setSize(1000, 1000);
}

function loadLogo() {
  loader.load(
    "Intersim2.glb",
    function (gltf) {
      logoModel = gltf.scene;
      logoModel.scale.set(3, 3, 3); // scale here
      //logoModel.position.x = -2.1;
      //logoModel.position.y = -2.2;
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

function animateFlylight(d) {
  if (light2Pos <= -20) { light2Pos = 20; }
  light2Pos -= 6 * d

  light2.position.y = light2Pos;
}

function animateBreath(d) {

}

function animateRotate(d) {
  if (!rtGrp) return
  let speed = 0.001
  if (rtRight) {
    if (rt >= 0.3) rtRight = false
    rt += speed
  } else {
    if (rt <= -0.3) rtRight = true
    rt -= speed
  }
  //rtGrp.scale.set(1 + rt / 4, 1 + rt / 4, 1 + rt / 4)
  rtGrp.rotation.y = rt;
  rtGrp.rotation.x = rt / 2;
}

function animate() {
  const delta = clock.getDelta();
  animateFlylight(delta);
  animateRotate(delta);

  requestAnimationFrame(animate);

  render();
}

function render() {
  camera.lookAt(cameraTarget);
  controls.update();
  renderer.clear();
  renderer.render(scene, camera);
}
