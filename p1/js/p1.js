var camera, scene, renderer;

function render() {
    'use strict';
    
    renderer.render(scene, camera);
}

function createCamera() {
    'use scrict';

    factor = 20
    camera = new THREE.OrthographicCamera( -window.innerWidth/factor, window.innerWidth/factor, window.innerHeight/factor, -window.innerHeight/factor, 1, 1000 );
    //camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 20;
    camera.lookAt(scene.position);
}

function createScene() {
    'use scrict';

    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(10));

    //createRobot(0, 0, 0);

    var targetToroid = new Toroid(20, 25, 0);
    var targetBase = new Cylinder(20, 10, 0);

    scene.add(targetToroid);
    scene.add(targetBase);
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