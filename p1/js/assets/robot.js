'use strict'

class Robot extends THREE.Object3D {
    constructor(x, y, z) {
        super();

        this.fingerMaterial = new THREE.MeshBasicMaterial( { color: 0xC9C0BB, wireframe: true });
        this.robotArmMaterial = new THREE.MeshBasicMaterial( { color: 0x666666, wireframe: true });
        this.robotSphereMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true });
        this.robotBaseMaterial = new THREE.MeshBasicMaterial( { color: 0xFF69B4, wireframe: true });
        this.robotBaseSphereMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true });

        this.g3 = new THREE.Object3D();
        this.g2 = new THREE.Object3D();
        this.g1 = new THREE.Object3D();

        this.createRobot(x, y, z);

        this.movement = new THREE.Vector3( 0, 0, 0 );
        this.userData = { keyUpPressed: false};
        this.userData = { keyDownPressed: false};
        this.userData = { keyLeftPressed: false};
        this.userData = { keyRightPressed: false};
        this.userData = { rotateBasePositive: false };
        this.userData = { rotateBaseNegtive: false };
        this.userData = { rotateArmPositive: false };
        this.userData = { rotateArmNegative: false };
    }

    createRobot(x, y, z) {

        var p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13;

        /* Upper Robot Finger */
        p13 = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 1.5), this.fingerMaterial);
        p13.rotation.z = Math.PI / 2;
        p13.position.set(x + 15.5, y + 14.4, z);
    
        /* Lower Robot Finger */
        p12 = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 1.5), this.fingerMaterial);
        p12.rotation.z = Math.PI / 2;
        p12.position.set(x + 15.5, y + 12.6, z);

        /* Robot Hand Base */
        p11 = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.5), this.robotArmMaterial);
        p11.rotation.z = Math.PI / 2;
        p11.position.set(x + 14.5, y + 13.5, z);

        /* Upper Robot Sphere */
        p10 = new THREE.Mesh(new THREE.SphereGeometry(1.25, 10, 10), this.robotSphereMaterial);
        p10.position.set(x + 13, y + 13.5, z);

        /* Upper Arm */
        p9 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 13), this.robotArmMaterial);
        p9.position.set(x + 6.5, y + 13.5, z);
        p9.rotation.z = Math.PI / 2;

        /* Middle Robot Sphere */
        p8 = new THREE.Mesh(new THREE.SphereGeometry(1.25, 10, 10), this.robotSphereMaterial);
        p8.position.set(x, y + 13.5, z);

        /* Lower Arm */
        p7 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 13), this.robotArmMaterial);
        p7.position.set(x, y + 6.5, z);

        this.g3.add(p13);
        this.g3.add(p12);
        this.g3.add(p11);
        this.g3.add(p10);
        this.g3.add(p9);
        this.g3.add(p8);
        this.g3.add(p7);
        this.g3.position.set(x, y + 1.5, z);

        /* Lower Robot Sphere */
        p6 = new THREE.Mesh(new THREE.SphereGeometry(2.5, 10, 10, 0, Math.PI * 2, 0, Math.PI / 2), this.robotSphereMaterial);
        
        this.g2.add(p6);
        this.g2.add(this.g3);
        this.g2.position.set(x, y + 3, z);

        /* Robot Base */
        p5 = new THREE.Mesh(new THREE.boxGeometry(20, 1, 20), this.robotBaseMaterial);
        p5.position.set(x, y + 2.5, z);

        /* Robot Base Upper Right Sphere */
        p4 = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 10), this.robotBaseSphereMaterial);
        p4.position.set(x + 9, y + 1, z + 9);
        
        /* Robot Base Lower Right Sphere */
        p3 = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 10), this.robotBaseSphereMaterial);
        p3.position.set(x - 9, y + 1, z + 9);
        
        /* Robot Base Lower Left Sphere */
        p2 = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 10), this.robotBaseSphereMaterial);
        p2.position.set(x - 9, y + 1, z - 9);
        
        /* Robot Base Upper Left Sphere */
        p1 = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 10), this.robotBaseSphereMaterial);
        p1.position.set(x + 9, y + 1, z - 9);

        this.g1.add(p5);
        this.g1.add(p4);
        this.g1.add(p3);
        this.g1.add(p2);
        this.g1.add(p1);
        
        this.g1.add(this.g2);

        this.add(this.g1);

        this.g3.rotation.z = Math.PI/6;
    }

    toggleWireframe() {
        this.fingerMaterial.wireframe = !this.fingerMaterial.wireframe;
        this.robotArmMaterial.wireframe = !this.robotArmMaterial.wireframe;

        this.robotBaseMaterial.wireframe = !this.robotBaseMaterial.wireframe;
        this.robotBaseSphereMaterial.wireframe = !this.robotBaseSphereMaterial.wireframe;
        this.robotSphereMaterial.wireframe = !this.robotSphereMaterial.wireframe;
    }

    rotateBase(value) {
        this.g2.rotation.y += value;
    }

    rotateArm(value) {
        this.g3.rotation.z += value;
        console.log(this.g3.rotation.z);
    }

    currentRotationBaseValue() {
        return this.g3.rotation.y;
    }

    currentRotationArmValue() {
        return this.g3.rotation.z;
    }
   
}