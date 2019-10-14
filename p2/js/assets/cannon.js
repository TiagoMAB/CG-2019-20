'use strict'

class Cannon extends THREE.Object3D {
    constructor(x, y, z) {
        super();

        this.material = new THREE.MeshBasicMaterial( { color: 0x00008b, wireframe: true });

        this.cannon = new THREE.Object3D();

        this.createCannon(x, y, z);

        this.userData = { rotatePositive: false };
        this.userData = { rotateNegtive: false };
        this.startingRotationAngle = 0;
    }

    createCannon(x, y, z) {

        var cannon, cannonBack;

        cannon = new THREE.Mesh(new THREE.CylinderGeometry( 3, 4.3, 15, 32), this.material);
        cannonBack = new THREE.Mesh(new THREE.SphereGeometry(4.5, 10, 10, 0, Math.PI * 2, 0, Math.PI / 2), this.material);
        cannon.rotation.z = Math.PI / 2;
        cannonBack.rotation.z = -Math.PI / 2;
        cannon.position.set(x, y, z);
        cannonBack.position.set(x+7.5, y, z);
    
        this.cannon.add(cannon);
        this.cannon.add(cannonBack);

        this.add(this.cannon);
    }

    toggleWireframe() {
        this.material.wireframe = !this.material.wireframe;
    }

    rotateCannon(value) {
        this.cannon.rotation.y += value;
    }

    currentRotationValue() {
        return this.cannon.rotation.y;
    }
   
}