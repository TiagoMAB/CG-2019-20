class Toroid extends THREE.Object3D {
    constructor(x, y, z) {
        super();
        this.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        this.geometry = new THREE.TorusGeometry(2, 0.5, 16, 32);
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.add(this.mesh);
        this.position.set(x, y, z);
    }
}