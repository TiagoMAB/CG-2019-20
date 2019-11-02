'use strict'

class Light extends THREE.Object3D {
    constructor(x, y, z, angle) {
        super();

        this.material = new THREE.MeshBasicMaterial( { color: 0x000000 });

        this.light = new THREE.Object3D();
        
        this.angle = angle

        this.createLight(x,y,z,angle);

    }

    createLight(x,y,z,angle) {

    }

}