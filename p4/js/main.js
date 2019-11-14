var camera, scene, renderer, clock;
var camera1, camera2, isCamera2 = false;
var ball;
var factor = 20

function render() {
    'use strict';

    renderer.render(scene, camera);
    
}

function createCamera1() {
    'use scrict';

    camera1 = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);

    camera1.position.set(0, 30, 200);
    camera1.lookAt(scene.position);
}

function createCamera2() {
    'use scrict';

    camera2 = new THREE.OrthographicCamera( -window.innerWidth/factor, window.innerWidth/factor, window.innerHeight/factor, -window.innerHeight/factor, 1, 1000 );
    console.log("1 " + -window.innerWidth/factor + " 3 e 4 (+/-) " + window.innerHeight/factor)
    camera2.position.set(-25, 0, 10);
}

function createCamera() {
    'use scrict';
    camera = camera1;
}


function createScene() {
    'use scrict';

    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(10));
    ball = new Ball(0, 0, 0)
    scene.add(ball)

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

        /*  Lights  */
        case 49: //1

            break;

        case 50: //2
 
            break;
            
        case 51: //3

            break;

        case 52: //4
 
            break;
        
        
        /*  Camera  */
        case 53: //5
            camera = camera1;
            isCamera2 = false;
            break;

        case 54: //6
            camera = camera2;
            isCamera2 = true;
            break;


        

    }

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

    createCamera1();
    createCamera2();
    createCamera();
    
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);   
    window.addEventListener("keypress", onKeyPress);   
    
}
