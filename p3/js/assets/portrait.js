'use strict'

class Portrait extends THREE.Object3D {
    constructor(x, y, z) {
        super();

        this.materialBackgroundBasic = new THREE.MeshBasicMaterial( { color: 0x808080 } );
        this.materialSquareBasic = new THREE.MeshBasicMaterial( { color: 0x000000 } );
        this.materialCircleBasic = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        this.materialFrameBasic = new THREE.MeshBasicMaterial( { color: 0xdaa520 } );

        this.materialBackgroundLambert = new THREE.MeshLambertMaterial( { color: 0x808080 } );
        this.materialSquareLambert = new THREE.MeshLambertMaterial( { color: 0x000000 } );
        this.materialCircleLambert = new THREE.MeshLambertMaterial( { color: 0xffffff } );
        this.materialFrameLambert = new THREE.MeshLambertMaterial( { color: 0xdaa520 } );

        this.materialBackgroundPhong = new THREE.MeshPhongMaterial( { color: 0x808080 } );
        this.materialSquarePhong = new THREE.MeshPhongMaterial( { color: 0x000000 } );
        this.materialCirclePhong = new THREE.MeshPhongMaterial( { color: 0xffffff } );
        this.materialFramePhong = new THREE.MeshPhongMaterial( { color: 0xdaa520 } );

        this.portrait = new THREE.Object3D();

        this.numSquares = 0;
        this.numCircles = 0;

        this.createPortrait(x,y,z);

    }

    createPortrait(x,y,z) {

        var background, square, circle, frame, xSquare, ySquare, xCircle, yCircle;
        var squareSides = 2, radius = (squareSides*squareSides)/8, rows = 20, columns = 14, 
            distanceX = Math.cos(Math.PI/4)*(2*radius), distanceY = Math.sin(Math.PI/4)*(2*radius),
            width = distanceX + 2*(distanceX - radius) + (rows)*(squareSides + distanceX), 
            height = distanceY + 2*(distanceY - radius) + (columns)*(squareSides + distanceY);
        
        /* Generate Squares */
        background = new THREE.Mesh(new THREE.BoxGeometry(width, height, 1), this.materialBackgroundLambert);
        background.position.set(x,y,z);
        this.portrait.add(background);
        xSquare = x - width/2 + squareSides/2 + distanceX + (distanceX - radius);
        for(var i = 0; i < rows; i++) {
            ySquare = y - height/2 + squareSides/2 + distanceY + (distanceY - radius);
            for(var j = 0; j < columns; j++) {
                square = new THREE.Mesh(new THREE.BoxGeometry(squareSides, squareSides, squareSides), this.materialSquareLambert);
                square.position.set(xSquare, ySquare, z + squareSides);
                this.portrait.add(square);
                this.numSquares++;
                ySquare+=squareSides + distanceY;
            }
            xSquare+=squareSides + distanceX;
        }
        
        /* Generate Circles */
        xCircle = x - width/2 + distanceX/2 + (distanceX - radius);
        for(var i = 0; i < rows + 1; i++) {
            yCircle = y - height/2 + distanceY/2 + (distanceY - radius);
            for(var j = 0; j < columns + 1; j++) {
                circle = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, squareSides, 16), this.materialCircleLambert);
                circle.position.set(xCircle, yCircle, z + squareSides);
                circle.rotation.x = Math.PI/2
                this.portrait.add(circle);
                this.numCircles++;
                yCircle+=squareSides + distanceY;
            }
            xCircle+=squareSides + distanceX;
        }
        
        frame = new THREE.Mesh(new THREE.BoxGeometry(width+distanceX*4, height+distanceY*4, 1), this.materialFrameLambert)
        frame.position.set(x, y, z-1);
        this.portrait.add(frame);

        this.add(this.portrait);
    }

    alternateMaterials(usingLambert) {
        var i, limit;
        if(usingLambert) {
            i = 0;
            this.portrait.children[i++].material = this.materialBackgroundPhong;
            limit = this.numSquares + 1
            while(i < limit) {
                this.portrait.children[i++].material = this.materialSquarePhong;
            }
            limit = this.numSquares + this.numCircles + 1
            while(i < limit) {
                this.portrait.children[i++].material = this.materialCirclePhong;
            }
            this.portrait.children[i].material = this.materialFramePhong;
        }
        else {
            i = 0;
            this.portrait.children[i++].material = this.materialBackgroundLambert;
            limit = this.numSquares + 1
            while(i < limit) {
                this.portrait.children[i++].material = this.materialSquareLambert;
            }
            limit = this.numSquares + this.numCircles + 1
            while(i < limit) {
                this.portrait.children[i++].material = this.materialCircleLambert;
            }
            this.portrait.children[i].material = this.materialFrameLambert;
        }

    }

    toggleIluminationCalculation(calculateIlumination, usingLambert) {
        var i, limit;
        if(calculateIlumination) {
            i = 0;
            this.portrait.children[i++].material = this.materialBackgroundBasic;
            limit = this.numSquares + 1
            while(i < limit) {
                this.portrait.children[i++].material = this.materialSquareBasic;
            }
            limit = this.numSquares + this.numCircles + 1
            while(i < limit) {
                this.portrait.children[i++].material = this.materialCircleBasic;
            }
            this.portrait.children[i].material = this.materialFrameBasic;
        }
        else {
            if(usingLambert) {
                i = 0;
                this.portrait.children[i++].material = this.materialBackgroundLambert;
                limit = this.numSquares + 1
                while(i < limit) {
                    this.portrait.children[i++].material = this.materialSquareLambert;
                }
                limit = this.numSquares + this.numCircles + 1
                while(i < limit) {
                    this.portrait.children[i++].material = this.materialCircleLambert;
                }
                this.portrait.children[i].material = this.materialFrameLambert;

            }
            else {
                i = 0;
                this.portrait.children[i++].material = this.materialBackgroundPhong;
                limit = this.numSquares + 1
                while(i < limit) {
                    this.portrait.children[i++].material = this.materialSquarePhong;
                }
                limit = this.numSquares + this.numCircles + 1
                while(i < limit) {
                    this.portrait.children[i++].material = this.materialCirclePhong;
                }
                this.portrait.children[i].material = this.materialFramePhong;
            }            
        }
    }

}