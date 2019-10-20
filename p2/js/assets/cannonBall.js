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
        cannonBall.applyMatrix(makeTranslation(x, y, z));

        cannonBall.add(this.axes);
        this.cannonBall.add(cannonBall);

        this.add(this.cannonBall);
    }

    toggleWireframe() {
        this.material.wireframe = !this.material.wireframe;
    }

    toggleAxes() {
        this.axes.material.transparent = !this.axes.material.transparent;
        if(this.axes.material.opacity == 0.0) {
            this.axes.material.opacity = 1.0
        }
        else {
            this.axes.material.opacity = 0.0;
        }
    }
   
    hasColidedWithSphere(x, z, radius) {
        if(Math.pow(this.radius + radius, 2) >= ((Math.pow(this.position.x - x, 2) + Math.pow(this.position.z - z, 2)))) {
            return false;
        }
        else {
            return true;
        }
    }

    hasColidedWithWalls(minX, maxZ, minZ) {
        //console.log(this.cannonBall.position.x - this.radius, minX)
        if(this.cannonBall.position.x - this.radius < minX) {
            return true
        }
        //console.log(this.cannonBall.position.z - this.radius, minZ)
        if(this.cannonBall.position.z + this.radius > maxZ || this.cannonBall.position.z - this.radius < minZ) {
            return true
        }
        return false
    }

    isMoving() {
        if(this.userData.movement.x != 0 || this.userData.movement.x != 0 || this.userData.movement.z != 0) {
            return true;
        }
        return false;
    }

    getMovement() {
        return this.userData.movement;
    }

    updateMovement(movement) {
        this.userData.movement = movement;
    }
}