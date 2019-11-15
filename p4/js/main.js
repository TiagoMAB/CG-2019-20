var camera, scene, renderer, clock, pause = false
var cameras = new Array(7)  
var ball, dice, chessboard, spotLight, directionalLight
var rotationPoint1, rotationPoint1
const FACTOR = 5
var DICE_ROTATION = Math.PI/120
var BALL_ROTATION = Math.PI/120


function render() {
    'use strict' 

    renderer.render(scene, camera) 
    renderer.shadowMap.enabled = true 
    renderer.shadowMap.soft = true 
    
}

function createCameras() {
    'use scrict' 

    for (var i = 0;  i < 6;  i++) {
        cameras[i] = new THREE.OrthographicCamera( -window.innerWidth/FACTOR, window.innerWidth/FACTOR, window.innerHeight/FACTOR, -window.innerHeight/FACTOR, 1, 1000 ) 
    }

    var d = 110
    cameras[0].position.set(0, 0, d) 
    cameras[1].position.set(0, 0, -d) 
    cameras[2].position.set(-d, 0, 0) 
    cameras[3].position.set(d, 0, 0) 
    cameras[4].position.set(0, -d, 0) 
    cameras[5].position.set(0, d, 0) 
    
    for (var i = 0;  i < 6;  i++) {
        cameras[i].lookAt(0, 0, 0)
    }

    cameras[6] = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000) 

    cameras[6].position.set(0, 30, 200) 
    cameras[6].lookAt(scene.position) 

    camera = cameras[0] 
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

}

function toggleWireframe() {
    ball.toggleWireframe();
    dice.toggleWireframe()
    chessboard.toggleWireframe()
}

function onKeyDown(e) {
    'use strict'

    switch (e.keyCode) {

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

function onKeyUp(e) {
    'use strict' 

}

function onKeyPress(e) {
    'use strict' 

    switch (e.keyCode) {

        case 49: //1
            camera = cameras[0]
            break

        case 50: //2
            camera = cameras[1]
            break 
            
        case 51: //3
            camera = cameras[2]
            break 

        case 52: //4
            camera = cameras[3]   
            break 
        
        case 53: //5
            camera = cameras[4]
            break 

        case 54: //6
            camera = cameras[5]
            break 

        case 55: //6
            camera = cameras[6]
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

    if(window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = renderer.getSize().width / renderer.getSize().height 
        camera.updateProjectionMatrix() 
        console.log("width" + renderer.getSize().width + " | height: " + renderer.getSize().height)
    }
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
    window.addEventListener("keyup", onKeyUp)    
    window.addEventListener("keypress", onKeyPress)    
    
}
