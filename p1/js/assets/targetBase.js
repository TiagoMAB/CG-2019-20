class Cylinder extends THREE.Object3D {
    constructor(x, y, z) {
        super();
        this.material = new THREE.MeshBasicMaterial({ color: 0xfff000, wireframe: true });
        this.geometry = new THREE.CylinderGeometry( 2.5, 2.5, 18, 32 );
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.add(this.mesh);
        this.position.set(x, y, z);
    }

    toggleWireframe() {
        this.material.wireframe = !this.material.wireframe;
    }
}