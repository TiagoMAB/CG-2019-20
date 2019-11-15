'use strict'

class Chessboard extends THREE.Object3D {
    constructor(x, y, z) {
        super()

        this.materialsPhong = new Array(6)
        this.materialsBasic = new Array(6)
        this.materialsPhong[0] = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('textures/chessboard/chessboard0.jpg'), bumpMap: new THREE.TextureLoader().load('textures/chessboard/chessboard1.jpg') })
        this.materialsBasic[0] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('textures/chessboard/chessboard0.jpg') })

        for (var i = 1; i < 6; i++) {
            this.materialsPhong[i] = new THREE.MeshPhongMaterial( { color: 0x8b5a2b, bumpMap: new THREE.TextureLoader().load('textures/chessboard/chessboard1.jpg')})
        } 

        for (var i = 1; i < 6; i++) {
            this.materialsBasic[i] = new THREE.MeshBasicMaterial( { color: 0x8b5a2b} )
        } 

        this.mesh = new THREE.Mesh(new THREE.BoxGeometry( 10, 300, 300), this.materialsPhong)
        this.mesh.receiveShadow = true

        this.add(this.mesh)
    
        this.position.set(x, y, z)
        this.rotation.x = Math.PI/2;
        this.rotation.y = Math.PI/2;
        
    }

    toggleWireframe() {
        for(var i = 0; i < 6; i++) {
            this.children[0].material[i].wireframe = !this.children[0].material[i].wireframe
        }
        
    }

    alternateMaterials(usingPhong) {
        var wireframeBool = this.children[0].material[0].wireframe
        if(usingPhong) {
            this.children[0].material = this.materialsBasic
        }
        else {
            this.children[0].material = this.materialsPhong
        }

        for(var i = 0; i < 6; i++) {
            this.children[0].material[i].wireframe = wireframeBool
        }
    }
}