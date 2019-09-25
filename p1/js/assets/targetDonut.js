
var geometry, material, mesh;

function createTargetDonut(x, y, z) {
    'use scrict';

    TargetDonut = new THREE.Object3D();
    TargetDonut.userData = { jumping: true, step: 0 };

    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    // - a circle of radius 5 on top (1st parameter)
    // - a circle of radius 5 on the bottom (2nd parameter)
    // - a height of 20 (3rd parameter)
    // - however many segments needed around its circumference so it looks circular (4th parameter)
    geometry = new THREE.TorusGeometry(3, 1, 16, 32);
    mesh = new THREE.Mesh(geometry, material);

    TargetDonut.add(mesh);
    TargetDonut.position.set(x, y, z);

    scene.add(TargetDonut);

}