'use strict'

class Floor extends THREE.Object3D {
    constructor(x, y, z, thickness, positiveXLimit, negativeXLimit, positiveZLimit, negativeZLimit, arenaOffset) {
        super();

        this.thickness = thickness;
        this.material = new THREE.MeshBasicMaterial( { color: 0xbdb76b, wireframe: true });

        this.floor = new THREE.Object3D();

        this.createFloor(x, y, z, thickness, positiveXLimit, negativeXLimit, positiveZLimit, negativeZLimit, arenaOffset);
    }

    createFloor(x, y, z, thickness, positiveXLimit, negativeXLimit, positiveZLimit, negativeZLimit, arenaOffset) {

        var floor;

        floor = new THREE.Mesh(new THREE.BoxGeometry(positiveXLimit-negativeXLimit, positiveZLimit-negativeZLimit, thickness), this.material);
        floor.applyMatrix(rotateInX(Math.PI / 2));
        floor.applyMatrix(makeTranslation(x - arenaOffset, y - thickness/2, z));

        this.floor.add(floor);

        this.add(this.floor);
    }

    toggleWireframe() {
        this.material.wireframe = !this.material.wireframe;
    }
   
}