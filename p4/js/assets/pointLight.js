class Light extends THREE.Object3D {
    constructor(x, y, z) {
        super();

        this.pointLight = new THREE.PointLight(0xffd21c, 1, 200)
        this.pointLight.position.set(x, y, z)           

        this.pointLight.visible = true;             //MISSING: Shadows 
        this.add(this.pointLight)
    }

    power() {
        this.pointLight.visible = !this.pointLight.visible
    }
}