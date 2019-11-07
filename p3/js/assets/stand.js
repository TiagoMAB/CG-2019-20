'use strict'

class Stand extends THREE.Object3D {
    constructor(x, y, z) {
        super();

        this.stand = new THREE.Object3D();
        this.standMaterialBasic = new THREE.MeshBasicMaterial( { color: 0xdaa520 } )
        this.standMaterialLambert = new THREE.MeshLambertMaterial( { color: 0xdaa520 } )
        this.standMaterialPhong = new THREE.MeshPhongMaterial( { color: 0xdaa520 } )

        this.createStand(x, y, z)
    }

    createStand(x, y, z) {
        var cylinder = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 30, 16), this.standMaterialLambert);

        cylinder.position.set(x, y, z)
        cylinder.castShadow = true;
        cylinder.recieveShadow = true;

        this.stand.add(cylinder);
        this.add(this.stand);
    }

    alternateMaterials(usingLambert) {
        if(usingLambert) {
            this.stand.children[0].material = this.standMaterialPhong;
        }
        else {
            this.stand.children[0].material = this.standMaterialLambert;
        }
    }

    toggleIluminationCalculation(calculateIlumination, usingLambert) {
        if(calculateIlumination) {
            this.stand.children[0].material = this.standMaterialBasic;
        }
        else if(usingLambert) {
            this.stand.children[0].material = this.standMaterialLambert;
        }
        else {
            this.stand.children[0].material = this.standMaterialPhong;
        }
    }

}