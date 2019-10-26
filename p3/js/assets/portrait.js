'use strict'

class Portrait extends THREE.Object3D {
    constructor(x, y, z) {
        super();

        this.materialBackground = new THREE.MeshBasicMaterial( { color: 0xa9a9a9 });
        this.materialSquare = new THREE.MeshBasicMaterial( { color: 0x000000 });
        this.materialCircle = new THREE.MeshBasicMaterial( { color: 0xffffff });
        this.materialFrame = new THREE.MeshBasicMaterial( { color: 0xdaa520 });
        //this.materialLambert = new THREE.MeshLambertMaterial( { color: 0x00008b });
        //this.materialPhong = new THREE.MeshPhongMaterial( { color: 0x00008b });

        this.portrait = new THREE.Object3D();

        this.createPortrait(x,y,z);

    }

    createPortrait(x,y,z) {

        var background, square, circle, frame, xSquare, ySquare, xCircle, yCircle;
        var squareSides = 2, radius = (squareSides*squareSides)/8, rows = 20, columns = 14, 
            distanceX = Math.cos(Math.PI/4)*(2*radius), distanceY = Math.sin(Math.PI/4)*(2*radius),
            width = distanceX + 2*(distanceX - radius) + (rows)*(squareSides + distanceX), 
            height = distanceY + 2*(distanceY - radius) + (columns)*(squareSides + distanceY);
        
        /* Generate Squares */
        background = new THREE.Mesh(new THREE.PlaneGeometry(width, height), this.materialBackground);
        background.position.set(x,y,z);
        this.portrait.add(background);
        xSquare = x - width/2 + squareSides/2 + distanceX + (distanceX - radius);
        for(var i = 0; i < rows; i++) {
            ySquare = y - height/2 + squareSides/2 + distanceY + (distanceY - radius);
            for(var j = 0; j < columns; j++) {
                square = new THREE.Mesh(new THREE.PlaneGeometry(squareSides,squareSides), this.materialSquare);
                square.position.set(xSquare, ySquare, z);
                this.portrait.add(square);
                ySquare+=squareSides + distanceY;
            }
            xSquare+=squareSides + distanceX;
        }
        
        /* Generate Circles */
        xCircle = x - width/2 + distanceX/2 + (distanceX - radius);
        for(var i = 0; i < rows + 1; i++) {
            yCircle = y - height/2 + distanceY/2 + (distanceY - radius);
            for(var j = 0; j < columns + 1; j++) {
                circle = new THREE.Mesh(new THREE.CircleGeometry(radius, 32), this.materialCircle);
                circle.position.set(xCircle, yCircle, z);
                this.portrait.add(circle);
                yCircle+=squareSides + distanceY;
            }
            xCircle+=squareSides + distanceX;
        }
        
        frame = new THREE.Mesh(new THREE.BoxGeometry(width+distanceX*4, height+distanceY*4, 1), this.materialFrame)
        frame.position.set(x, y, z-1);
        this.portrait.add(frame);

        this.add(this.portrait);
    }

}