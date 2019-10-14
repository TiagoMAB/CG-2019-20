'use strict'

class Floor extends THREE.Object3D {
    constructor(x, y, z) {
        super();

        this.material = new THREE.MeshBasicMaterial( { color: 0xbdb76b, wireframe: true });

        this.floor = new THREE.Object3D();

        this.createFloor(x, y, z);
    }

    createFloor(x, y, z) {

        var floor;

        floor = new THREE.Mesh(new THREE.BoxGeometry(60, 60, 1), this.material);
        floor.position.set(x - 10, y - 0.5, z);
        floor.rotation.x = Math.PI / 2;

        this.floor.add(floor);

        this.add(this.floor);
    }

    toggleWireframe() {
        this.material.wireframe = !this.material.wireframe;
    }
   
}