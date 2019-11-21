'use strict'

class Pause extends THREE.Object3D {
    constructor(x, y, z) {
        super()

        this.materials = new Array(6)
        this.materials[0] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('textures/pause/pause.png') })

        for (var i = 1; i < 6; i++) {
            this.materials[i] = new THREE.MeshBasicMaterial( { opacity: -1 } )
        } 

        this.mesh = new THREE.Mesh(new THREE.BoxGeometry( 1, 25, 100), this.materials)

        this.add(this.mesh)
    
        this.position.set(x, y, z)
        this.rotation.z = Math.PI/2
        this.rotation.y = -Math.PI/2
    }

}