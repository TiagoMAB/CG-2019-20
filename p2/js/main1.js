/* Despite the fact that Three.js offers tools to use and manipulate matrixes, after discussing it with one of our laboratory teachers,
   we have decided to use our own functions, even if some are similarly named, to manipulate matrixes. These can be found in utils/matrixTools.js
   This was done to combat what we believe is an ambiguous project when it comes to what Three.js tools we can and can't use*/

var camera, scene, renderer, clock;
var camera1, camera2, camera3, camera4, camera3Vector;
var cannon1, cannon2, cannon3, fence, floor;
var selectedCannon, selectedCannonMaterial;
var minAngle = -(Math.PI / 6), maxAngle = +(Math.PI / 6); //For cannon rotation. Angles are calculated in radians

//Assumimos que a massa de todos os objetos é 1
var cannonBalls = [];
//arbitrary values that can be changed
var N = 10, friction = 0.2, bounce = 1, sphereRadius = 2.5, maxBallSpeed=35, initialSpin = 0.5, wallThickness = 0.01, cannonLenght = 15, numShots = 0, allAxesToggled = false,
    maxZCannon = 25, minZCannon = -25, positiveXLimit = 20.0, negativeXLimit = -40.0, positiveZLimit = 30.0, negativeZLimit = -30.0, wallHeight = 10, arenaOffset = 10;
    //The positive/negative X/Z Limits are to decide how big the arena (floor+fence) is
    //The max/min Z cannon decide where the side cannos will be
    //arenaOffset decides how far the center of the floor is from position (0,0,0)


function render() {
    'use strict';
    
    renderer.render(scene, camera);
}

function createCamera1() {
    'use scrict';

    factor = 20
    camera1 = new THREE.OrthographicCamera( -window.innerWidth/factor, window.innerWidth/factor, window.innerHeight/factor, -window.innerHeight/factor, 1, 1000 );

    camera1.applyMatrix(makeTranslation(0,50,0))
    camera1.lookAt(scene.position);
}

function createCamera2() {
    'use scrict';

    camera2 = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);

    camera2.applyMatrix(makeTranslation(55,55,55))
    camera2.lookAt(scene.position);
}

function createCamera3() {
    'use scrict';

    factor = 20
    //camera3 = new THREE.OrthographicCamera( -window.innerWidth/factor, window.innerWidth/factor, window.innerHeight/factor, -window.innerHeight/factor, 1, 1000 );
    camera3 = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
}

function createCamera4() {
    'use scrict';

    factor = 20
    //camera3 = new THREE.OrthographicCamera( -window.innerWidth/factor, window.innerWidth/factor, window.innerHeight/factor, -window.innerHeight/factor, 1, 1000 );
    camera4 = new THREE.OrthographicCamera(-window.innerWidth/factor, window.innerWidth/factor, window.innerHeight/factor, -window.innerHeight/factor, 1, 1000);
}

function createCamera() {
    'use scrict';
    camera = camera1;
}

function hasIntersectedWithBall(x, y, z, otherX, otherY, otherZ, radius1, radius2) {
    /* For simplicity, intersections no longer matter if the cannon balls are not on the floor. 
       That is to say, if they go over the edge of the floor, there will be no colision*/
    if((Math.pow(radius1 + radius2, 2) >= ((Math.pow(x - otherX, 2) + Math.pow(z - otherZ, 2)))) && y == radius1 && otherY == radius2) {
        return true;
    }
    return false;
}

function createRandomCannonBalls() {
    var maxX, minX, maxZ, minZ, x, y, z, cannonBall, j;
    y = sphereRadius;
    maxX= positiveXLimit - sphereRadius - 0.5;
    minX= negativeXLimit + sphereRadius + wallThickness/2 + 0.5;
    maxZ= positiveZLimit - sphereRadius - wallThickness/2 - 0.5;
    minZ= negativeZLimit + sphereRadius + wallThickness/2 + 0.5;

    for(i = 0; i < N; i++) {
        x = (Math.random() * (maxX - minX + 1)) + minX;
        z = (Math.random() * (maxZ - minZ + 1)) + minZ;
        /* Verify if the generated cannon ball doesn't intersect with any other ball */
        j = 0;
        while(j < i) {
            if(hasIntersectedWithBall(x, y, z, cannonBalls[j].position.x, cannonBalls[j].position.y, cannonBalls[j].position.z, sphereRadius, sphereRadius)) {
                x = (Math.random() * (maxX - minX + 1)) + minX;
                z = (Math.random() * (maxZ - minZ + 1)) + minZ;
                j = 0;
                continue;
            }
            j++;
        }
        cannonBall = new CannonBall(0, 0, 0, sphereRadius, maxBallSpeed, initialSpin, allAxesToggled);
        cannonBall.applyMatrix(makeTranslation(x, y, z))

        cannonBalls.push(cannonBall);
        scene.add(cannonBall);
    }
}

function createCannons() {
    cannon1 = new Cannon(0, 0, 0, cannonLenght);
    cannon1.rotateCannon(0);
    cannon1.userData.startingRotationAngle = 0;
    cannon1.applyMatrix(makeTranslation(50, sphereRadius+0.5, 0))

    cannon2 = new Cannon(0, 0, 0, cannonLenght);
    cannon2.rotateCannon(minAngle);
    cannon2.userData.startingRotationAngle = minAngle;
    cannon2.applyMatrix(makeTranslation(50, sphereRadius+0.5, maxZCannon))

    cannon3 = new Cannon(0, 0, 0, cannonLenght);
    cannon3.rotateCannon(maxAngle);
    cannon3.userData.startingRotationAngle = maxAngle;
    cannon3.applyMatrix(makeTranslation(50, sphereRadius+0.5, minZCannon))

    scene.add(cannon1);
    scene.add(cannon2);
    scene.add(cannon3);
}

