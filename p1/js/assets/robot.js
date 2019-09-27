'use strict'

class Robot extends THREE.Object3D {

    constructor(x, y, z) {
        super();
        this.addRobotBase(x, y, z);
        this.addArmSupport(x, y, z);
        this.addArm(x, y, z);
        this.addArmArticulation(x, y, z);
        this.addUpperArm(x, y, z);
        this.addArmArticulation(x + 13, y, z);
        this.addBaseHand(x, y, z);
        
        this.userData = { moveUp: false, step: 0 };
        this.userData = { moveDown: false, step: 0 };
        this.userData = { moveLeft: false, step: 0 };
        this.userData = { moveRight: false, step: 0 };
    }

    addRobotBase(x, y, z) {
        'use scrict';

        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true });
        var geometry = new THREE.CubeGeometry(20, 1, 20);
        var mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.set(x, y + 2.5, z);
        this.add(mesh);
    }

    addArmSupport(x, y, z) {
        'use scrict';

        var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true });
        var geometry = new THREE.SphereGeometry(2.5, 10, 10, 0, Math.PI * 2, 0, Math.PI / 2);
        var mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.set(x, y + 3, z);
        this.add(mesh);
    }

    addArm(x, y, z) {
        'use scrict';

        var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true });
        var geometry = new THREE.CylinderGeometry(0.5, 0.5, 13);
        var mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.set(x, y + 11, z);
        this.add(mesh);
    }

    addArmArticulation(x, y, z) {
        'use scrict';

        var material = new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true });
        var geometry = new THREE.SphereGeometry(1.25, 10, 10);
        var mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.set(x, y + 17.5, z);
        this.add(mesh);
    }

    addUpperArm(x, y, z) {
        'use scrict';

        var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true });
        var geometry = new THREE.CylinderGeometry(0.5, 0.5, 13);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.z = Math.PI / 2;
        mesh.position.set(x + 6.5, y + 17.5, z);
        this.add(mesh);
    }

    addBaseHand(x, y, z) {
        'use scrict';

        var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true });
        var geometry = new THREE.CylinderGeometry(1.25, 1.25, 1);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.z = Math.PI / 2;
        mesh.position.set(x + 14.75, y + 17.5, z);
        this.add(mesh);
    }

    addFinger(x, y, z) {
        'use scrict';

        var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true });
        var geometry = new THREE.CylinderGeometry(1.25, 1.25, 1);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.z = Math.PI / 2;
        mesh.position.set(x + 14.75, y + 17.5, z);
        this.add(mesh);
    }

}