class Cylinder extends THREE.Object3D {
    constructor(x, y, z) {
        super();
        var material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        var geometry = new THREE.CylinderGeometry(3, 1, 16, 32);
        var mesh = new THREE.Mesh(geometry, material);

        this.add(mesh);
        this.position.set(x, y, z);
    }
}