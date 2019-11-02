'use strict'

class Gallery extends THREE.Object3D {
    constructor(x, y, z) {
        super();

        this.materialFloorBasic = new THREE.MeshBasicMaterial( { color: 0xbdb76b })
        this.materialWallBasic = new THREE.MeshBasicMaterial( { color: 0xffffff })

        this.materialFloorLambert = new THREE.MeshLambertMaterial( { color: 0xbdb76b })
        this.materialWallBasicLambert = new THREE.MeshLambertMaterial( { color: 0xffffff })

        this.materialFloorPhong = new THREE.MeshPhongMaterial( { color: 0xbdb76b })
        this.materialWallPhong = new THREE.MeshPhongMaterial( { color: 0xffffff })

        this.gallery = new THREE.Object3D();

        this.createGallery(x,y,z);

    }

    createGallery(x,y,z) {

        var floor = new THREE.Mesh(new THREE.BoxGeometry(500, 100, 1), this.materialFloorBasic);
        floor.position.set(x, y-27.5, z);
        floor.rotation.x = Math.PI/2;

        var wall = new THREE.Mesh(new THREE.BoxGeometry(300, 100, 1), this.materialWallBasic);
        wall.position.set(x, y, z-2);

        gallery = new THREE.Object3D();

        gallery.add(floor);
        gallery.add(wall);

        this.gallery.add(gallery);

        this.add(this.gallery);
    }

}