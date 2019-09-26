class Cylinder extends THREE.Object3D {
    constructor(x, y, z) {
        super();
        var material = new THREE.MeshBasicMaterial({ color: 0xfff000, wireframe: true });
        var geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
        var mesh = new THREE.Mesh(geometry, material);

        this.add(mesh);
        this.position.set(x, y, z);
    }
}