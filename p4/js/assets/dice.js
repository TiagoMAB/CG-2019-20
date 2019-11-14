'use strict'

class Dice extends THREE.Object3D {
    constructor(x, y, z) {
        super()

        this.materials = new Array(6)
        
        for (var i = 1; i <= 6; i++) {
            this.materials[i-1] = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('textures/dice/dice0-' + i.toString(10) + '.jpg'), bumpMap: new THREE.TextureLoader().load('textures/dice/dice1-' + i.toString(10) + '.jpg') })
        } 

        this.mesh = new THREE.Mesh(new THREE.BoxGeometry( 30, 30, 30), this.materials)

        this.add(this.mesh)
        this.position.set(x, y, z)
//        this.rotation.z = Math.PI/6;
//        this.rotation.x = Math.PI/6;

    }

}