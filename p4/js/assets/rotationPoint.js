class RotationPoint extends THREE.Object3D {
    constructor(x, y, z, object, rotating) {
        super();

        this.position.set(x, y, z)
        this.rotating = rotating;
        this.add(object)
    }

    rotate(angle) {
        if (this.rotating) {
            this.rotation.y += angle
        }
    }
}
