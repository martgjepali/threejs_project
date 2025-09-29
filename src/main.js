import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GUI } from "lil-gui";
import "./style.css";

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

camera.position.set(-10, 30, 30);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  side: THREE.DoubleSide,
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xaaaaaa,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  wireframe: false,
  side: THREE.DoubleSide,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

sphere.position.set(-10, 10, 0);

const gui = new GUI();

const options = {
  color: "#0000ff",
  wireframe: false,
  speed: 0.01,
};

gui.addColor(options, "sphereColor").onChange((value) => {
  sphere.material.color.set(value);
});

gui.add(options, "wireframe").onChange((value) => {
  sphere.material.wireframe = value;
});

gui.add(options, "speed", 0, 0.1);

let step = 0;
let speed = 0.01;

function animate(time) {
  box.rotation.x += options.speed;
  box.rotation.y += options.speed;
  sphere.rotation.x += options.speed;
  sphere.rotation.y += options.speed;

  step += options.speed;
  sphere.position.y = 10 * Math.abs(Math.sin(step));

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
