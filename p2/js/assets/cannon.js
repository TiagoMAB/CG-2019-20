'use strict'

class Cannon extends THREE.Object3D {
    constructor(x, y, z, cannonLenght) {
        super();

        this.cannonLenght = cannonLenght;
        this.material = new THREE.MeshBasicMaterial( { color: 0x00008b, wireframe: true });

        this.cannon = new THREE.Object3D();

        this.createCannon(x, y, z);

        this.userData = { rotatePositive: false };
        this.userData = { rotateNegtive: false };
        this.userData = { shot: false };
        this.userData = { repeatedShot: false };
        this.userData.startingRotationAngle = 0;
        this.userData.numShots = 0;
        this.userData.direction = new THREE.Vector3( -1, 0, 0 );
        this.userData.axis = new THREE.Vector3( 0, 1, 0 );
        //this.cannon.add(new THREE.ArrowHelper(this.userData.axis, this.userData.direction, 15, 0x00ff00))

    }

    createCannon(x, y, z) {

        var cannon, cannonBack;

        cannon = new THREE.Mesh(new THREE.CylinderGeometry( 3, 4.3, this.cannonLenght, 32), this.material);
        cannonBack = new THREE.Mesh(new THREE.SphereGeometry(4.5, 10, 10, 0, Math.PI * 2, 0, Math.PI / 2), this.material);
        cannon.rotation.z = Math.PI / 2;
        cannonBack.rotation.z = -Math.PI / 2;
        cannon.position.set(x, y, z);
        cannonBack.position.set(x+this.cannonLenght/2, y, z);
    
        this.Mesh = cannon;
        this.cannon.add(this.Mesh);
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
   
    updateDirection(angle) {
        var vector = this.userData.direction.clone();
        vector.applyAxisAngle( this.userData.axis, angle );
        return vector
    }
}