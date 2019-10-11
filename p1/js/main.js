var camera, scene, renderer;
var camera1, camera2, camera3;
var robot, targetBase, targetToroid;

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
    camera2 = new THREE.OrthographicCamera( -window.innerWidth/factor, window.innerWidth/factor, window.innerHeight/factor, -window.innerHeight/factor, 1, 1000 );

    camera2.position.x = 0;
    camera2.position.y = 0;
    camera2.position.z = 50;
    camera2.lookAt(scene.position);
}

function createCamera3() {
    'use scrict';

    factor = 20
    camera3 = new THREE.OrthographicCamera( -window.innerWidth/factor, window.innerWidth/factor, window.innerHeight/factor, -window.innerHeight/factor, 1, 1000 );

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

    scene.add(new THREE.axesHelper(10));

    robot = new Robot(0, 0, 0);

    scene.add(robot);

    targetToroid = new Toroid(20, 20.5, 0);
    targetBase = new Cylinder(20, 9, 0);

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
}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
        /* Movement */
        /* "Por convencao, orientamos o movimento com a frente do robot ser a direção inicial do braço"*/
        case 37: //left
            if (robot.userData.keyRightPressed)
                robot.movement.z = 0;
            else
                robot.movement.z = -1;
            robot.userData.keyLeftPressed = true;
            break;

        case 38: //up
            if (robot.userData.keyDownPressed)
                robot.movement.x = 0;
            else
                robot.movement.x = 1;
            robot.userData.keyUpPressed = true;
            break;

        case 39: //right
            if (robot.userData.keyLeftPressed)
                robot.movement.z = 0;
            else
                robot.movement.z = 1;
            robot.userData.keyRightPressed = true;
            break;

        case 40: //down
            if (robot.userData.keyUpPressed)
                robot.movement.x = 0;
            else
                robot.movement.x = -1;
            robot.userData.keyDownPressed = true;
            break;    

        /* Arm movement */
        /* "Por convencao, 'q' e 'a' sao negativos, 'w' e 's' sao positivos" */
        case 65: //a
            robot.userData.rotateBaseNegative = true;
            break;

        case 83: //s
            robot.userData.rotateBasePositive = true;
            break;

        case 81: //q
            robot.userData.rotateArmNegative = true;
            break;

        case 87: //w
            robot.userData.rotateArmPositive = true;
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
            targetBase.toggleWireframe();
            targetToroid.toggleWireframe();
            robot.toggleWireframe();
            break;
    }
}

function onKeyUp(e) {
    'use strict';

    switch (e.keyCode) {
        /* Movement */
        case 37: //left
            if (robot.userData.keyRightPressed)
                robot.movement.z = 1;
            else
                robot.movement.z = 0;
            robot.userData.keyLeftPressed = false;
            break;

        case 38: //up
            if (robot.userData.keyDownPressed)
                robot.movement.x = -1;
            else
                robot.movement.x = 0;
            robot.userData.keyUpPressed = false;
            break;

        case 39: //right
            if (robot.userData.keyLeftPressed)
                robot.movement.z = -1;
            else
                robot.movement.z = 0;
            robot.userData.keyRightPressed = false;
            break;

        case 40: //down
            if (robot.userData.keyUpPressed)
                robot.movement.x = 1;
            else
                robot.movement.x = 0;
            robot.userData.keyDownPressed = false;
            break;

        /* Arm movement */
        case 65: //a
            robot.userData.rotateBaseNegative = false;
            break;

        case 83: //s
            robot.userData.rotateBasePositive = false;
            break;

        case 81: //q
            robot.userData.rotateArmNegative = false;
            break;

        case 87: //w
            robot.userData.rotateArmPositive = false;
            break; 
    }
}

function animate() {
    'use strict';

    /* Movement */
    if (robot.movement.x != 0 && robot.movement.z != 0) {
        robot.translateOnAxis(robot.movement, 0.2/robot.movement.length())
    }
    else {
        robot.translateOnAxis(robot.movement, 0.2)
    }

    /* Arm Movement */
    if (robot.userData.rotateBaseNegative) {
        robot.rotateBase(0.02);
    }

    if (robot.userData.rotateBasePositive) {
        robot.rotateBase(-0.02);
    }

    if (robot.userData.rotateArmNegative && robot.currentRotationArmValue() < 1.5) {
        robot.rotateArm(0.02);
    }

    if (robot.userData.rotateArmPositive && robot.currentRotationArmValue() > -0.75) {
        robot.rotateArm(-0.02);
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