var camera, scene, renderer;
var camera1, camera2, camera3, camera2;
var cannon1, cannon2, cannon3, fence;
var selectedCannon, selectedCannonMaterial;
var N = 5;

function render() {
    'use strict';
    
    renderer.render(scene, camera);
}

function createCamera1() {
    'use scrict';

    factor = 20
    camera1 = new THREE.OrthographicCamera( -window.innerWidth/factor, window.innerWidth/factor, window.innerHeight/factor, -window.innerHeight/factor, 1, 1000 );

    camera1.position.x = 0;
    camera1.position.y = 50;
    camera1.position.z = 0;
    camera1.lookAt(scene.position);
}

function createCamera2() {
    'use scrict';

    factor = 20
    camera2 = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);

    camera2.position.x = 55;
    camera2.position.y = 55;
    camera2.position.z = 55;
    camera2.lookAt(scene.position);
}

function createCamera3() {
    'use scrict';

    factor = 20
    camera3 = new THREE.OrthographicCamera( -window.innerWidth/factor, window.innerWidth/factor, window.innerHeight/factor, -window.innerHeight/factor, 1, 1000 );

    camera3.position.x = 60;
    camera3.position.y = 0;
    camera3.position.z = 0;
    camera3.lookAt(scene.position);
}


function createCamera() {
    'use scrict';
    camera = camera1;
}

function createCannonBalls() {
    var maxX, minX, maxZ, minZ, x, z, cannonBall;
    maxX=0;
    minX=-37.5;
    maxZ=22.5;
    minZ=-22.5;

    for(i = 0; i < N; i++) {
        //Temos de fazer um if para ver se a posição em que a bola está interseta qualquer outra.
        //Se sim, fazemos uma nova posição random
        x = (Math.random() * (maxX - minX + 1)) + minX;
        z = (Math.random() * (maxZ - minZ + 1)) + minZ;
        //console.log("X: " + x + "  Z: " + z);
        cannonBall = new CannonBall(x, 2.5, z);
        scene.add(cannonBall);
    }
}

function createCannons() {
    cannon1 = new Cannon(0, 0, 0);
    cannon1.rotation.y = 0;
    cannon1.startingRotationAngle = cannon1.rotation.y;
    cannon1.position.x = 50;
    cannon1.position.y = 2.5;
    cannon1.position.z = 0;

    cannon2 = new Cannon(0, 0, 0);
    cannon2.rotation.y = -(Math.PI / 6);
    cannon2.startingRotationAngle = cannon2.rotation.y;
    cannon2.position.x = 50;
    cannon2.position.y = 2.5;
    cannon2.position.z = +25;

    cannon3 = new Cannon(0, 0, 0);
    cannon3.rotation.y = +(Math.PI / 6);
    cannon3.startingRotationAngle = cannon3.rotation.y;
    cannon3.position.x = 50;
    cannon3.position.y = 2.5;
    cannon3.position.z = -25;

    scene.add(cannon1);
    scene.add(cannon2);
    scene.add(cannon3);
}

function selectCannon(cannon) {
    selectedCannon.material.color.setHex(0x00008b);
    selectedCannon.userData.rotatePositive = false;
    selectedCannon.userData.rotateNegative = false;
    selectedCannon = cannon;
    selectedCannon.material.color.setHex(0xFFD700);
}

function createScene() {
    'use scrict';

    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(10));

    selectedCannon = new Cannon(0, 0, 0); 

    fence = new Fence(0, 0, 0);

    createCannons();

    createCannonBalls();

    scene.add(fence);
    selectCannon(cannon1);
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if(window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = renderer.getSize().width / renderer.getSize().height;
        camera.updateProjectionMatrix();
    }
}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {

        /* Selected Cannon Angle */
        case 37: //left
            selectedCannon.userData.rotateNegative = true;
            break;

        case 39: //right
            selectedCannon.userData.rotatePositive = true;
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
            cannon1.toggleWireframe();
            cannon2.toggleWireframe();
            cannon3.toggleWireframe();
            fence.toggleWireframe();
            break;

        /* Selecting Cannon */
        case 69: //e
            selectCannon(cannon3);
            break; 

        case 81: //q
            selectCannon(cannon2);
            break;

        case 87: //w
            selectCannon(cannon1);
            break; 

    }
}

function onKeyUp(e) {
    'use strict';

    switch (e.keyCode) {

        /* Selected Cannon Angle */
        case 37: //left
            selectedCannon.userData.rotateNegative = false;
            break;

        case 39: //right
            selectedCannon.userData.rotatePositive = false;
            break;
    }
}

function animate() {
    'use strict';

    /* Selected Cannon Angle */
    if (selectedCannon.userData.rotateNegative) {
        if(selectedCannon.startingRotationAngle == 0) {
            if(selectedCannon.currentRotationValue() < (Math.PI/6)) {
                selectedCannon.rotateCannon(0.02);
            }
        }

        else if(selectedCannon.startingRotationAngle == -(Math.PI/6)) {
            if(selectedCannon.currentRotationValue() < ((Math.PI/6)-0.005)) {
                selectedCannon.rotateCannon(0.02);
            }
        }

        else if(selectedCannon.startingRotationAngle == (Math.PI/6)) {
            if(selectedCannon.currentRotationValue() < 0) {
                selectedCannon.rotateCannon(0.02);
            }
        }
        
    }

    if (selectedCannon.userData.rotatePositive) {
        if(selectedCannon.startingRotationAngle == 0) {
            if(selectedCannon.currentRotationValue() > -(Math.PI/6)) {
                selectedCannon.rotateCannon(-0.02);
            }
        }

        else if(selectedCannon.startingRotationAngle == -(Math.PI/6)) {
            if(selectedCannon.currentRotationValue() > 0) {
                selectedCannon.rotateCannon(-0.02);
            }
        }

        else if(selectedCannon.startingRotationAngle == (Math.PI/6)) {
            if(selectedCannon.currentRotationValue() > (-(Math.PI/6)+0.005)) {
                selectedCannon.rotateCannon(-0.02);
            }
        }
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
    window.addEventListener("keyup", onKeyUp);    
}