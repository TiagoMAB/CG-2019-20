var camera, scene, renderer;
var camera1, camera2, camera3;
var cannon1, cannon2, cannon3, fence, floor;
var selectedCannon, selectedCannonMaterial;
var cannonBalls = [];
var N = 50;
var radius = 2.5;
var thickness = 1;

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

function hasIntersected(x, z, otherX, otherZ) {
    if(Math.pow(radius + radius, 2) >= ((Math.pow(x - otherX, 2) + Math.pow(z - otherZ, 2)))) {
        return false;
    }
    else {
        return true;
    }
}

function createCannonBalls() {
    var maxX, minX, maxZ, minZ, x, z, cannonBall, j, k;
    maxX= 20 - radius - thickness - 0.5;
    minX= -40.0 + radius + thickness + 0.5;
    maxZ= 30.0 - radius - thickness - 0.5;
    minZ= -30.0 + radius + thickness + 0.5;

    for(i = 0; i < N; i++) {
        x = (Math.random() * (maxX - minX + 1)) + minX;
        z = (Math.random() * (maxZ - minZ + 1)) + minZ;
        /* Verify if the generated cannon ball doesn't intersect with any other ball */
        j = 0;
        while(j < i) {
            if(!hasIntersected(x, z, cannonBalls[j].position.x, cannonBalls[j].position.z)) {
                x = (Math.random() * (maxX - minX + 1)) + minX;
                z = (Math.random() * (maxZ - minZ + 1)) + minZ;
                j = 0;
                continue;
            }
            j++;
        }
        cannonBall = new CannonBall(0, 0, 0, radius);
        cannonBall.position.x = x;
        cannonBall.position.y = radius;
        cannonBall.position.z = z;

        cannonBalls.push(cannonBall);
        scene.add(cannonBall);
    }
}

function createCannons() {
    cannon1 = new Cannon(0, 0, 0);
    cannon1.rotation.y = 0;
    cannon1.startingRotationAngle = cannon1.rotation.y;
    cannon1.position.x = 50;
    cannon1.position.y = radius + 0.5;
    cannon1.position.z = 0;

    cannon2 = new Cannon(0, 0, 0);
    cannon2.rotation.y = -(Math.PI / 6);
    cannon2.startingRotationAngle = cannon2.rotation.y;
    cannon2.position.x = 50;
    cannon2.position.y = radius + 0.5;
    cannon2.position.z = +25;

    cannon3 = new Cannon(0, 0, 0);
    cannon3.rotation.y = +(Math.PI / 6);
    cannon3.startingRotationAngle = cannon3.rotation.y;
    cannon3.position.x = 50;
    cannon3.position.y = radius + 0.5;
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

    selectedCannon = new Cannon(0, 0, 0); 

    fence = new Fence(0, 0, 0, thickness);
    floor = new Floor(0, 0, 0, thickness);

    createCannons();
    createCannonBalls();

    scene.add(fence);
    scene.add(floor);

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

        /* Toggling Wireframe */
        case 52:
            cannon1.toggleWireframe();
            cannon2.toggleWireframe();
            cannon3.toggleWireframe();
            fence.toggleWireframe();
            floor.toggleWireframe();
            length = cannonBalls.length;
            for(i = 0; i < length; i++) {
                cannonBalls[i].toggleWireframe();
            }
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

        /* Toggling Cannon Ball Axes */
        case 82: //r
            length = cannonBalls.length;
            for(i = 0; i < length; i++) {
                cannonBalls[i].toggleAxes();
            }
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
    
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);    
}