'use strict'

class Sculpture extends THREE.Object3D {
    constructor(x, y, z) {
        super();

        this.materialBasic = new THREE.MeshBasicMaterial( { color: 0x00008b, wireframe: true });
        this.materialLambert = new THREE.MeshLambertMaterial( { color: 0x00008b });
        this.materialPhong = new THREE.MeshPhongMaterial( { color: 0x00008b });

        this.sculpture = new THREE.Object3D();

        this.createSculpture(x,y,z);

    }

    createSculpture(x,y,z) {
        //  Geometry
        var goldenRatio = (1 + Math.sqrt(5))/2
        var deformityFactor = 1.34
        var geometry = new THREE.Geometry();
        var icosahedron =  new THREE.IcosahedronGeometry(1.9);

        //  Vertices
        /*  By observing how icosahedron.vertices is organized, I recreated the vertices in their 
            correct position while also altering them so that no regular triangles can be found */
        geometry.vertices.push( new THREE.Vector3( -goldenRatio, 0, 1*deformityFactor));
        geometry.vertices.push( new THREE.Vector3( 0, 1, goldenRatio));
        geometry.vertices.push( new THREE.Vector3( -1, goldenRatio, 0));
        geometry.vertices.push( new THREE.Vector3( 1*deformityFactor, goldenRatio, 0));
        geometry.vertices.push( new THREE.Vector3( 0, 1, -goldenRatio));
        geometry.vertices.push( new THREE.Vector3( -goldenRatio, 0, -1));
        geometry.vertices.push( new THREE.Vector3( goldenRatio, 0, 1*deformityFactor));
        geometry.vertices.push( new THREE.Vector3( 0, -1*deformityFactor, goldenRatio));
        geometry.vertices.push( new THREE.Vector3( -1, -goldenRatio, 0));
        geometry.vertices.push( new THREE.Vector3( 0, -1*deformityFactor, -goldenRatio));
        geometry.vertices.push( new THREE.Vector3( goldenRatio, 0, -1));
        geometry.vertices.push( new THREE.Vector3( 1, -goldenRatio, 0));

        //  Faces
        /*  Since the vertices are similar and in the same position within the vertices array, we
            can re-use icosahedron.faces in order to generate the new object's faces */
        geometry.faces = icosahedron.faces;
 
        // Compute Normals
        geometry.computeVertexNormals();
 
        var sculpture = new THREE.Mesh(geometry, this.materialBasic);
        sculpture.scale.set(5,5,5)
        sculpture.position.set(x,y,z)

        this.sculpture.add(sculpture);
        
        this.add(this.sculpture);
        //console.log("children:", this.sculpture.children[0].materialBasic) so that's how you can change the material
    }

}

/*
                // points
				var vertices = new THREE.DodecahedronGeometry( 10 ).vertices;
				for ( var i = 0; i < vertices.length; i ++ ) {
					//vertices[ i ].add( randomPoint().multiplyScalar( 2 ) ); // wiggle the points
				}
				var pointsMaterial = new THREE.PointsMaterial( {
					color: 0x0080ff,
					map: texture,
					size: 1,
					alphaTest: 0.5
				} );
				var pointsGeometry = new THREE.BufferGeometry().setFromPoints( vertices );
				var points = new THREE.Points( pointsGeometry, pointsMaterial );
				this.group.add( points );
				// convex hull
				var meshMaterial = new THREE.MeshLambertMaterial( {
					color: 0xffffff,
					opacity: 0.5,
					transparent: true
				} );
				var meshGeometry = new ConvexBufferGeometry( vertices );
				var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
				mesh.materialBasic.side = THREE.BackSide; // back faces
				mesh.renderOrder = 0;
				this.group.add( mesh );
				var mesh = new THREE.Mesh( meshGeometry, meshMaterial.clone() );
				mesh.materialBasic.side = THREE.FrontSide; // front faces
				mesh.renderOrder = 1;
				this.group.add( mesh );
                //
                
*/