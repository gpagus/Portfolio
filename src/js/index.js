/*================================CUSTOM CURSOR=======================================*/
const cursor = document.getElementById("cursor");
const cursorTrail = document.getElementById("cursor-trail");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  setTimeout(() => {
    cursorTrail.style.left = e.clientX - 4 + "px";
    cursorTrail.style.top = e.clientY - 4 + "px";
  }, 100);
});

document.addEventListener("mousedown", () => {
  cursor.classList.add("scale-150");
  cursorTrail.classList.remove("scale-150");
});
document.addEventListener("mouseup", () => {
  cursor.classList.remove("scale-150");
  cursorTrail.classList.remove("scale-150");
});


/*================================THREE.JS=======================================*/
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Configuración inicial
const scene = new THREE.Scene();
scene.background = new THREE.Color('#EBEBEB');

const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.set(0, 0, 2);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(100, 100);
document.getElementById("three-container").appendChild(renderer.domElement);

// Controles ajustados
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.3;
controls.autoRotate = true;
controls.autoRotateSpeed = 1;
controls.enableZoom = false;
controls.enablePan = false;

// Materiales mejorados
const nodeMaterial = new THREE.MeshPhongMaterial({
    color: '#1c1c1c',
    shininess: 100,
    transparent: true,
    opacity: 0.9
});

const lineMaterial = new THREE.LineBasicMaterial({
    color: '#555555',
    transparent: true,
    opacity: 0.3
});

// Iluminación
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Crear geometría compleja
const geometry = new THREE.IcosahedronGeometry(1, 0);
const edges = new THREE.EdgesGeometry(geometry);
const wireframe = new THREE.LineSegments(edges, lineMaterial);
scene.add(wireframe);

// Añadir nodos en los vértices
const nodeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
const positionAttribute = geometry.getAttribute('position');

const nodes = [];
for (let i = 0; i < positionAttribute.count; i++) {
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
    node.position.fromBufferAttribute(positionAttribute, i);
    nodes.push(node);
    scene.add(node);
}

// Animación de "respiración"
let time = 0;
function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    // Animar nodos
    nodes.forEach((node, i) => {
        node.scale.setScalar(1 + Math.sin(time + i) * 0.1);
    });

    // Animar wireframe
    wireframe.scale.setScalar(1 + Math.sin(time) * 0.05);

    controls.update();
    renderer.render(scene, camera);
}

// Responsive
window.addEventListener('resize', () => {
    renderer.setSize(100, 100);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
});

// Iniciar animación
animate();


