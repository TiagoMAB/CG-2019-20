'use strict'

class CannonBall extends THREE.Object3D {
    constructor(x, y, z, radius) {
        super();

        this.radius = radius;
        this.material = new THREE.MeshBasicMaterial( { color: 0x8b0000, wireframe: true });
        this.geometry = new THREE.SphereGeometry(radius, 10, 10);

        this.cannonBall = new THREE.Object3D();
        this.axes = new THREE.AxesHelper(10);

        this.createCannon(x, y, z);

        this.userData.movement = new THREE.Vector3( 0, 0, 0 );
    }

    createCannon(x, y, z) {

        var cannonBall

        cannonBall = new THREE.Mesh(this.geometry, this.material);
        cannonBall.position.set(x, y, z);

        cannonBall.add(this.axes);
        this.cannonBall.add(cannonBall);

        this.add(this.cannonBall);
    }

    toggleWireframe() {
        this.material.wireframe = !this.material.wireframe;
    }

    toggleAxes() {
        this.axes.material.transparent = !this.axes.material.transparent;
        this.axes.material.opacity = 0.0;
    }
   
    hasColidedWithSphere(x, z, radius) {
        if(Math.pow(this.radius + radius, 2) >= ((Math.pow(this.position.x - x, 2) + Math.pow(this.position.z - z, 2)))) {
            return false;
        }
        else {
            return true;
        }
    }
}