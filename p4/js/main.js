var camera, scene, renderer, clock, delta
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

    cameras[0].position.set(0, 0, 90) 
    cameras[1].position.set(0, 0, -90) 
    cameras[2].position.set(-90, 0, 0) 
    cameras[3].position.set(90, 0, 0) 
    cameras[4].position.set(0, -90, 0) 
    cameras[5].position.set(0, 90, 0) 
    
    for (var i = 0;  i < 6;  i++) {
        cameras[i].lookAt(0, 0, 0)
    }

    cameras[6] = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000) 

    cameras[6].position.set(0, 30, 200) 
    cameras[6].lookAt(scene.position) 
}
/*
function createCamera2() {
    'use scrict' 

    cameras[2] = new THREE.OrthographicCamera( -window.innerWidth/FACTOR, window.innerWidth/FACTOR, window.innerHeight/FACTOR, -window.innerHeight/FACTOR, 1, 1000 ) 
    console.log("1 " + -window.innerWidth/FACTOR + " 3 e 4 (+/-) " + window.innerHeight/FACTOR)
    cameras[2].position.set(-25, 0, 10) 
}
*/
function createCamera() {
    'use scrict' 
    camera = cameras[0] 
}


function createScene() {
    'use scrict' 

    scene = new THREE.Scene() 
    scene.add(new THREE.AxesHelper(10)) 
    
    ball = new Ball(0, 20, 75)
    rotationPoint1 = new RotationPoint(0, 0, 0, ball, false, BALL_ROTATION, 0)
    scene.add(rotationPoint1)

    dice = new Dice(0, 30.9, 0)
    rotationPoint2 = new RotationPoint(0, 0, 0, dice, true, DICE_ROTATION, 1)
    scene.add(rotationPoint2)

    chessboard = new Chessboard(0, 0, 0)
    scene.add(chessboard)

    spotLight = new Light(0, 80, 0)
    scene.add(spotLight)

    directionalLight = new DirectionalLight(0, 20, 20)
    scene.add(directionalLight)

}

function onKeyDown(e) {
    'use strict'

    switch (e.keyCode) {

        case 80: //d
            spotLight.power()
            break 

        case 68: //q
            directionalLight.power()
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
    

    rotationPoint2.rotate()
    rotationPoint1.updateRotation()

    render() 

    //setTimeout( function() {

        requestAnimationFrame( animate ) 

    //}, 1000 / 60 )

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
    createCamera() 
    render()
    
    window.addEventListener("resize", onResize) 
    window.addEventListener("keydown", onKeyDown) 
    window.addEventListener("keyup", onKeyUp)    
    window.addEventListener("keypress", onKeyPress)    
    
}