function selectCannon(cannon) {
    selectedCannon.selected(false)
    selectedCannon = cannon;
    selectedCannon.selected(true)
}

function createScene() {
    'use scrict';

    scene = new THREE.Scene();

    clock = new THREE.Clock();

    selectedCannon = new Cannon(0, 0, 0, cannonLenght); 

    fence = new Fence(0, 0, 0, wallThickness, wallHeight, positiveXLimit, negativeXLimit, positiveZLimit, negativeZLimit, arenaOffset);
    floor = new Floor(0, 0, 0, wallThickness, positiveXLimit, negativeXLimit, positiveZLimit, negativeZLimit, arenaOffset);

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
            allAxesToggled = !allAxesToggled;
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
            selectedCannon.shootBall();
            break;

        /* Camera */
        case 49: //1
            camera = camera1;
            break;

        case 50: //2
            camera = camera2;
            break;

        case 51: //3
            if(numShots > 0) {
                camera = camera3;
            }
            break;
        
        case 53: //3
            camera = camera4
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

function calculateSpeed(ball1, ball2) {

    speedX1 = ball1.speed.x
    speedZ1 = ball1.speed.z
    speedX2 = ball2.speed.x
    speedZ2 = ball2.speed.z

    ball1.speed.x = speedX2
    ball1.speed.z = speedZ2
    ball2.speed.x = speedX1
    ball2.speed.z = speedZ1

    ball1.calculateAngle()
    ball2.calculateAngle()
}



function handleCollision(ball1, ball2) {

    x = Math.abs(ball1.position.x - ball2.position.x)
    z = Math.abs(ball1.position.z - ball2.position.z)
    distance = Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2))
    minDist = ball1.radius + ball2.radius
    
    if (distance <= minDist) {
        console.log("X " + x + " |Y " + z + " distance " + distance + " min " + minDist)
        
        calculateSpeed(ball1, ball2)
        ball1.canFall = 1
        ball2.canFall = 1
    }
}

function animate() {
    'use strict';
    
    var delta = clock.getDelta(); // *0.8 is to slow down simulation
    
    if (cannon1.timeout > 0) {
        cannon1.timeout -= 1
    }
    if (cannon2.timeout > 0) {
        cannon2.timeout -= 1
    }
    if (cannon3.timeout > 0) {
        cannon3.timeout -= 1
    }

    /* Selected Cannon Angle */
    if (selectedCannon.userData.rotateNegative) {
        if(selectedCannon.userData.startingRotationAngle == 0 && selectedCannon.currentRotationValue() < maxAngle) {
            selectedCannon.rotateCannon(0.02);
        }

        else if(selectedCannon.userData.startingRotationAngle == minAngle && selectedCannon.currentRotationValue() < 0 - 0.005) {
            selectedCannon.rotateCannon(0.02);
        }

        else if(selectedCannon.userData.startingRotationAngle == maxAngle && selectedCannon.currentRotationValue() < maxAngle) {
            selectedCannon.rotateCannon(0.02);
        }
    }

    if (selectedCannon.userData.rotatePositive) {
        if(selectedCannon.userData.startingRotationAngle == 0 && selectedCannon.currentRotationValue() > minAngle) {
            selectedCannon.rotateCannon(-0.02);
        }

        else if(selectedCannon.userData.startingRotationAngle == minAngle && selectedCannon.currentRotationValue() > minAngle) {
            selectedCannon.rotateCannon(-0.02);
        }

        else if(selectedCannon.userData.startingRotationAngle == maxAngle && selectedCannon.currentRotationValue() > 0 + 0.005) {
            selectedCannon.rotateCannon(-0.02);
        }
    }

    var j = 0, i = 0
    for(i = 0; i < cannonBalls.length - 1; i++) {               //maybe alterar para for com if
        for (j = i + 1; j < cannonBalls.length; j++) {
            handleCollision(cannonBalls[i], cannonBalls[j])
        }
    }

    for(i = 0; i < cannonBalls.length; i++) {
        
        cannonBalls[i].handleCollisionsWall(positiveXLimit, negativeXLimit, positiveZLimit, negativeZLimit)
        
        //Ball Movement
        if(cannonBalls[i].isMoving()) {
            var speedX = cannonBalls[i].speed.x * delta
            var speedY = cannonBalls[i].speed.y * delta
            var speedZ = cannonBalls[i].speed.z * delta
            var totalSpeed = Math.sqrt(Math.pow(speedX,2) + Math.pow(speedZ,2))

            cannonBalls[i].applyMatrix(makeTranslation(speedX, speedY, speedZ));
            if(cannonBalls[i].position.x < positiveXLimit) { //Makes sure the cannonBall spins only on the floor
                cannonBalls[i].spin();
            }
            cannonBalls[i].applyFriction(totalSpeed*friction);
        //    console.log("Velocities: " +  cannonBalls[i].speed.x  + " | " + cannonBalls[i].speed.y  + " | " + cannonBalls[i].speed.z  + " | ")
            
        }

        if(cannonBalls[i].isFalling(positiveXLimit)) {
            cannonBalls[i].setSpeed(cannonBalls[i].speed.x, 25*(-9.8)*delta, cannonBalls[i].speed.z)
        }
    }



    setTimeout( function() {

        requestAnimationFrame( animate );

    }, 1000 / 60 );

    render();
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
    createCamera4();
    createCamera();
    
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);   
    window.addEventListener("keypress", onKeyPress);    
}