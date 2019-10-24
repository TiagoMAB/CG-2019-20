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
        this.userData.startingRotationAngle = 0;
        this.userData.angle = 0;
        this.userData.direction = new THREE.Vector3( -1, 0, 0 );

        this.timeout = 0
    }

    createCannon(x, y, z) {

        var cannon, cannonBack;

        cannon = new THREE.Mesh(new THREE.CylinderGeometry( 3, 4.3, this.cannonLenght, 32), this.material);
        cannonBack = new THREE.Mesh(new THREE.SphereGeometry(4.5, 10, 10, 0, Math.PI * 2, 0, Math.PI / 2), this.material);

        cannon.applyMatrix(rotateInZ(Math.PI / 2));
        cannonBack.applyMatrix(rotateInZ(-Math.PI / 2));
        
        cannon.applyMatrix(makeTranslation(x, y, z));
        cannonBack.applyMatrix(makeTranslation(x+this.cannonLenght/2, y, z));
    
        this.cannon.add(cannon);
        this.cannon.add(cannonBack);

        this.add(this.cannon);
    }

    toggleWireframe() {
        this.material.wireframe = !this.material.wireframe;
    }

    rotateCannon(angle) {
        this.userData.angle += angle;
        this.cannon.applyMatrix(rotateInY(angle)); //Uses a function from our ../utils/matrixTools.js
    }

    currentRotationValue() {
        return this.userData.angle;
    }
   
    updateDirection(angle) {
        var vector = this.userData.direction.clone();
        vector.applyMatrix4(rotateInY(angle));
        return vector;
    }

    shootBall() {
        
        if (this.timeout == 0) { 
            var cannonBall;
            var ballVector1 = new THREE.Vector3( 0, 0, 0 );

            cannonBall = new CannonBall(0, 0, 0, sphereRadius, maxBallSpeed, initialSpin, allAxesToggled);
            cannonBall.applyMatrix(makeTranslation(this.position.x, sphereRadius, this.position.z))

            ballVector1 = this.updateDirection(this.currentRotationValue());
            ballVector1.applyMatrix4(makeScale(cannonLenght/2 + sphereRadius));
            
            cannonBall.applyMatrix(makeTranslation(ballVector1.x, ballVector1.y, ballVector1.z)); //Move it to be in front of the cannon
            cannonBall.updateMovement(ballVector1.x, ballVector1.y, ballVector1.z);
            cannonBall.updateSpeed(maxBallSpeed);

            if(numShots > 0) { //Resets the camera vector so that it doesn't generate conflicts
                camera3.applyMatrix(makeTranslation(camera3Vector.x, camera3Vector.y, camera3Vector.z));
            }

            camera3Vector = ballVector1;
            camera3.applyMatrix(makeTranslation(-camera3Vector.x, -camera3Vector.y, -camera3Vector.z));
            cannonBall.add(camera3);
            camera3.lookAt(cannonBall.getMovement());

            cannonBalls.push(cannonBall);
            scene.add(cannonBall);
            numShots++;
            this.timeout = 90
        }
    }
}