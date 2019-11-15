const TOP_SPEED = 2

class RotationPoint extends THREE.Object3D {
    constructor(x, y, z, object, rotating, angle, speed) {
        super();

        this.position.set(x, y, z)
        this.rotating = rotating

        this.speed = speed
        this.angle = angle
        
        this.object = object
        this.add(object)
    }

    rotate() {
        if (this.rotating || this.speed) {
            this.rotation.y += this.angle * this.speed
        }
    }

    spin() {
        if (this.rotating || this.speed) {
            this.object.rotation.z -= this.angle * this.speed
        }
    }

    startAndStop() {
        this.rotating = !this.rotating;
    }

    updateRotation() {
        var signal = this.rotating ? 1 : -1

        this.speed += signal * 0.005

        if(this.speed > TOP_SPEED) this.speed = TOP_SPEED
        if(this.speed < 0) this.speed = 0
        this.rotate()
        this.spin()
    }
}
