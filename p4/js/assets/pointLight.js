class PointLight extends THREE.Object3D {
    constructor(x, y, z) {
        super()

        this.pointLight = new THREE.PointLight(0xffffff, 1, 300)
        this.pointLight.position.set(x, y, z)           

        this.pointLight.castShadow = true
        this.pointLight.visible = true             
        this.add(this.pointLight)
    }

    power() {
        this.pointLight.visible = !this.pointLight.visible
    }
}