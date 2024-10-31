import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; 

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('model-container');
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    const loader = new GLTFLoader();
    loader.load('/assets/3d_models/dna_gltf/scene.gltf', (gltf) => {
        scene.add(gltf.scene);
        animate();
    }, undefined, (error) => {
        console.error('Error loading model:', error);
    });

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
});
