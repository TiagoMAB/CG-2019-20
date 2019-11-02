var camera, scene, renderer, clock;
var camera1, camera2;
var portrait, sculpture, stand, gallery;
var light1, light2, light3, light4;


function render() {
    'use strict';
    
    renderer.render(scene, camera);
}

function createCamera1() {
    'use scrict';

    camera1 = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);

    camera1.position.set(0, 0, 70);
    //camera1.position.set(20, 20, 20);
    camera1.lookAt(scene.position);
}

function createCamera2() {
    'use scrict';

    var factor = 30
    camera2 = new THREE.OrthographicCamera( -window.innerWidth/factor, window.innerWidth/factor, window.innerHeight/factor, -window.innerHeight/factor, 1, 1000 );
    camera2.position.set(-40, 0, 10);
}

function createCamera() {
    'use scrict';
    camera = camera1;
}

function createGallery() {

    gallery = new Gallery(0,0,0)
    scene.add(gallery)
}

function createSculpture() {

    sculpture = new Sculpture(40,0,0)
    scene.add(sculpture);
}

function createPortrait() {

    portrait = new Portrait(-40,0,0);
    scene.add(portrait);
}

function createLights() {

    //light1 = new Light(0,-10,0,-Math.PI/3);
    //scene.add(light1);

    /*light2 = new Light(0,0,0,angle);
    scene.add(light2);

    light3 = new Light(0,0,0,angle);
    scene.add(light3);

    light4 = new Light(0,0,0,angle);
    scene.add(light4);*/

}

function createScene() {
    'use scrict';

    scene = new THREE.Scene();

    clock = new THREE.Clock();

    scene.add(new THREE.AxesHelper(10));

    createGallery();
    createSculpture();
    createPortrait();
    createLights();
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

        /* Camera */
        case 53: //5
            camera = camera1;
            break;

        case 54: //6
            camera = camera2;
            break;

    }
}

function animate() {
    'use strict';
    
    //var delta = clock.getDelta() * 0.8; // *0.8 is to slow down simulation

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
    createCamera();
    
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);   
    window.addEventListener("keypress", onKeyPress);    
}

/*
// O código abaixo é do prof do exemplo que forneceu no fénix


// WithBug - R69
'use strict';

var dx  = 620;
var x_p = 0;
var z_p = 0;
var y_p = 10;

var scene, camera, orthoCamera, perspectiveCamera, renderer, spotLight;
var geometry, material, mesh;
var spotter;

init();
animate();

function switchCamera() {
    if ( camera instanceof THREE.PerspectiveCamera )
        camera = orthoCamera;
    else
        camera = perspectiveCamera;
    resizeCamera();
}

function resizeCamera() {
    renderer.setSize( window.innerWidth, window.innerHeight);
    var aspect = window.innerWidth / window.innerHeight;
    if ( camera instanceof THREE.PerspectiveCamera )
        camera.aspect = aspect;
    else {
        var dy = 620 / aspect;
        camera.left   = -310;
        camera.right  =  310;
        camera.top    =  0.5 * dy;
        camera.bottom = -0.5 * dy;
    }
    camera.updateProjectionMatrix();
}

function init() {
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);   

    var target = new THREE.Object3D();
    target.position.set( 0, 0, 0);

    perspectiveCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    perspectiveCamera.position.z = 200;
    perspectiveCamera.position.y = 200;
    perspectiveCamera.lookAt( target.position);
    scene.add( perspectiveCamera);

    orthoCamera = new THREE.OrthographicCamera( -300, 300, 600, -600, -500, 500);
    orthoCamera.position.y = 200;
    orthoCamera.position.z = 0;
    orthoCamera.lookAt( target.position);
    scene.add( orthoCamera);

    camera = perspectiveCamera;
    resizeCamera();

    var helper = new THREE.AxisHelper( 100);
    helper.translateY( .1);
    scene.add( helper);

    var planeGeo = new THREE.PlaneGeometry(600,900);
    var planeMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0x112211, shininess: 5, wireframe: false } );
    planeMaterial.side = THREE.DoubleSide;
    var planeMesh = new THREE.Mesh( planeGeo, planeMaterial);
    planeMesh.rotation.x = Math.PI * .5;
    scene.add( planeMesh );
    
    spotLight = new THREE.SpotLight( 0xffffff, 5, 90, Math.PI / 6, 10); 
    spotLight.position.set( 0, y_p, 0 );
    spotLight.target.position.set( 0, 0, 0 );
    spotLight.penumbra = .2;	
    scene.add( spotLight );	
    scene.add( spotLight.target);
    spotter = new THREE.SpotLightHelper( spotLight);
    scene.add( spotter);
    
    var ambientLight = new THREE.AmbientLight( 0x777777 ); 
    scene.add( ambientLight );
            
    document.body.appendChild(renderer.domElement);
    window.addEventListener("resize", resizeCamera);
    window.addEventListener("keydown", switchCamera);
}

function animate() {

    requestAnimationFrame( animate );
    spotter.update();

    x_p += 0.3;
    if ( x_p >= 250)
        x_p = -250;
    y_p += 0.1;
    if ( y_p >= 100 )
        y_p = 0.1;
    z_p += 0.2;
    if ( z_p >= 100)
        z_p = -100;
    
    spotLight.position.set( x_p, y_p, z_p);
    spotLight.target.position.set( x_p, 0, z_p);
    //spotLight.target.updateMatrixWorld();

    renderer.render( scene, camera );
}			
		


*/