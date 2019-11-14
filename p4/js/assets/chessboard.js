'use strict'

class Chessboard extends THREE.Object3D {
    constructor(x, y, z) {
        super()

        this.materials = new Array(6)
        this.materials[0] = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('textures/chessboard/chessboard0.jpg'), bumpMap: new THREE.TextureLoader().load('textures/chessboard/chessboard1.jpg') })

        for (var i = 1; i < 6; i++) {
            this.materials[i] = new THREE.MeshPhongMaterial( { color: 0x90d90d })
        } 

        this.mesh = new THREE.Mesh(new THREE.BoxGeometry( 10, 300, 300), this.materials)
        this.add(this.mesh)
        this.position.set(x, y, z)
        this.rotation.x = Math.PI/2;
        this.rotation.y = Math.PI/2;

    }

}