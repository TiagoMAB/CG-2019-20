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

    applyFriction(friction) {

        /*  applyFriction will continuously decrease speed until it gets close to zero but never zero itself. 
            To ensure that, when the ball effectively stops, the vector speed is reset, we have the following if*/
        if(friction < 0.01) { 
            this.setSpeed(0,0,0)
            return;
        }
        
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
        
        var vector = new THREE.Vector3(-this.speed.z, 0, -this.speed.x);
        vector.applyMatrix4(rotateInZ(-Math.PI));

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
            //console.log("Hit wall with angle",this.angle)
            var angleRotation = this.angle

            switch (wall) {
                case 1:
                    angleRotation = -2*angleRotation;
                    break;
                case 2:
                    if(angleRotation > 0) {
                        //console.log(2)
                        angleRotation = Math.PI + 2*(Math.PI - angleRotation);
                    }
                    else {
                        //console.log(3)
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
        //console.log(x, maxX)
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
}