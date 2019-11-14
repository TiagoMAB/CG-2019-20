var camera, scene, renderer, clock;
var cameras = new Array(7); 
var ball, dice;
var factor = 5

function render() {
    'use strict';

    renderer.render(scene, camera);
    
}

function createCameras() {
    'use scrict';

    for (var i = 0; i < 6; i++) {
        cameras[i] = new THREE.OrthographicCamera( -window.innerWidth/factor, window.innerWidth/factor, window.innerHeight/factor, -window.innerHeight/factor, 1, 1000 );
    }

    cameras[0].position.set(0, 0, 50);
    cameras[1].position.set(0, 0, -50);
    cameras[2].position.set(-50, 0, 0);
    cameras[3].position.set(50, 0, 0);
    cameras[4].position.set(0, -50, 0);
    cameras[5].position.set(0, 50, 0);
    
    for (var i = 0; i < 6; i++) {
        cameras[i].lookAt(0, 0, 0)
    }
}
/*
function createCamera1() {
    'use scrict';

    cameras[1] = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);

    cameras[1].position.set(0, 30, 200);
    cameras[1].lookAt(scene.position);
}

function createCamera2() {
    'use scrict';

    cameras[2] = new THREE.OrthographicCamera( -window.innerWidth/factor, window.innerWidth/factor, window.innerHeight/factor, -window.innerHeight/factor, 1, 1000 );
    console.log("1 " + -window.innerWidth/factor + " 3 e 4 (+/-) " + window.innerHeight/factor)
    cameras[2].position.set(-25, 0, 10);
}
*/
function createCamera() {
    'use scrict';
    camera = cameras[0];
}


function createScene() {
    'use scrict';

    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(10));
    ball = new Ball(0, 0, 0)
    scene.add(ball)

    dice = new Dice(10, 0, 10)
    scene.add(dice)

    chessboard = new Chessboard(10, 0, 10)
    scene.add(chessboard)

}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {

        /*  Alternate between Lambert & Phong   */
        case 69: //e
        
            
            break; 

        /*  Toggle Ilumination Calculation  */
        case 87: //w
          
            break; 
            
        /*  Toggle Directionl Light */
        case 81: //q
      
    }

}

function onKeyUp(e) {
    'use strict';

    switch (e.keyCode) {

    }
}

function onKeyPress(e) {
    'use strict';

    switch (e.keyCode) {

        case 49: //1
            camera = cameras[0]
            break

        case 50: //2
            camera = cameras[1]
            break;
            
        case 51: //3
            camera = cameras[2]
            break;

        case 52: //4
            camera = cameras[3]   
            break;
        
        case 53: //5
            camera = cameras[4]
            break;

        case 54: //6
            camera = cameras[5]
            break;

    }
    render()
}

function animate() {
    'use strict';
    
    setTimeout( function() {

        requestAnimationFrame( animate );

    }, 1000 / 60 );

    render();
}
function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if(window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = renderer.getSize().width / renderer.getSize().height;
        camera.updateProjectionMatrix();
        console.log("width" + renderer.getSize().width + " | height: " + renderer.getSize().height)
    }
}
function init() {
    'use strict';

    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    createScene();

    createCameras();
    createCamera();
    
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);   
    window.addEventListener("keypress", onKeyPress);   
    
}
