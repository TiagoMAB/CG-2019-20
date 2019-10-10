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

        var cannon

        cannon = new THREE.Mesh(new THREE.CylinderGeometry( 2.5, 2.5, 15, 32), this.material);
        cannon.rotation.z = Math.PI / 2;
        cannon.position.set(x, y, z);
    
        this.cannon.add(cannon);

        this.add(this.cannon);
    }

    toggleWireframe() {
        this.material.wireframe = !this.material.wireframe;
    }

    rotateCannon(value) {
        this.cannon.rotation.y += value;
        console.log("value of y rotation: " + this.cannon.rotation.y);
    }

    currentRotationValue() {
        return this.cannon.rotation.y;
    }
   
}