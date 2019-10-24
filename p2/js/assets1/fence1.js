'use strict'

class Fence extends THREE.Object3D {
    constructor(x, y, z, thickness, height, positiveXLimit, negativeXLimit, positiveZLimit, negativeZLimit, arenaOffset) {
        super();

        this.material = new THREE.MeshBasicMaterial( { color: 0x666666, wireframe: true });

        this.fence = new THREE.Object3D();

        this.createFence(x, y, z, thickness, height, positiveXLimit, negativeXLimit, positiveZLimit, negativeZLimit, arenaOffset);
    }

    createFence(x, y, z, thickness, height, positiveXLimit, negativeXLimit, positiveZLimit, negativeZLimit, arenaOffset) {

        var wall1, wall2, wall3;

        wall1 = new THREE.Mesh(new THREE.BoxGeometry(positiveXLimit-negativeXLimit, height, thickness), this.material);
        wall1.applyMatrix(makeTranslation(x - arenaOffset, y + height/2, z + negativeZLimit));

        wall2 = new THREE.Mesh(new THREE.BoxGeometry(positiveXLimit-negativeXLimit, height, thickness), this.material);
        wall2.applyMatrix(makeTranslation(x - arenaOffset, y + height/2, z + positiveZLimit));

        wall3 = new THREE.Mesh(new THREE.BoxGeometry(positiveXLimit-negativeXLimit, height, thickness), this.material);
        wall3.applyMatrix(rotateInY(Math.PI / 2))
        wall3.applyMatrix(makeTranslation(x + negativeXLimit, y + height/2, z));
        

        this.fence.add(wall1);
        this.fence.add(wall2);
        this.fence.add(wall3);

        this.add(this.fence);
    }

    toggleWireframe() {
        this.material.wireframe = !this.material.wireframe;
    }
   
}