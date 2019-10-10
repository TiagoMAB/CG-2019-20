'use strict'

class CannonBall extends THREE.Object3D {
    constructor(x, y, z) {
        super();

        this.material = new THREE.MeshBasicMaterial( { color: 0x8b0000, wireframe: true });

        this.cannonBall = new THREE.Object3D();
        this.axes = new THREE.AxisHelper(10);

        this.createCannon(x, y, z);
    }

    createCannon(x, y, z) {

        var cannonBall

        cannonBall = new THREE.Mesh(new THREE.SphereGeometry(2.5, 10, 10), this.material);
        cannonBall.position.set(x, y, z);

        cannonBall.add(this.axes);
        this.cannonBall.add(cannonBall);

        this.add(this.cannonBall);
    }

    toggleWireframe() {
        this.material.wireframe = !this.material.wireframe;
    }
   
}