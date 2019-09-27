var camera, scene, renderer, camera1, camera2, camera3;

function render() {
    'use strict';
    
    renderer.render(scene, camera);
}

function createCamera1() {
    'use scrict';

    factor = 20
    camera1 = new THREE.OrthographicCamera( -window.innerWidth/factor, window.innerWidth/factor, window.innerHeight/factor, -window.innerHeight/factor, 1, 1000 );
    //camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);

    camera1.position.x = 0;
    camera1.position.y = 0;
    camera1.position.z = 50;
    camera1.lookAt(scene.position);
}

function createCamera2() {
    'use scrict';

    factor = 20
    camera2 = new THREE.OrthographicCamera( -window.innerWidth/factor, window.innerWidth/factor, window.innerHeight/factor, -window.innerHeight/factor, 1, 1000 );
    //camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);

    camera2.position.x = 0;
    camera2.position.y = 50;
    camera2.position.z = 0;
    camera2.lookAt(scene.position);
}

function createCamera3() {
    'use scrict';

    factor = 20
    camera3 = new THREE.OrthographicCamera( -window.innerWidth/factor, window.innerWidth/factor, window.innerHeight/factor, -window.innerHeight/factor, 1, 1000 );
    //camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);

    camera3.position.x = 50;
    camera3.position.y = 0;
    camera3.position.z = 0;
    camera3.lookAt(scene.position);
}

function createCamera() {
    'use scrict';
    camera = camera1;
}

function createScene() {
    'use scrict';

    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(10));

    //createRobot(0, 0, 0);
    r = new Robot(0, 0, 0);

    scene.add(r);

    var targetToroid = new Toroid(20, 22.5, 0);
    var targetBase = new Cylinder(20, 10, 0);

    scene.add(targetToroid);
    scene.add(targetBase);
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if(window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = renderer.getSize().width / renderer.getSize().height;
        camera.updateProjectionMatrix();
    }

    render();
}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
        /* Movement */
        case 37: //left
            break;

        case 38: //up
            r.userData.moveUp = !r.userData.moveUp;
            break;

        case 39: //right
            break;

        case 40: //down
            break;    


        /* Arm movement */
        case 65: //a
            break;

        case 83: //s
            break;

        case 81: //q
            break;

        case 87: //w
            break; 


        /* Camera */
        case 49: //1
            camera = camera1;
            break;

        case 50: //2
            camera = camera2;
            break;

        case 51: //3
            camera = camera3;
            break;

        case 52: //4
            scene.traverse(function (node) {
                if (node instanceof THREE.Mesh) {
                    node.material.wireframe = !node.material.wireframe;
                }
            });
            break;
        
        
        default:
            return;
    }

    render();
}

function animate() {
    'use strict';

    if (r.userData.moveUp) {
        r.position.z += 0.1;
    }

    render();

    requestAnimationFrame(animate);
}

function init() {
    'use strict';

    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    createScene();

    createCamera1();
    createCamera2();
    createCamera3();
    createCamera();
    
    render();

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
}