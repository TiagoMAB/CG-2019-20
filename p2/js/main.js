var camera, scene, renderer;
var camera1, camera2, camera3;
var cannon1, cannon2, cannon3, fence, floor;
var selectedCannon, selectedCannonMaterial, shotVector;
var minAngle = -(Math.PI / 6), maxAngle = +(Math.PI / 6); //For cannon rotation

var cannonBalls = [];
var N = 5, sphereRadius = 2.5, thickness = 1, cannonLenght = 15; //arbitrary values

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
    if(Math.pow(sphereRadius + sphereRadius, 2) >= ((Math.pow(x - otherX, 2) + Math.pow(z - otherZ, 2)))) {
        return false;
    }
    else {
        return true;
    }
}

function createRandomCannonBalls() {
    var maxX, minX, maxZ, minZ, x, z, cannonBall, j;
    maxX= 20 - sphereRadius - thickness - 0.5;
    minX= -40.0 + sphereRadius + thickness + 0.5;
    maxZ= 30.0 - sphereRadius - thickness - 0.5;
    minZ= -30.0 + sphereRadius + thickness + 0.5;

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
        cannonBall = new CannonBall(0, 0, 0, sphereRadius);
        cannonBall.position.x = x;
        cannonBall.position.y = sphereRadius;
        cannonBall.position.z = z;

        cannonBalls.push(cannonBall);
        scene.add(cannonBall);
    }
}

function createCannons() {
    cannon1 = new Cannon(0, 0, 0, cannonLenght);
    cannon1.rotateCannon(0);
    cannon1.userData.startingRotationAngle = 0;
    cannon1.position.x = 50;
    cannon1.position.y = sphereRadius + 0.5;
    cannon1.position.z = 0;

    cannon2 = new Cannon(0, 0, 0, cannonLenght);
    cannon2.rotateCannon(minAngle);
    cannon2.userData.startingRotationAngle = minAngle;
    cannon2.position.x = 50;
    cannon2.position.y = sphereRadius + 0.5;
    cannon2.position.z = +25;

    cannon3 = new Cannon(0, 0, 0, cannonLenght);
    cannon3.rotateCannon(maxAngle);
    cannon3.userData.startingRotationAngle = maxAngle;
    cannon3.position.x = 50;
    cannon3.position.y = sphereRadius + 0.5;
    cannon3.position.z = -25;

    scene.add(cannon1);
    scene.add(cannon2);
    scene.add(cannon3);
}

function selectCannon(cannon) {
    selectedCannon.material.color.setHex(0x00008b); //Turn back to blue
    selectedCannon.userData.rotatePositive = false;
    selectedCannon.userData.rotateNegative = false;
    selectedCannon = cannon;
    selectedCannon.material.color.setHex(0xFFD700); //Turn yellow
    if(selectedCannon.numShots != 0) { //Make sure to update repeatedShot flag if it's not the first shot
        selectedCannon.userData.repeatedShot = false;
    }
}

function shootBall() {
    var cannonBall;

    cannonBall = new CannonBall(0, selectedCannon.position.z, 0, sphereRadius);
    cannonBall.position.x = selectedCannon.position.x;
    cannonBall.position.y = sphereRadius;
    cannonBall.position.z = selectedCannon.position.z;

    if(!selectedCannon.userData.repeatedShot) {
        shotVector = selectedCannon.updateDirection(selectedCannon.currentRotationValue());
        selectedCannon.userData.repeatedShot = true;
    }

    cannonBall.translateOnAxis(shotVector, cannonLenght/2 + sphereRadius); //Move it to be in front of the cannon
    cannonBall.userData.movement = shotVector;

    cannonBalls.push(cannonBall);
    scene.add(cannonBall);
    selectedCannon.userData.numShots++;
}

function createScene() {
    'use scrict';

    scene = new THREE.Scene();

    selectedCannon = new Cannon(0, 0, 0, cannonLenght); 

    fence = new Fence(0, 0, 0, thickness);
    floor = new Floor(0, 0, 0, thickness);

    createCannons();
    createRandomCannonBalls();

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

        /* Toggling Cannon Ball Axes */
        case 82: //r
            length = cannonBalls.length;
            for(i = 0; i < length; i++) {
                cannonBalls[i].toggleAxes();
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

function onKeyPress(e) {
    'use strict';

    switch (e.keyCode) {

        /* Shoot Cannon Ball */
        case 32: //space
            shootBall();
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

    }
}

function animate() {
    'use strict';

    /* Selected Cannon Angle */
    if (selectedCannon.userData.rotateNegative) {
        if(selectedCannon.userData.startingRotationAngle == 0) {
            if(selectedCannon.currentRotationValue() < maxAngle) {
                selectedCannon.rotateCannon(0.02);
                selectedCannon.userData.repeatedShot = false;
            }
        }

        else if(selectedCannon.userData.startingRotationAngle == minAngle) {
            if(selectedCannon.currentRotationValue() < 0) {
                selectedCannon.rotateCannon(0.02);
                selectedCannon.userData.repeatedShot = false;
            }
        }

        else if(selectedCannon.userData.startingRotationAngle == maxAngle) {
            if(selectedCannon.currentRotationValue() < maxAngle) {
                selectedCannon.rotateCannon(0.02);
                selectedCannon.userData.repeatedShot = false;
            }
        }
        
    }

    if (selectedCannon.userData.rotatePositive) {
        if(selectedCannon.userData.startingRotationAngle == 0) {
            if(selectedCannon.currentRotationValue() > minAngle) {
                selectedCannon.rotateCannon(-0.02);
                selectedCannon.userData.repeatedShot = false;
            }
        }

        else if(selectedCannon.userData.startingRotationAngle == minAngle) {
            if(selectedCannon.currentRotationValue() > minAngle) {
                selectedCannon.rotateCannon(-0.02);
                selectedCannon.userData.repeatedShot = false;
            }
        }

        else if(selectedCannon.userData.startingRotationAngle == maxAngle) {
            if(selectedCannon.currentRotationValue() > 0) {
                selectedCannon.rotateCannon(-0.02);
                selectedCannon.userData.repeatedShot = false;
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
    window.addEventListener("keypress", onKeyPress);    
}