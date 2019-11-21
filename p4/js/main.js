var camera, previousCamera, scene, renderer, clock, pause = false
var cameras = new Array(3)  
var ball, dice, chessboard, spotLight, directionalLight, rotationPoint1, rotationPoint1
var usingPhong = true
var ASPECT = 1.9875776397515528
const FACTOR = 5
const DICE_ROTATION = Math.PI/120
const BALL_ROTATION = Math.PI/120
const PAUSE_POSITION = 300


function render() {
    'use strict' 

    renderer.shadowMap.enabled = true 
    renderer.shadowMap.soft = true 
    renderer.render(scene, camera)     
}

function createCameras() {
    'use scrict' 

    for (var i = 0;  i < 2;  i++) {
        cameras[i] = new THREE.OrthographicCamera( -window.innerWidth/FACTOR, window.innerWidth/FACTOR, window.innerHeight/FACTOR, -window.innerHeight/FACTOR, 1, 1000 ) 
    }

    cameras[0].position.set(0, PAUSE_POSITION - 5, 0)
    cameras[1].position.set(0, PAUSE_POSITION + 105, 0)  
    
    for (var i = 0;  i < 2;  i++) {
        cameras[i].lookAt(0, 0, 0)
    }

    cameras[2] = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000) 

    cameras[2].position.set(0, 100, 250) 
    cameras[2].lookAt(scene.position) 
    
    camera = cameras[0] 
    previousCamera = 0
}

function createScene() {
    'use scrict' 

    scene = new THREE.Scene() 
    
    ball = new Ball(0, 20, 75)
    rotationPoint1 = new RotationPoint(0, 0, 0, ball, false, BALL_ROTATION, 0)
    scene.add(rotationPoint1)

    dice = new Dice(0, 30.9, 0)
    rotationPoint2 = new RotationPoint(0, 0, 0, dice, true, DICE_ROTATION, 1)
    scene.add(rotationPoint2)

    chessboard = new Chessboard(0, 0, 0)
    scene.add(chessboard)

    spotLight = new PointLight(40, 20, 0)
    scene.add(spotLight)

    directionalLight = new DirectionalLight(0, 70, 70)
    scene.add(directionalLight)

    paused = new Pause(0, PAUSE_POSITION, 175)
    scene.add(paused)

}

function toggleWireframe() {
    ball.toggleWireframe();
    dice.toggleWireframe()
    chessboard.toggleWireframe()
}

function alternateMaterials() {
    ball.alternateMaterials(usingPhong);
    dice.alternateMaterials(usingPhong);
    chessboard.alternateMaterials(usingPhong);
    usingPhong = !usingPhong;
}

function onKeyDown(e) {
    'use strict'

    switch (e.keyCode) {

        case 76: //l
            if(!pause) {
                alternateMaterials()
            }
            break

        case 80: //p
            if (!pause) {
                spotLight.power()
            }
            break

        case 82: //r
            if (pause) {
                createScene()
                createCameras() 
                render()
                pause = !pause
            }
            break
            
        case 83: //s
            if (!pause) {
                camera = cameras[1]
            }
            else {
                camera = cameras[previousCamera]
            }
            pause = !pause       
            break

        case 87: //w
            if (!pause) {
                toggleWireframe()
            }
            break

        case 68: //d
            if (!pause) {
                directionalLight.power()
            }
            break

        case 66: //b
            rotationPoint1.startAndStop()
            console.log("Logged " + rotationPoint1.rotating)
            break 
    }

}

function onKeyPress(e) {
    'use strict' 

    switch (e.keyCode) {

        case 49: //1
            if (!pause) {
                camera = cameras[0]
                previousCamera = 0
            }
            break

        case 50: //2
            if (!pause) {
                camera = cameras[2]
                previousCamera = 2
            }
            break 
    }
}

function animate() {
    'use strict' 
    //var delta = clock.getDelta()

    if (!pause) {
        rotationPoint2.rotate(1)
        rotationPoint1.updateRotation(1)
    }

    setTimeout( function() {

        requestAnimationFrame( animate ) 

    }, 1000 / 120 )
    render() 
}

function onResize() {
    'use strict' 

    renderer.setSize(window.innerWidth, window.innerHeight) 

    var aspect = window.innerWidth/window.innerHeight;

    cameras[2].aspect = aspect
    if (aspect < 1.78 || aspect == ASPECT) {
        cameras[2].zoom = aspect/ ASPECT
    }
    cameras[2].updateProjectionMatrix() 

    for (var i = 0; i < 2; i++) {
        cameras[i].left = 966 * aspect / -FACTOR;
        cameras[i].right = 966 * aspect / FACTOR;
        if (aspect < 1.78 || aspect == ASPECT) {
            cameras[i].zoom = aspect/ ASPECT
        }
        cameras[i].updateProjectionMatrix();
    }
    console.log("Width: " + window.innerWidth + "Height " + window.innerHeight)
}

function init() {
    'use strict' 

    renderer = new THREE.WebGLRenderer({ antialias: true }) 
    clock = new THREE.Clock()
    renderer.setSize(window.innerWidth, window.innerHeight) 

    document.body.appendChild(renderer.domElement) 
    
    createScene() 
    createCameras() 
    render()

    window.addEventListener("resize", onResize) 
    window.addEventListener("keydown", onKeyDown)  
    window.addEventListener("keypress", onKeyPress)    
    
}
