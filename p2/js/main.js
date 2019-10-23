/* Despite the fact that Three.js offers tools to use and manipulate matrixes, after discussing it with one of our laboratory teachers,
   we have decided to use our own functions, even if some are similarly named, to manipulate matrixes. These can be found in utils/matrixTools.js
   This was done to combat what we believe is an ambiguous project when it comes to what Three.js tools we can and can't use*/

var camera, scene, renderer, clock;
var camera1, camera2, camera3, camera3Vector;
var cannon1, cannon2, cannon3, fence, floor;
var selectedCannon, selectedCannonMaterial;
var minAngle = -(Math.PI / 6), maxAngle = +(Math.PI / 6); //For cannon rotation. Angles are calculated in radians

//Assumimos que a massa de todos os objetos é 1
var cannonBalls = [];
//arbitrary values that can be changed
var N = 5, friction = 0.3, bounce = 0.7, sphereRadius = 2.5, maxBallSpeed=2.5, initialSpin = 0.5, wallThickness = 1, cannonLenght = 15, numShots = 0, allAxesToggled = false,
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

function hasIntersectedWithWall(x, z, maxX, minX, maxZ, minZ) {
    var thick = wallThickness/2
    if(x >= maxX) {
        return false;
    }
    if(x - sphereRadius <= minX + thick) {
        return true;
    }
    if(z + sphereRadius >= maxZ - thick || z - sphereRadius <= minZ + thick) {
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
    selectedCannon.material.color.setHex(0x00008b); //Turn back to blue
    selectedCannon.userData.rotatePositive = false;
    selectedCannon.userData.rotateNegative = false;
    selectedCannon = cannon;
    selectedCannon.userData.angle = cannon.userData.angle;
    selectedCannon.material.color.setHex(0xFFD700); //Turn yellow
}

function shootBall() {
    var cannonBall;
    var ballVector1 = new THREE.Vector3( 0, 0, 0 );

    cannonBall = new CannonBall(0, 0, 0, sphereRadius, maxBallSpeed, initialSpin, allAxesToggled);
    cannonBall.applyMatrix(makeTranslation(selectedCannon.position.x, sphereRadius, selectedCannon.position.z))

    ballVector1 = selectedCannon.updateDirection(selectedCannon.currentRotationValue());
    ballVector1.applyMatrix4(makeScale(cannonLenght/2 + sphereRadius));
    
    cannonBall.applyMatrix(makeTranslation(ballVector1.x, ballVector1.y, ballVector1.z)); //Move it to be in front of the cannon
    cannonBall.updateMovement(ballVector1.x, ballVector1.y, ballVector1.z);

    if(numShots > 0) { //Resets the camera vector so that it doesn't generate conflicts
        camera3.applyMatrix(makeTranslation(camera3Vector.x, camera3Vector.y, camera3Vector.z));
    }

    camera3Vector = ballVector1;
    camera3.applyMatrix(makeTranslation(-camera3Vector.x, -camera3Vector.y, -camera3Vector.z));
    cannonBall.add(camera3);
    camera3.lookAt(cannonBall.getMovement());

    cannonBalls.push(cannonBall);
    scene.add(cannonBall);
    numShots++;
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
            if(numShots > 0) {
                camera = camera3;
            }
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
    
    var delta = clock.getDelta() * 0.8; // *0.8 is to slow down simulation

    /* Selected Cannon Angle */
    if (selectedCannon.userData.rotateNegative) {
        if(selectedCannon.userData.startingRotationAngle == 0) {
            if(selectedCannon.currentRotationValue() < maxAngle) {
                selectedCannon.rotateCannon(0.02);
            }
        }

        else if(selectedCannon.userData.startingRotationAngle == minAngle) {
            if(selectedCannon.currentRotationValue() < 0 - 0.005) {
                selectedCannon.rotateCannon(0.02);
            }
        }

        else if(selectedCannon.userData.startingRotationAngle == maxAngle) {
            if(selectedCannon.currentRotationValue() < maxAngle) {
                selectedCannon.rotateCannon(0.02);
            }
        }
    }

    if (selectedCannon.userData.rotatePositive) {
        if(selectedCannon.userData.startingRotationAngle == 0) {
            if(selectedCannon.currentRotationValue() > minAngle) {
                selectedCannon.rotateCannon(-0.02);
            }
        }

        else if(selectedCannon.userData.startingRotationAngle == minAngle) {
            if(selectedCannon.currentRotationValue() > minAngle) {
                selectedCannon.rotateCannon(-0.02);
            }
        }

        else if(selectedCannon.userData.startingRotationAngle == maxAngle) {
            if(selectedCannon.currentRotationValue() > 0 + 0.005) {
                selectedCannon.rotateCannon(-0.02);
            }
        }
    }

    for(i = 0; i < cannonBalls.length; i++) {
        //Gravity
        /* Note: canFall() is used to activate the flag that helps decide whether or not the ball should be falling
                 It is triggered whenever the vector describing the movement of the ball is inverted as that means it colided with something
                 and can potentially go back in the direction of the cannons, which would lead it to fall when going over the edge of the floor */
                 
        if(cannonBalls[i].isFalling(cannonBalls[i].position.x, positiveXLimit)) {
            var ballVector1 = new THREE.Vector3( 0, 0, 0 );
            ballVector1 = cannonBalls[i].getMovement();
            cannonBalls[i].updateMovement(ballVector1.x, ballVector1.y-(9.8*delta), ballVector1.z);
        }

        //Wall Colisions
        /* TO DO? - Fazer com que elas façam bounce nas paredes de acordo com o angulo em que nelas batem */
        if(hasIntersectedWithWall(cannonBalls[i].position.x, cannonBalls[i].position.z, positiveXLimit, negativeXLimit, positiveZLimit, negativeZLimit)) {
            var ballVector1 = new THREE.Vector3( 0, 0, 0 );
            ballVector1 = cannonBalls[i].getMovement();
            if(!cannonBalls[i].userData.hitWall) {
                ballVector1.applyMatrix4(makeScale(-1));
                cannonBalls[i].userData.hitWall = true;
            }
            cannonBalls[i].canFall();
            cannonBalls[i].updateSpeed(cannonBalls[i].getSpeed()*bounce); //Loses speed because of what was lost with the bounce back
            cannonBalls[i].updateMovement(ballVector1.x, ballVector1.y, ballVector1.z);
        }

        //Ball Colisions
        var j = 0;
        while(j < cannonBalls.length) {
            if(j != i) {
                if(hasIntersectedWithBall(cannonBalls[i].position.x, cannonBalls[i].position.y, cannonBalls[i].position.z, cannonBalls[j].position.x, cannonBalls[j].position.y, cannonBalls[j].position.z, sphereRadius, sphereRadius)) {
                    var ballVector1 = new THREE.Vector3( 0, 0, 0 );
                    var ballVector2 = new THREE.Vector3( 0, 0, 0 );
                    cannonBalls[i].userData.hitWall = false;
                    cannonBalls[j].userData.hitWall = false;
                    if(cannonBalls[i].isMoving() && cannonBalls[j].isMoving()) {
                        ballVector1 = cannonBalls[i].getMovement();
                        ballVector2 = cannonBalls[j].getMovement();

                        if(cannonBalls[i].userData.colidedWithBallN != j) {
                            /* Making sure that the last colision of this ball i wasn't with this other ball j before */
                            ballVector1.applyMatrix4(makeScale(-1));
                            cannonBalls[i].canFall();
                            cannonBalls[i].updateSpeed((cannonBalls[i].getSpeed() + cannonBalls[j].getSpeed())*bounce);
                        }
                        else if(cannonBalls[i].userData.colidedWithBallN == j && cannonBalls[j].userData.colidedWithBallN != i) {
                            /* In case one of the balls is hitting the same ball it did before but that other ball bounced back from another one */
                            ballVector1.applyMatrix4(makeScale(-1));
                            cannonBalls[i].canFall();
                            cannonBalls[i].updateSpeed((cannonBalls[i].getSpeed() + cannonBalls[j].getSpeed())*bounce);
                        }

                        if(cannonBalls[j].userData.colidedWithBallN != i) {
                            ballVector2.applyMatrix4(makeScale(-1));
                            cannonBalls[j].canFall();
                            cannonBalls[j].updateSpeed((cannonBalls[i].getSpeed() + cannonBalls[j].getSpeed())*bounce);
                        }
                        else if(cannonBalls[j].userData.colidedWithBallN == i && cannonBalls[i].userData.colidedWithBallN != j) {
                            ballVector2.applyMatrix4(makeScale(-1));
                            cannonBalls[j].canFall();
                            cannonBalls[j].updateSpeed((cannonBalls[i].getSpeed() + cannonBalls[j].getSpeed())*bounce);
                        }

                        cannonBalls[i].updateMovement(ballVector1.x, ballVector1.y, ballVector1.z);
                        cannonBalls[j].updateMovement(ballVector2.x, ballVector2.y, ballVector2.z);

                        /* We update what was the last ball that i and j collided with, in this case, each other */
                        cannonBalls[i].colidedWithBall(j);
                        cannonBalls[j].colidedWithBall(i);
                        break;
                    }
                    else if(cannonBalls[i].isMoving() && !cannonBalls[j].isMoving()) {
                        ballVector1 = cannonBalls[i].getMovement();
                        ballVector2.x = ballVector1.x;
                        ballVector2.y = ballVector1.y;
                        ballVector2.z = ballVector1.z;
                        
                        if(cannonBalls[i].userData.colidedWithBallN != j) {
                            ballVector1.applyMatrix4(makeScale(-1));
                            cannonBalls[i].canFall();   
                            cannonBalls[i].updateSpeed(cannonBalls[i].getSpeed()*bounce);
                        }
                        else if(cannonBalls[i].userData.colidedWithBallN == j && cannonBalls[j].userData.colidedWithBallN != i) {
                            ballVector1.applyMatrix4(makeScale(-1));
                            cannonBalls[i].canFall();   
                            cannonBalls[i].updateSpeed(cannonBalls[i].getSpeed()*bounce);
                        }

                        if(cannonBalls[j].userData.colidedWithBallN != i) {
                            cannonBalls[j].updateSpeed(cannonBalls[i].getSpeed()*bounce);
                        }
                        else if(cannonBalls[j].userData.colidedWithBallN == i && cannonBalls[i].userData.colidedWithBallN != j) {
                            cannonBalls[j].updateSpeed(cannonBalls[i].getSpeed()*bounce);
                        }
                        
                        cannonBalls[i].updateMovement(ballVector1.x, ballVector1.y, ballVector1.z);
                        cannonBalls[j].updateMovement(ballVector2.x, ballVector2.y, ballVector2.z);

                        cannonBalls[i].colidedWithBall(j);
                        cannonBalls[j].colidedWithBall(i);
                        break;
                    }
                    else if(cannonBalls[j].isMoving() && !cannonBalls[i].isMoving()) {
                        ballVector1 = cannonBalls[j].getMovement();
                        ballVector2.x = ballVector1.x;
                        ballVector2.y = ballVector1.y;
                        ballVector2.z = ballVector1.z;

                        if(cannonBalls[i].userData.colidedWithBallN != j) {
                            cannonBalls[i].updateSpeed(cannonBalls[j].getSpeed()*bounce);
                        }
                        else if(cannonBalls[i].userData.colidedWithBallN == j && cannonBalls[j].userData.colidedWithBallN != i) {
                            cannonBalls[i].updateSpeed(cannonBalls[j].getSpeed()*bounce);
                        }

                        if(cannonBalls[j].userData.colidedWithBallN != i) {
                            ballVector1.applyMatrix4(makeScale(-1));
                            cannonBalls[j].canFall();
                            cannonBalls[j].updateSpeed(cannonBalls[j].getSpeed()*bounce);
                        }
                        else if(cannonBalls[j].userData.colidedWithBallN == i && cannonBalls[i].userData.colidedWithBallN != j) {
                            ballVector1.applyMatrix4(makeScale(-1));
                            cannonBalls[j].canFall();
                            cannonBalls[j].updateSpeed(cannonBalls[j].getSpeed()*bounce);
                        }

                        cannonBalls[j].updateMovement(ballVector1.x, ballVector1.y, ballVector1.z);
                        cannonBalls[i].updateMovement(ballVector2.x, ballVector2.y, ballVector2.z);

                        cannonBalls[i].colidedWithBall(j);
                        cannonBalls[j].colidedWithBall(i);
                        break;
                    }
                }
            }
            j++;
        }

        //Ball Movement
        if(cannonBalls[i].isMoving()) {
            var ballVector1 = new THREE.Vector3( 0, 0, 0 );
            ballVector1 = cannonBalls[i].getMovement();
            var move = cannonBalls[i].getSpeed()*delta
            cannonBalls[i].applyMatrix(makeTranslation(ballVector1.x*move, ballVector1.y, ballVector1.z*move));
            if(cannonBalls[i].position.x < positiveXLimit) { //Makes sure the cannonBall spins only on the floor
                cannonBalls[i].spin();
            }
            cannonBalls[i].applyFriction(friction*delta);
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
    createCamera();
    
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);   
    window.addEventListener("keypress", onKeyPress);    
}