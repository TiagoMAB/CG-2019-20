'use strict'

class Light extends THREE.Object3D {
    constructor(x, y, z, angle, spotLightAngle, target) {
        super();

        this.material = new THREE.MeshBasicMaterial( { color: 0xD2691E } );

        this.light = new THREE.Object3D();
        this.spotLight = new THREE.SpotLight( 0xffffff, 0.75 )
        
        this.angle = angle;
        this.on = false;

        this.createLight(x,y,z,angle,spotLightAngle,target);

    }

    createLight(x,y,z,angle,spotLightAngle,target) {
        var cone = new THREE.Mesh(new THREE.ConeGeometry( 5, 8, 32 ), this.material);
        cone.position.set(x,y,z)
        var sphere = new THREE.Mesh(new THREE.SphereGeometry( 3, 16, 16 ), this.material);
        sphere.position.set(x,y+5,z)

        
        
        this.light.add(cone);
        this.light.add(sphere);

        cone.add(this.spotLight);
        this.spotLight.target = target;
        //this.spotLight.target = cone;
        this.spotLight.angle = spotLightAngle;
        this.spotLight.castShadow = true;
        this.spotLight.penumbra = 0.2
        //this.light.position.set(x,y+10,z+30);
        this.light.position.set(x,y,z);
        this.light.rotation.x = angle;
        
        //var spotter = new THREE.SpotLightHelper( this.spotLight );
        //this.add(spotter);
        this.add(target)

        this.add(this.light);

    }

    power() {
        if(this.on) {
            this.spotLight.power = 0;
            this.on = false;
            this.light.visible = false;
        }
        else {
            this.spotLight.power = 1 * Math.PI;
            this.on = true;
            this.light.visible = true;
        }
    }

}