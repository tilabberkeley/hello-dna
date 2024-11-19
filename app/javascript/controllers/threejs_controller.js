import { Controller } from "@hotwired/stimulus"
import * as THREE from "three";
import { OrbitControls } from "three/examples";


export default class extends Controller {
  connect() {
    console.log("Hello, Stimulus!", this.element);
    
    this.scene = new THREE.Scene();
    
    const container = this.element.parentElement;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    this.camera = new THREE.PerspectiveCamera(
      75,
      containerWidth / containerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.element,
      alpha: true  // Make background transparent
    });
    this.renderer.setSize(containerWidth, containerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.geometry = new THREE.BoxGeometry();
    this.material = new THREE.MeshBasicMaterial({ 
      color: 0x00ff00,
      wireframe: true,
    });

    this.originCube = this.createCube(0, 0, 0);
    this.scene.add(this.originCube);
    this.camera.position.z = 5;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    
    this.resizeHandler = this.handleResize.bind(this);
    window.addEventListener('resize', this.resizeHandler);

    this.animate();
  }

  disconnect() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  handleResize() {
    const container = this.element.parentElement;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    this.camera.aspect = containerWidth / containerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(containerWidth, containerHeight);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    
    this.originCube.rotation.x += 0.01;
    this.originCube.rotation.y += 0.01;

    this.controls.update();

    this.renderer.render(this.scene, this.camera);
  }

  createCube(x, y, z) {
    const cube = new THREE.Mesh(this.geometry, this.material);
    cube.position.set(x, y, z);
    return cube;
  }
}
