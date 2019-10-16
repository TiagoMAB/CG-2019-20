'use strict'

class Fence extends THREE.Object3D {
    constructor(x, y, z, thickness) {
        super();

        this.thickness = thickness;
        this.material = new THREE.MeshBasicMaterial( { color: 0x666666, wireframe: true });

        this.fence = new THREE.Object3D();

        this.createFence(x, y, z);
    }

    createFence(x, y, z) {

        var wall1, wall2, wall3;

        wall1 = new THREE.Mesh(new THREE.BoxGeometry(60, 10, this.thickness), this.material);
        wall1.position.set(x - 10, y + 5, z - 30);

        wall2 = new THREE.Mesh(new THREE.BoxGeometry(60, 10, this.thickness), this.material);
        wall2.position.set(x - 10, y + 5, z + 30);

        wall3 = new THREE.Mesh(new THREE.BoxGeometry(60, 10, this.thickness), this.material);
        wall3.rotation.y = Math.PI / 2;
        wall3.position.set(x - 40, y + 5, z);

        this.fence.add(wall1);
        this.fence.add(wall2);
        this.fence.add(wall3);

        this.add(this.fence);
    }

    toggleWireframe() {
        this.material.wireframe = !this.material.wireframe;
    }
   
}