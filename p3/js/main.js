var camera, scene, renderer, clock;
var camera1, camera2;
var portrait, sculpture, gallery;
var stand, standMaterialBasic, standMaterialLambert, standMaterialPhong;
var light1, light2, light3, light4, directionalLight;
var target1, target2, target3, target4;
var usingLambert = true, calculateIlumination = true;


function render() {
    'use strict';

    renderer.render(scene, camera);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.soft = true;
    
}

function createCamera1() {
    'use scrict';

    camera1 = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);

    camera1.position.set(0, 10, 120);
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

    sculpture = new Sculpture(40,0,20)
    scene.add(sculpture);

    stand = new THREE.Object3D();
    standMaterialBasic = new THREE.MeshBasicMaterial( { color: 0xdaa520 } )
    standMaterialLambert = new THREE.MeshLambertMaterial( { color: 0xdaa520 } )
    standMaterialPhong = new THREE.MeshPhongMaterial( { color: 0xdaa520 } )

    var cylinder = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 30, 16), standMaterialLambert);
    cylinder.position.set(40,-23,20)

    cylinder.castShadow = true;
    cylinder.recieveShadow = true;
    stand.add(cylinder)
    scene.add(stand)
    
}

function createPortrait() {

    portrait = new Portrait(-40,0,0);
    scene.add(portrait);
}

function createLights() {

    /*
    light1 = new Light(-30,20,0,Math.PI/3);
    light1.power();
    scene.add(light1);

    light2 = new Light(-15,10,5,Math.PI/3);
    light2.power();
    scene.add(light2);

    light3 = new Light(15,10,5,Math.PI/3);
    light3.power();
    scene.add(light3);

    light4 = new Light(30,20,0,Math.PI/3);
    light4.power();
    scene.add(light4);
    */

    
    target1 = new THREE.Object3D();
    target1.position.set(-40,0,0);

    target2 = new THREE.Object3D();
    target2.position.set(-40,0,0);

    target3 = new THREE.Object3D();
    target3.position.set(40,0,20);

    target4 = new THREE.Object3D();
    target4.position.set(40,0,20);


    light1 = new Light(-30,20+15,15,Math.PI/3,Math.PI/5,target1);
    light1.power();
    light1.power();
    scene.add(light1);

    light2 = new Light(-20,45,45,Math.PI/2,Math.PI/8,target2);
    light2.power();
    light2.power();
    scene.add(light2);

    light3 = new Light(20,10+15,10,0,Math.PI/12,target3);
    light3.power();
    light3.power();
    scene.add(light3);

    light4 = new Light(20,45,45,Math.PI/2,Math.PI/12,target4);
    light4.power();
    light4.power();
    scene.add(light4);

    directionalLight = new THREE.DirectionalLight( 0xffffff, 1);
    directionalLight.position.set(0, 20, 20)
    //directionalLight.target.position.set(0,0,0)
    directionalLight.castShadow = true;

    directionalLight.shadow.camera.near = 2;
    directionalLight.shadow.camera.far = 200;
    directionalLight.shadow.camera.left = -100;
    directionalLight.shadow.camera.right = 100;
    directionalLight.shadow.camera.top = 100;
    directionalLight.shadow.camera.bottom = -100;

    scene.add( directionalLight );
    //scene.add( directionalLight.target );
    render();
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

function alternateMaterials() {
    if(usingLambert) {
        gallery.alternateMaterials(usingLambert);
        portrait.alternateMaterials(usingLambert);
        sculpture.alternateMaterials(usingLambert);
        stand.children[0].material = standMaterialPhong;
        usingLambert = false;
    }
    else {
        gallery.alternateMaterials(usingLambert);
        portrait.alternateMaterials(usingLambert);
        sculpture.alternateMaterials(usingLambert);
        stand.children[0].material = standMaterialLambert;
        usingLambert = true;
    }
}

function toggleIluminationCalculation() {
    if(calculateIlumination) {
        gallery.toggleIluminationCalculation(calculateIlumination,usingLambert);
        portrait.toggleIluminationCalculation(calculateIlumination,usingLambert);
        sculpture.toggleIluminationCalculation(calculateIlumination,usingLambert);
        stand.children[0].material = standMaterialBasic;
        calculateIlumination = false;
    }
    else {
        gallery.toggleIluminationCalculation(calculateIlumination,usingLambert);
        portrait.toggleIluminationCalculation(calculateIlumination,usingLambert);
        sculpture.toggleIluminationCalculation(calculateIlumination,usingLambert);
        if(usingLambert) {
            stand.children[0].material = standMaterialLambert;
        }
        else {
            stand.children[0].material = standMaterialPhong;
        }
        calculateIlumination = true;
    }
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

        /*  Alternate between Lambert & Phong   */
        case 69: //e
            alternateMaterials()
            
            break; 

        /*  Toggle Ilumination Calculation  */
        case 87: //w
            toggleIluminationCalculation();
            break; 
            
        /*  Toggle Directionl Light */
        case 81: //q
            if(directionalLight.intensity) {
                directionalLight.intensity = 0;
            }
            else {
                directionalLight.intensity = 1;
            }
            break;
    }
    render();
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
            light1.power();
            break;

        case 50: //2
            light2.power();
            break;
            
        case 51: //3
            light3.power();
            break;

        case 52: //4
            light4.power();
            break;
        
        
        /*  Camera  */
        case 53: //5
            camera = camera1;
            break;

        case 54: //6
            camera = camera2;
            break;


        

    }
    render();
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
    
    var directionalLight = new THREE.directionalLight( 0x777777 ); 
    scene.add( directionalLight );
            
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