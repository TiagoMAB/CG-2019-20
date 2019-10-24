'use strict'

class CannonBall extends THREE.Object3D {
    constructor(x, y, z, radius, maxSpeed, initialSpin, allAxesToggled, angle) {
        super();

        this.radius = radius;
        this.material = new THREE.MeshBasicMaterial( { color: 0x8b0000, wireframe: true });
        this.geometry = new THREE.SphereGeometry(radius, 15, 15);

        this.cannonBall = new THREE.Object3D();
        this.axes = new THREE.AxesHelper(10);

        this.createCannonBall(x, y, z);

        this.speed = new THREE.Vector3( 0, 0, 0 );
        this.angle = angle
        this.canFall = 0

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
        if (this.speed.x != 0 || this.speed.y != 0 || this.speed.z != 0) {
            return true;
        }
        return false;
    }

    applyFriction(friction) { //para corrigir
        
        if (this.speed.x < 0) {
            this.speed.x = Math.min(this.speed.x + friction*Math.abs(Math.cos(this.angle)), 0)
        }
        if (this.speed.z < 0) {
            this.speed.z = Math.min(this.speed.z + friction*Math.abs(Math.sin(this.angle)), 0)
        }

        if (this.speed.x > 0) {
            this.speed.x = Math.max(this.speed.x - friction*Math.abs(Math.cos(this.angle)), 0)
        }
        if (this.speed.z > 0) {
            this.speed.z = Math.max(this.speed.z - friction*Math.abs(Math.sin(this.angle)), 0)
        }

    }

    calculateAngle() {
        this.angle = - Math.atan2(this.speed.z, this.speed.x)
    }

    spin() {
        
        var vector = new THREE.Vector3(this.speed.z, 0, this.speed.x);
        vector.applyMatrix4(rotateInZ(Math.PI));

        var m = new THREE.Matrix4();
        m.makeRotationAxis(vector.normalize(), 0.5/10);

        this.cannonBall.matrix.multiply(m);

        this.cannonBall.rotation.setFromRotationMatrix(this.cannonBall.matrix);

    }

    hasIntersectedWithWall(maxX, minX, maxZ, minZ) {
        var thick = wallThickness/2
       
        if(this.position.x >= maxX) {
            return 0;
        }
        if(this.position.z + sphereRadius >= maxZ - thick) {
            return 1
        }
        if(this.position.x - sphereRadius <= minX + thick) {
            return 2;
        }
        if(this.position.z - sphereRadius <= minZ + thick) {
            return 3;
        }
        return 0;
    }

    handleCollisionsWall(positiveXLimit, negativeXLimit, positiveZLimit, negativeZLimit) {
    
        var wall = this.hasIntersectedWithWall(positiveXLimit, negativeXLimit, positiveZLimit, negativeZLimit) 
        if (wall) {
            console.log(this.angle)
            var angleRotation = this.angle

            switch (wall) {
                case 1:
                    angleRotation = -2*angleRotation;
                    break;
                case 2:
                    if(angleRotation > 0) {
                        console.log(2)
                        angleRotation = Math.PI + 2*(Math.PI - angleRotation);
                    }
                    else {
                        console.log(3)
                        angleRotation = -angleRotation - (Math.PI + angleRotation);
                    }
                    break;
                case 3:
                    angleRotation = 2*(Math.PI - angleRotation);
                    break;
            }
    
            this.speed.applyMatrix4(rotateInY(angleRotation))
            this.calculateAngle()
            this.canFall = 1
        }
    }

    isFalling(maxX) {
        console.log(x, maxX)
        if(this.position.x - this.radius/2 > maxX && this.canFall) {
            return this.canFall;
        }
        return false;
    }

    setSpeed(x, y, z) {
        this.speed.x = x;
        this.speed.y = y;
        this.speed.z = z;
        
    }
/*
    isMoving() {
        if((this.userData.movement.x != 0 || this.userData.movement.y != 0 || this.userData.movement.z != 0) && this.userData.speed > 0) {
            return true;
        }
        this.userData.movement.applyMatrix4(makeScale(0));
        return false;
    }

    getMovement() {
        return this.userData.movement;
    }

    getSpeed() {
        return this.userData.speed;
    }

    getAngle() {
        return -Math.atan2(this.userData.movement.z, this.userData.movement.x)
    }

    applyFriction(friction) {
        this.userData.speed-=friction;
        if(this.userData.speed > 0) {
            this.userData.spin = Math.sqrt(this.userData.speed/this.radius); //v = w*r (=) w=v/r -> angular speed
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

    canFall() { //Makes the ball able to fall once it goes over the edge of the floor again
        this.userData.canFall = true;
    }

    isFalling(x, maxX) {
        if(x > maxX && this.userData.canFall) {
            return this.userData.canFall;
        }
        return false;
    }
*/
}