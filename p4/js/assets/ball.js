'use strict'

class Ball extends THREE.Object3D {
    constructor(x, y, z) {
        super()

        this.texture = new THREE.TextureLoader().load('textures/ball/ball.jpg')
        this.materialPhong = new THREE.MeshPhongMaterial( { map: this.texture, shininess: 76.8, specular: 0x888888})
        this.materialBasic = new THREE.MeshBasicMaterial( { map: this.texture })

        this.mesh = new THREE.Mesh(new THREE.SphereGeometry( 15, 32, 32), this.materialPhong)
        this.mesh.receiveShadow = true
        this.mesh.castShadow = true

        this.add(this.mesh)

        this.position.set(x, y, z)
    }

    toggleWireframe() {
        this.children[0].material.wireframe = !this.children[0].material.wireframe
    }

    alternateMaterials(usingPhong) {
        var wireframeBool = this.children[0].material.wireframe
        if(usingPhong) {
            this.children[0].material = this.materialBasic
        }
        else {
            this.children[0].material = this.materialPhong
        }
        
        this.children[0].material.wireframe = wireframeBool
    }
}


//CHANGE SPECULAR STUFF TO MAKE MATERIAL LOOK LIKE METAL
