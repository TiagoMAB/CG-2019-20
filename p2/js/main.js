var camera, scene, renderer, clock;
var camera1, camera2, camera3;
var cannon1, cannon2, cannon3, fence, floor;
var selectedCannon, selectedCannonMaterial, ballVector;
var minAngle = -(Math.PI / 6), maxAngle = +(Math.PI / 6); //For cannon rotation. Angles are calculated in radians

var cannonBalls = [];
//arbitrary values that can be changed
var N = 5, sphereRadius = 2.5, ballSpeed=2.5, wallThickness = 1, cannonLenght = 15, maxZCannon = 25, minZCannon = -25,
    positiveXLimit = 20.0, negativeXLimit = -40.0, positiveZLimit = 30.0, negativeZLimit = -30.0, wallHeight = 10, arenaOffset = 10;
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
    camera3 = new THREE.OrthographicCamera( -window.innerWidth/factor, window.innerWidth/factor, window.innerHeight/factor, -window.innerHeight/factor, 1, 1000 );

    camera3.applyMatrix(makeTranslation(60,0,0))
    camera3.lookAt(scene.position);
}


function createCamera() {
    'use scrict';
    camera = camera1;
}

function hasIntersectedWithBall(x, z, otherX, otherZ, radius1, radius2) {
    if(Math.pow(radius1 + radius2, 2) >= ((Math.pow(x - otherX, 2) + Math.pow(z - otherZ, 2)))) {
        return true;
    }
    return false;
}

function hasIntersectedWithWall(x, z, maxX, minX, maxZ, minZ) {
    var thick = wallThickness/2
    if(x > maxX) {
        return false;
    }
    if(x - thick - sphereRadius < minX) {
        return true;
    }
    if(z + thick + sphereRadius > maxZ || z - thick - sphereRadius < minZ) {
        return true;
    }
    return false;
}

function createRandomCannonBalls() {
    var maxX, minX, maxZ, minZ, x, z, cannonBall, j;
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
            if(hasIntersectedWithBall(x, z, cannonBalls[j].position.x, cannonBalls[j].position.z, sphereRadius, sphereRadius)) {
                x = (Math.random() * (maxX - minX + 1)) + minX;
                z = (Math.random() * (maxZ - minZ + 1)) + minZ;
                j = 0;
                continue;
            }
            j++;
        }
        cannonBall = new CannonBall(0, 0, 0, sphereRadius);
        cannonBall.applyMatrix(makeTranslation(x, sphereRadius, z))

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
    if(selectedCannon.numShots != 0) { //Makes sure to update repeatedShot flag if it's not the first shot
        selectedCannon.userData.repeatedShot = false;
    }
}

