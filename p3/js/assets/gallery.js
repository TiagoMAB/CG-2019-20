'use strict'

class Gallery extends THREE.Object3D {
    constructor(x, y, z) {
        super();

        this.materialFloorBasic = new THREE.MeshBasicMaterial( { color: 0xbdb76b } )
        this.materialWallBasic = new THREE.MeshBasicMaterial( { color: 0xffffff } )

        this.materialFloorLambert = new THREE.MeshLambertMaterial( { color: 0xbdb76b } )
        this.materialWallLambert = new THREE.MeshLambertMaterial( { color: 0xffffff } )

        this.materialFloorPhong = new THREE.MeshPhongMaterial( { color: 0xbdb76b } )
        this.materialWallPhong = new THREE.MeshPhongMaterial( { color: 0xffffff } )

        this.gallery = new THREE.Object3D();

        this.createGallery(x,y,z);

    }

    createGallery(x,y,z) {
        var floor, wall;
        floor = new THREE.Mesh(new THREE.BoxGeometry(500, 100, 1), this.materialFloorLambert);
        floor.position.set(x, y-27.5, z);
        floor.rotation.x = Math.PI/2;

        wall = new THREE.Mesh(new THREE.BoxGeometry(300, 100, 1), this.materialWallLambert);
        wall.position.set(x, y, z-2);

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