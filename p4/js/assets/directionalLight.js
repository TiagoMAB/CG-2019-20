'use strict'

class DirectionalLight extends THREE.Object3D {
    constructor(x, y, z) {
        super();

        this.directionalLight = new THREE.DirectionalLight( 0xffffff, 1);
        this.directionalLight.position.set(x, y, z)
        this.directionalLight.castShadow = true;
    
        this.directionalLight.shadow.camera.near = 2;
        this.directionalLight.shadow.camera.far = 200;
        this.directionalLight.shadow.camera.left = -100;
        this.directionalLight.shadow.camera.right = 100;
        this.directionalLight.shadow.camera.top = 100;
        this.directionalLight.shadow.camera.bottom = -100;
        
        this.directionalLight.visible = true;

        this.add(this.directionalLight);
    }

    power() {
        if(this.directionalLight.visible) {
            this.directionalLight.visible = false;
        }
        else {
            this.directionalLight.visible = true;
        }
    }
}