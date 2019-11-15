'use strict'

class Dice extends THREE.Object3D {
    constructor(x, y, z) {
        super()

        this.materialsPhong = new Array(6)
        this.materialsBasic = new Array(6)
        
        for (var i = 1; i <= 6; i++) {
            this.materialsPhong[i-1] = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('textures/dice/dice0-' + i.toString(10) + '.jpg'), bumpMap: new THREE.TextureLoader().load('textures/dice/dice1-' + i.toString(10) + '.jpg') })
        } 

        for (var i = 1; i <= 6; i++) {
            this.materialsBasic[i-1] = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('textures/dice/dice0-' + i.toString(10) + '.jpg') })
        } 

        this.mesh = new THREE.Mesh(new THREE.BoxGeometry( 30, 30, 30), this.materialsPhong)
        this.mesh.receiveShadow = true
        this.mesh.castShadow = true

        this.add(this.mesh)

        this.rotation.z = Math.PI/4;
        this.rotation.x = Math.PI/4;
        this.position.set(x, y, z)
    }

    rotate(axis, angle) {
        this.rotateOnAxis(axis, angle);
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