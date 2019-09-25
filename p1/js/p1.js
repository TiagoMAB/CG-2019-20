var camera, scene, renderer;

function render() {
    'use strict';
    
    renderer.render(scene, camera);
}

function createCamera() {
    'use scrict';

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);

    camera.position.x = 50;
    camera.position.y = 50;
    camera.position.z = 50;
    camera.lookAt(scene.position);
}

function createScene() {
    'use scrict';

    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(10));

    //createBase(0, 0, 0);

    //createRobot(0, 0, 0);

    createTargetBase(20, 10, 0)
    createTargetDonut(20, 25, 0);

}

function init() {
    'use strict';

    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    createScene();

    createCamera();
    
    render();
}