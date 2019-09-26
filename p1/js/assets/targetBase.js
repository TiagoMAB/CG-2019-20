
var geometry, material, mesh;

function createTargetBase(x, y, z) {
    'use scrict';

    targetBase = new THREE.Object3D();
    targetBase.userData = { jumping: true, step: 0 };

    material = new THREE.MeshBasicMaterial({ color: 0xfff000, wireframe: true });
    // - a circle of radius 5 on top (1st parameter)
    // - a circle of radius 5 on the bottom (2nd parameter)
    // - a height of 20 (3rd parameter)
    // - however many segments needed around its circumference so it looks circular (4th parameter)
    geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
    mesh = new THREE.Mesh(geometry, material);

    targetBase.add(mesh);
    targetBase.position.set(x, y, z);

    scene.add(targetBase);

}