'use strict'

class Fence extends THREE.Object3D {
    constructor(x, y, z) {
        super();

        this.material = new THREE.MeshBasicMaterial( { color: 0x666666, wireframe: true });

        this.fence = new THREE.Object3D();

        this.createFence(x, y, z);
    }

    createFence(x, y, z) {

        var wall1, wall2, wall3;

        wall1 = new THREE.Mesh(new THREE.BoxGeometry(60, 20, 1), this.material);
        wall1.position.set(x + 20, y + 10, z + 20);

        /*wall1 = new THREE.Mesh(new THREE.BoxGeometry(20, 1, 20), this.material);
        wall1.rotation.z = Math.PI / 2;
        wall1.position.set(x, y + 2.5, z);

        wall1 = new THREE.Mesh(new THREE.BoxGeometry(20, 1, 20), this.material);
        wall1.rotation.z = Math.PI / 2;
        wall1.position.set(x, y + 2.5, z);*/
    
        this.fence.add(wall1);
        /*this.fence.add(wall2);
        this.fence.add(wall3);*/

        this.add(this.fence);
    }

    toggleWireframe() {
        this.material.wireframe = !this.material.wireframe;
    }
   
}