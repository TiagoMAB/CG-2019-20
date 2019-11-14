var camera, scene, renderer, clock;
var camera1, camera2, isCamera2 = false;
var portrait, sculpture, gallery;
var stand, standMaterialBasic, standMaterialLambert, standMaterialPhong;
var light1, light2, light3, light4, directionalLight;
var target1, target2, target3, target4;
var usingLambert = true, calculateIlumination = true;
var factor = 30


function render() {
    'use strict';

    renderer.render(scene, camera);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.soft = true;
    
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

function createGallery() {

    gallery = new Gallery(0,0,0)
    scene.add(gallery)
}

function createSculpture() {

    sculpture = new Sculpture(40,0,20)
    scene.add(sculpture);
    
}

function createStand() {

    stand = new Stand(40, -23, 20);
    scene.add(stand)
}

function createPortrait() {

    portrait = new Portrait(-25,0,0);
    scene.add(portrait);
}

function createLights() {
    
    target1 = new THREE.Object3D();
    target1.position.set(-25,20,0);

    target2 = new THREE.Object3D();
    target2.position.set(-25,0,0);

    target3 = new THREE.Object3D();
    target3.position.set(40,0,20);

    target4 = new THREE.Object3D();
    target4.position.set(40,0,20);

    light1 = new Light(-12.5,55,55,2*Math.PI/3,Math.PI/5,target1);
    light1.power();
    scene.add(light1);

    light2 = new Light(-12.5,45,45,Math.PI/2,Math.PI/8,target2);
    light2.power();
    scene.add(light2);

    light3 = new Light(20,10+15,10,0,Math.PI/12,target3);
    light3.power();
    scene.add(light3);

    light4 = new Light(20,45,45,Math.PI/2,Math.PI/12,target4);
    light4.power();
    scene.add(light4);

    directionalLight = new DirectionalLight(0, 20, 20);

    scene.add(directionalLight);
    render();
}

function createScene() {
    'use scrict';

    scene = new THREE.Scene();

    createGallery();
    createStand();
    createSculpture();
    createPortrait();
    createLights();
}

function alternateMaterials() {
    if (calculateIlumination) {
        gallery.alternateMaterials(usingLambert);
        portrait.alternateMaterials(usingLambert);
        sculpture.alternateMaterials(usingLambert);
        stand.alternateMaterials(usingLambert);
    }

    if(usingLambert) {
        usingLambert = false;
    }
    else if(!usingLambert) {
        usingLambert = true;
    }
}

function toggleIluminationCalculation() {

    gallery.toggleIluminationCalculation(calculateIlumination,usingLambert);
    portrait.toggleIluminationCalculation(calculateIlumination,usingLambert);
    sculpture.toggleIluminationCalculation(calculateIlumination,usingLambert);
    stand.toggleIluminationCalculation(calculateIlumination,usingLambert);

    if (calculateIlumination)
        calculateIlumination = false;
    else
        calculateIlumination = true;
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    var screen_width = window.innerWidth;
    var screen_height = window.innerHeight;
    var aspect = screen_width/screen_height;

    camera1.aspect = aspect;
    camera1.updateProjectionMatrix();

    camera2.left = 969 * aspect / -30;
    camera2.right = 969 * aspect / 30;
    camera2.updateProjectionMatrix();

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
            directionalLight.power();
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