'use strict'

class Gallery extends THREE.Object3D {
    constructor(x, y, z) {
        super();

        this.materialFloorBasic = new THREE.MeshBasicMaterial( { color: 0xf20606 } )
        this.materialWallBasic = new THREE.MeshBasicMaterial( { color: 0xf20606 } )

        this.materialFloorLambert = new THREE.MeshLambertMaterial( { color: 0xf20606 } )
        this.materialWallLambert = new THREE.MeshLambertMaterial( { color: 0xf20606 } )

        this.materialFloorPhong = new THREE.MeshPhongMaterial( { color: 0xf20606 } )
        this.materialWallPhong = new THREE.MeshPhongMaterial( { color: 0xf20606 } )

        this.gallery = new THREE.Object3D();
        this.gallery.castShadow = true;
        this.gallery.receiveShadow = true;

        this.createGallery(x,y,z);

    }

    createGallery(x,y,z) {
        var floor, wall;
        floor = new THREE.Mesh(new THREE.BoxGeometry(150, 0, 100, 200, 1, 200), this.materialFloorLambert);
        //floor = new THREE.Mesh(new THREE.BoxGeometry(200, 0, 100, 1, 1, 1), this.materialFloorLambert);
        floor.position.set(x, y-38.5, z);
        //floor.rotation.x = Math.PI/2;
        floor.receiveShadow = true;
        floor.castShadow = true;

        wall = new THREE.Mesh(new THREE.BoxGeometry(150, 100, 1, 200, 200, 1), this.materialWallLambert);
        //wall = new THREE.Mesh(new THREE.BoxGeometry(200, 100, 1, 1, 1, 1), this.materialWallLambert);
        wall.position.set(x, y+12, z-2);
        wall.receiveShadow = true;
        wall.castShadow = true;

        this.gallery.add(floor);
        this.gallery.add(wall);

        this.add(this.gallery);
    }

    alternateMaterials(usingLambert) {
        if(usingLambert) {
            this.gallery.children[0].material = this.materialFloorPhong;
            this.gallery.children[1].material = this.materialWallPhong;
        }
        else {
            this.gallery.children[0].material = this.materialFloorLambert;
            this.gallery.children[1].material = this.materialWallLambert;
        }

    }

    toggleIluminationCalculation(calculateIlumination, usingLambert) {
        if(calculateIlumination) {
            this.gallery.children[0].material = this.materialFloorBasic;
            this.gallery.children[1].material = this.materialWallBasic;
        }
        else {
            if(usingLambert) {
                this.gallery.children[0].material = this.materialFloorLambert;
                this.gallery.children[1].material = this.materialWallLambert;
            }
            else {
                this.gallery.children[0].material = this.materialFloorPhong;
                this.gallery.children[1].material = this.materialWallPhong;
            }            
        }
    }

}