
"use strict";
console.clear();

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";

(async function () {
  let camera, scene, renderer, controls;
  let geometry, material, mesh;

  const texture = new THREE.TextureLoader().load(
    "https://happy358.github.io/Images/HDR/rathaus_1k.jpg"
  );
  texture.mapping = THREE.EquirectangularReflectionMapping;
  /*
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 1, 1 );
  */

  init();
  obj();

  function obj() {
    let geometries = [];
    // obj
    geometry = new THREE.CircleGeometry(0.3, 8);

    material = new THREE.MeshBasicMaterial({
      color: "white",
      side: THREE.DoubleSide,
      envMap: texture
    });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // particle
    let particles;
    const radius = 50;
    const particle_num = 800;
    let vertex = new THREE.Vector3();
    let random_ratio;
    geometries = [];
    for (let i = 0; i < particle_num; i++) {
      const theta = Math.acos(THREE.MathUtils.randFloatSpread(2));
      const phi = THREE.MathUtils.randFloatSpread(360);
      // outside
      vertex.x = radius * Math.sin(theta) * Math.cos(phi);
      vertex.y = radius * Math.sin(theta) * Math.sin(phi);
      vertex.z = radius * Math.cos(theta);
      // inside
      random_ratio = Math.sqrt(Math.sqrt(Math.random()));
      vertex.copy(vertex).multiplyScalar(random_ratio);
      //
      let g = geometry.clone();
      g.rotateX(Math.random() * Math.PI * 2);
      g.rotateY(Math.random() * Math.PI * 2);
      g.rotateZ(Math.random() * Math.PI * 2);
      g.translate(vertex.x, vertex.y, vertex.z);
      geometries.push(g);
    }
    geometry = BufferGeometryUtils.mergeGeometries(geometries);
    geometry.attributes.position.needsUpdate = true;
    geometry.computeBoundingBox();
    geometry.computeVertexNormals();
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  }
  function init() {
    //
    scene = new THREE.Scene();
    //
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    //
    camera = new THREE.PerspectiveCamera(
      25,
      window.innerWidth / window.innerHeight,
      0.1,
      500
    );
    camera.position.set(0, 0, 100);
    //
    controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.maxDistance = camera.far / 2;
    controls.target.set(0, 0, 0);
    controls.update();
    //
    animate();
    //
    window.addEventListener("resize", onWindowResize);
  }
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
  }
  function render() {
    renderer.render(scene, camera);
  }
})();
