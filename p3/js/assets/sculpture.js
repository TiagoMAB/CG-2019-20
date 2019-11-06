'use strict'

class Sculpture extends THREE.Object3D {
    constructor(x, y, z) {
        super();

        this.materialBasic = new THREE.MeshBasicMaterial( { color: 0x00008b } );
        this.materialLambert = new THREE.MeshLambertMaterial( { color: 0x00008b } );
        this.materialPhong = new THREE.MeshPhongMaterial( { color: 0x00008b } );

        this.sculpture = new THREE.Object3D();

        this.createSculpture(x,y,z);
        this.sculpture.receiveShadow = true;
        this.sculpture.castShadow = true;

    }

    createSculpture(x,y,z) {
        //  Geometry
        var goldenRatio = (1 + Math.sqrt(5))/2
        var deformityFactor = 1.73
        var geometry = new THREE.Geometry();
        
        //  Vertices
        /*  By observing how icosahedron.vertices is organized, I recreated the vertices in their 
            correct position while also altering them so that no regular triangles can be found */
         
        geometry.vertices.push(    new THREE.Vector3( -goldenRatio, 0, 1*deformityFactor),
            new THREE.Vector3( 0, 1, goldenRatio),
            new THREE.Vector3( -1, goldenRatio, 0),
            new THREE.Vector3( 1*deformityFactor, goldenRatio, 0),
            new THREE.Vector3( 0, 1, -goldenRatio),
            new THREE.Vector3( -goldenRatio, 0, -1),
            new THREE.Vector3( goldenRatio, 0, 1*deformityFactor),
            new THREE.Vector3( 0, -1*deformityFactor, goldenRatio),
            new THREE.Vector3( -1, -goldenRatio, 0),
            new THREE.Vector3( 0, -1*deformityFactor, -goldenRatio),
            new THREE.Vector3( goldenRatio, 0, -1),
            new THREE.Vector3( 1, -goldenRatio, 0),
        )

        //  Faces
        /*  Since the vertices are similar and in the same position within the vertices array, we
            can re-use icosahedron.faces in order to generate the new object's faces */
        geometry.faces.push(
            new THREE.Face3(0,1,2),
            new THREE.Face3(1,3,2),
            new THREE.Face3(3,4,2),
            new THREE.Face3(4,5,2),
            new THREE.Face3(5,0,2),
            new THREE.Face3(1,6,3),
            new THREE.Face3(0,7,1),
            new THREE.Face3(5,8,0),
            new THREE.Face3(4,9,5),
            new THREE.Face3(3,10,4),
            new THREE.Face3(6,7,11),
            new THREE.Face3(7,8,11),
            new THREE.Face3(8,9,11),
            new THREE.Face3(9,10,11),
            new THREE.Face3(10,6,11),
            new THREE.Face3(6,1,7),
            new THREE.Face3(7,0,8),
            new THREE.Face3(8,5,9),
            new THREE.Face3(9,4,10),
            new THREE.Face3(10,3,6),
        )

        var sculpture = new THREE.Mesh(geometry, this.materialLambert);
        geometry.computeFaceNormals()
        geometry.computeVertexNormals()
        sculpture.scale.set(5,5,5)
        sculpture.position.set(x,y,z)
        sculpture.receiveShadow = true;
        sculpture.castShadow = true;

        this.sculpture.add(sculpture);
        
        this.add(this.sculpture);
    }

    alternateMaterials(usingLambert) {
        if(usingLambert) {
            this.sculpture.children[0].material = this.materialPhong;
        }
        else {
            this.sculpture.children[0].material = this.materialLambert;
        }
    }

    toggleIluminationCalculation(calculateIlumination, usingLambert) {
        if(calculateIlumination) {
            this.sculpture.children[0].material = this.materialBasic;
        }
        else {
            if(usingLambert) {
                this.sculpture.children[0].material = this.materialLambert;
            }
            else {
                this.sculpture.children[0].material = this.materialPhong;
            }            
        }
    }

}