function shootBall() {
    var cannonBall;

    cannonBall = new CannonBall(0, 0, 0, sphereRadius);
    cannonBall.applyMatrix(makeTranslation(selectedCannon.position.x, sphereRadius, selectedCannon.position.z))

    /* TO DO - Fazer com que, quando disparamos uma bola e ela colide com outra, invertendo o movimento, a bola disparada a seguir, sem virar o canhão
       nao segue a mesma direcao, errada */
    if(!selectedCannon.userData.repeatedShot) { //Test if it's the first time this shot has been made
        ballVector = selectedCannon.updateDirection(selectedCannon.currentRotationValue());
        selectedCannon.userData.repeatedShot = true;
        ballVector.applyMatrix4(makeScale(cannonLenght/2 + sphereRadius));
    }

    cannonBall.applyMatrix(makeTranslation(ballVector.x, ballVector.y, ballVector.z)); //Move it to be in front of the cannon
    cannonBall.updateMovement(ballVector);

    cannonBalls.push(cannonBall);
    scene.add(cannonBall);
    selectedCannon.userData.numShots++;
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

    //var clock = new THREE.Clock();
    
    var delta = clock.getDelta() * 0.8; // slow down simulation

    /* Selected Cannon Angle */
    if (selectedCannon.userData.rotateNegative) {
        if(selectedCannon.userData.startingRotationAngle == 0) {
            if(selectedCannon.currentRotationValue() < maxAngle) {
                selectedCannon.rotateCannon(0.02);
                selectedCannon.userData.repeatedShot = false;
            }
        }

        else if(selectedCannon.userData.startingRotationAngle == minAngle) {
            if(selectedCannon.currentRotationValue() < 0 - 0.005) {
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
            if(selectedCannon.currentRotationValue() > 0 + 0.005) {
                selectedCannon.rotateCannon(-0.02);
                selectedCannon.userData.repeatedShot = false;
            }
        }
    }

    if(cannonBalls.length > N) {
        for(i = 0; i < cannonBalls.length; i++) {
            //Wall Colisions
            /* TO DO - Fazes com que elas façam bounce nas paredes de acordo com o angulo em que nelas batem */
            if(hasIntersectedWithWall(cannonBalls[i].position.x, cannonBalls[i].position.z, positiveXLimit, negativeXLimit, positiveZLimit, negativeZLimit)) {
                console.log("colided with wall");
                ballVector = cannonBalls[i].getMovement();
                ballVector.applyMatrix4(makeScale(-1));
                cannonBalls[i].updateMovement(ballVector);
            }
    
            //Ball Colisions
            /* TO DO - Corrigir bug das colisões */
            var j = 0;
            while(j < cannonBalls.length) {
                if(cannonBalls[i] != cannonBalls[j]) {
                    if(hasIntersectedWithBall(cannonBalls[i].position.x, cannonBalls[i].position.z, cannonBalls[j].position.x, cannonBalls[j].position.z, sphereRadius, sphereRadius)) {
                        var ballVector1 = new THREE.Vector3( 0, 0, 0 );
                        var ballVector2 = new THREE.Vector3( 0, 0, 0 );
                        /*
                        if(cannonBalls[i].isMoving() && cannonBalls[j].isMoving()) {
                            ballVector1 = cannonBalls[i].getMovement();
                            ballVector2 = cannonBalls[j].getMovement();
                            ballVector1.applyMatrix4(makeScale(-1));
                            ballVector2.applyMatrix4(makeScale(-1));

                            //Troca-se os vetores
                            cannonBalls[j].updateMovement(ballVector1);
                            cannonBalls[i].updateMovement(ballVector2);
                            break;
                        }
                        */
                        if(cannonBalls[i].isMoving()) {
                            ballVector1 = cannonBalls[i].getMovement();
                            ballVector2.x = ballVector1.x; //Fazer simplesmente ballVector2 = ballVector causa problemas
                            ballVector2.y = ballVector1.y;
                            ballVector2.z = ballVector1.z;
                            ballVector.applyMatrix4(makeScale(-1));
                            cannonBalls[j].updateMovement(ballVector2);
                            cannonBalls[i].updateMovement(ballVector1);
                        }
                        else if(cannonBalls[j].isMoving()) {
                            ballVector1 = cannonBalls[j].getMovement();
                            ballVector2.x = ballVector1.x; //Fazer simplesmente ballVector2 = ballVector causa problemas
                            ballVector2.y = ballVector1.y;
                            ballVector2.z = ballVector1.z;
                            ballVector.applyMatrix4(makeScale(-1));
                            cannonBalls[i].updateMovement(ballVector2);
                            cannonBalls[j].updateMovement(ballVector1);
                        }
                    }
                }
                j++;
            }
    
            //Ball Movement
            if(cannonBalls[i].isMoving()) {
                ballVector = cannonBalls[i].getMovement();
                cannonBalls[i].translateOnAxis(ballVector, ballSpeed*delta)
                /* TO DO - Fazer esta parte com Matrizes e sem o translateOnAxis */
                //console.log(cannonBalls[i].position.x)
                //ballVector.applyMatrix4(makeScale(ballSpeed*delta));
                //console.log(ballSpeed*delta)
                //cannonBalls[i].applyMatrix(makeTranslation(ballVector.x, ballVector.y, ballVector.z));
                //cannonBalls[i].updateMovement(ballVector);
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