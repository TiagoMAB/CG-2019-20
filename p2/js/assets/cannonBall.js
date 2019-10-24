'use strict'

class CannonBall extends THREE.Object3D {
    constructor(x, y, z, radius, initialSpin, allAxesToggled) {
        super();

        this.radius = radius;
        this.material = new THREE.MeshBasicMaterial( { color: 0x8b0000, wireframe: true });
        this.geometry = new THREE.SphereGeometry(radius, 10, 10);

        this.cannonBall = new THREE.Object3D();
        this.axes = new THREE.AxesHelper(10);

        this.createCannonBall(x, y, z);

        this.userData.movement = new THREE.Vector3( 0, 0, 0 );
        this.userData.spin = initialSpin;
        this.userData.collidedWithBallN;
        this.userData.canFall = false;

        this.userData.hitWall = 0;

        if(allAxesToggled) {
            this.toggleAxes();
        }
    }

    createCannonBall(x, y, z) {

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

    isMoving() {
        if((this.userData.movement.x != 0 || this.userData.movement.y != 0 || this.userData.movement.z != 0)) {
            return true;
        }
        this.userData.movement.applyMatrix4(makeScale(0));
        return false;
    }

    getMovement() {
        return this.userData.movement;
    }

    getSpeed() {
        return Math.sqrt(Math.pow(this.userData.movement.x, 2) + Math.pow(this.userData.movement.z, 2));
    }

    getAngle() {
        return -Math.atan2(this.userData.movement.z, this.userData.movement.x)
    }

    applyFriction(friction) {
        if(this.getSpeed() > 0) {
            var oldSpeed = this.getSpeed();
            /*  applyFriction will continuously decrease speed until it gets close to zero but never zero itself. 
                To ensure that, when the ball effectively stops, the vector movement is reset, we have the following if*/
            if(oldSpeed < 0.001) { 
                this.updateMovement(0, 0, 0);
                return;
            }
            var newSpeed = oldSpeed - friction;
            this.updateSpeed(((newSpeed*100)/oldSpeed)/100);
            this.userData.spin = Math.sqrt(this.getSpeed()/this.radius); //v = w*r (=) w=v/r -> angular velocity
        }
    }

    updateMovement(x, y, z) {
        this.userData.movement.x = x;
        this.userData.movement.y = y;
        this.userData.movement.z = z;
    }

    updateSpeed(speed) {
        this.userData.movement.x *= speed;
        this.userData.movement.z *= speed;
    }

    spin() {
        var vector = new THREE.Vector3(-this.userData.movement.z, 0, -this.userData.movement.x);
        vector.applyMatrix4(rotateInZ(-Math.PI));

        var m = new THREE.Matrix4();
        m.makeRotationAxis(vector.normalize(), this.userData.spin/10);

        this.cannonBall.matrix.multiply(m);

        this.cannonBall.rotation.setFromRotationMatrix(this.cannonBall.matrix);
    }

    canFall() { //Makes the ball able to fall once it goes over the edge of the floor again
        this.userData.canFall = true;
    }

    isFalling(x, maxX) {
        if(x > maxX && this.userData.canFall) {
            return this.userData.canFall;
        }
        return false;
    }

    collidedWithBall(number) {
        this.userData.collidedWithBallN = number;
    }
}