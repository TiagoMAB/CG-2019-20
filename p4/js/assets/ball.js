'use strict'

class Ball extends THREE.Object3D {
    constructor(x, y, z) {
        super()

        this.texture = new THREE.TextureLoader().load('textures/ball/ball.jpg')
        this.material = new THREE.MeshPhongMaterial( { map: this.texture })

        this.mesh = new THREE.Mesh(new THREE.SphereGeometry( 15, 32, 32), this.material)
        this.mesh.receiveShadow = true
        this.mesh.castShadow = true

        this.add(this.mesh)

        this.position.set(x, y, z)
    }

    toggleWireframe() {
        this.children[0].material.wireframe = !this.children[0].material.wireframe
    }
}


//CHANGE SPECULAR STUFF TO MAKE MATERIAL LOOK LIKE METAL