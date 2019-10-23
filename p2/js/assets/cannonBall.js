'use strict'

class CannonBall extends THREE.Object3D {
    constructor(x, y, z, radius, maxSpeed, initialSpin, allAxesToggled) {
        super();

        this.radius = radius;
        this.material = new THREE.MeshBasicMaterial( { color: 0x8b0000, wireframe: true });
        this.geometry = new THREE.SphereGeometry(radius, 10, 10);

        this.cannonBall = new THREE.Object3D();
        this.axes = new THREE.AxesHelper(10);

        this.createCannon(x, y, z);

        this.userData.movement = new THREE.Vector3( 0, 0, 0 );
        this.userData.maxSpeed = maxSpeed
        this.userData.speed = maxSpeed;
        this.userData.spin = initialSpin;
        this.userData.colidedWithBallN;
        this.userData.canFall = false;

        this.userData.hitWall = false;

        if(allAxesToggled) {
            this.toggleAxes();
        }
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

    isMoving() {
        if((this.userData.movement.x != 0 || this.userData.movement.y != 0 || this.userData.movement.z != 0) && this.userData.speed > 0) {
            return true;
        }
        this.userData.movement.applyMatrix4(makeTranslation(0,0,0));
        return false;
    }

    getMovement() {
        return this.userData.movement;
    }

    getSpeed() {
        return this.userData.speed;
    }

    applyFriction(friction) {
        this.userData.speed-=friction;
        if(this.userData.speed > 0) {
            this.userData.spin = Math.sqrt(this.userData.speed/this.radius); //v = w*r (=) w=v/r -> angular velocity
        }
    }

    applyBounce(bounce) {
        this.userData.speed*=bounce;
    }

    updateMovement(x, y, z) {
        this.userData.movement.x = x;
        this.userData.movement.y = y;
        this.userData.movement.z = z;
    }

    updateSpeed(speed) {
        if(speed <= this.userData.maxSpeed) {
            this.userData.speed = speed;
        }
        else {
            this.userData.speed = this.userData.maxSpeed;
        }
    }

    spin() {
        /*if(this.userData.speed > 0) {
            this.cannonBall.applyMatrix(rotateInZ(this.userData.spin));
        }*/
        /*var m = new THREE.Matrix4();
        if(this.userData.movement.x != 0) {
            m.multiply(rotateInX(this.userData.spin*(Math.PI/180)))
        }
        if(this.userData.movement.y != 0) {
            console.log("help")
            m.multiply(rotateInY(this.userData.spin*(Math.PI/180)))
        }
        if(this.userData.movement.z != 0) {
            m.multiply(rotateInZ(this.userData.spin*(Math.PI/180)))
        }
        this.cannonBall.applyMatrix(m);*/
        
        var vector = new THREE.Vector3(-this.userData.movement.z, 0, -this.userData.movement.x);
        vector.applyMatrix4(rotateInZ(-Math.PI));

        var m = new THREE.Matrix4();
        m.makeRotationAxis(vector.normalize(), this.userData.spin/10);

        this.cannonBall.matrix.multiply(m);

        this.cannonBall.quaternion.setFromRotationMatrix(this.cannonBall.matrix);

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

    colidedWithBall(number) {
        this.userData.colidedWithBallN = number;
    }
}