import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { gsap } from 'gsap';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let ball;

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

camera.position.z = 0.7;
renderer.outputEncoding = THREE.sRGBEncoding;

new RGBELoader()
    .load('neon_photostudio_1k.hdr', function (texture) {

        texture.mapping = THREE.EquirectangularReflectionMapping;

        //scene.background = texture;
        scene.environment = texture;

        // render();

        // model
        const loader = new GLTFLoader();
        loader.load('disco_ball/scene.gltf', function (gltf) {

            ball = gltf.scene;
            scene.add(ball);

        }, undefined, function (error) {

            console.error(error);

        });

    });







// const color = 0x011033;
// const intensity = 0.5;
// const light = new THREE.AmbientLight(color, intensity);
// scene.add(light);

// const textureLoader = new THREE.TextureLoader();
// const bgTexture = textureLoader.load('5.jpg');
// scene.background = bgTexture;


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    if (ball) {
        ball.rotation.y += 0.003;
    }
}
animate();





// wait until DOM is ready
document.addEventListener("DOMContentLoaded", function (event) {

    // wait until window is loaded - all images, styles-sheets, fonts, links, and other media assets
    window.onload = function () {



        gsap.from("canvas", {
            y: -100,
            duration: 1
        });
        gsap.from("h1 span", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2
        });
        gsap.from("p", {
            x: -100,
            opacity: 0,
            duration: 2,
        });

    };

});