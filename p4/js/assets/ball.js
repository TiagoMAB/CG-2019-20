'use strict'

class Ball extends THREE.Object3D {
    constructor(x, y, z) {
        super()

        this.texture = new THREE.TextureLoader().load('textures/ball.jpg')
        this.material = new THREE.MeshBasicMaterial( { map: this.texture })
        this.mesh = new THREE.Mesh(new THREE.SphereGeometry( 15, 32, 32), this.material)

        this.add(this.mesh)

        this.position.set(x, y, z)
    }

}