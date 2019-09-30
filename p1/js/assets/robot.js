'use strict'

class Robot extends THREE.Object3D {
    constructor(x, y, z) {
        super();

        this.createRobot(x, y, z);
        this.userData = { moveUp: false, step: 0 };
        this.userData = { moveDown: false, step: 0 };
        this.userData = { moveLeft: false, step: 0 };
        this.userData = { moveRight: false, step: 0 };
    }

    createRobot(x, y, z) {

        var p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13;
        var g1, g2, g3;
        var m1 = new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true });

        p13 = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 1.5), m1);
        p13.rotation.z = Math.PI / 2;
        p13.position.set(x + 15.5, y + 14.4, z);
    
        p12 = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 1.5), m1);
        p12.rotation.z = Math.PI / 2;
        p12.position.set(x + 15.5, y + 12.6, z);

        p11 = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.5), m1);
        p11.rotation.z = Math.PI / 2;
        p11.position.set(x + 14.5, y + 13.5, z);
        p10 = new THREE.Mesh(new THREE.SphereGeometry(1.25, 10, 10), m1);
        p10.position.set(x + 13, y + 13.5, z);

        p9 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 13), m1);
        p9.position.set(x + 6.5, y + 13.5, z);
        p9.rotation.z = Math.PI / 2;

        p8 = new THREE.Mesh(new THREE.SphereGeometry(1.25, 10, 10), m1);
        p8.position.set(x, y + 13.5, z);

        p7 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 13), m1);
        p7.position.set(x, y + 6.5, z);

        g3 = new THREE.Object3D();

        g3.add(p13);
        g3.add(p12);
        g3.add(p11);
        g3.add(p10);
        g3.add(p9);
        g3.add(p8);
        g3.add(p7);
        g3.position.set(x, y + 1.5, z);

        p6 = new THREE.Mesh(new THREE.SphereGeometry(2.5, 10, 10, 0, Math.PI * 2, 0, Math.PI / 2), m1);
        
        g2 = new THREE.Object3D();
        g2.add(p6);
        g2.add(g3);
        g2.position.set(x, y + 3, z);

        p5 = new THREE.Mesh(new THREE.CubeGeometry(20, 1, 20), m1);
        p5.position.set(x, y + 2.5, z);

        p4 = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 10), m1);
        p4.position.set(x + 9, y + 1, z + 9);
        
        p3 = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 10), m1);
        p3.position.set(x - 9, y + 1, z + 9);
       
        p2 = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 10), m1);
        p2.position.set(x - 9, y + 1, z - 9);
       
        p1 = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 10), m1);
        p1.position.set(x + 9, y + 1, z - 9);

        g1 = new THREE.Object3D();
        g1.add(p5);
        g1.add(p4);
        g1.add(p3);
        g1.add(p2);
        g1.add(p1);
        g1.add(g2);
        
        this.add(g1);

    }
   
}