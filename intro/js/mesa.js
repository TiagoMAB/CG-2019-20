import { TetrahedronGeometry } from "./three";

/*global THREE */

var camera, scene, renderer;

function render() {
    'use strict';
    
    renderer.render(scene, camera);
}

function createScene() {
    'use scrict';

    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(10));

}
function init() {
    'use strict';

    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, win.innerHeight);

    document.body.appendChild(renderer.domElement);

    createScene();
    
    render();
}