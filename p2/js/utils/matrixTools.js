/* Rotations and Scaling
m.set( x, y, z, 0,
       x, y, z, 0,
       x, y, z, 0,
       0, 0, 0, 1);
*/

/* Translations
m.set(1, 0, 0, x,
      0, 1, 0, y,
      0, 0, 1, z,
      0, 0, 0, 1)
*/

function makeTranslation(x, y, z) {

    var m = new THREE.Matrix4();

    m.set(1, 0, 0, x,
          0, 1, 0, y,
          0, 0, 1, z,
          0, 0, 0, 1)

    return m;
}

function makeScale(s) {
    var m = new THREE.Matrix4();

    m.set(s, 0, 0, 0,
          0, s, 0, 0,
          0, 0, s, 0,
          0, 0, 0, 1)

    return m;
}

function rotateInX(angle) {

    var m = new THREE.Matrix4();

    m.set( 1, 0, 0, 0,
           0, Math.cos(angle), -Math.sin(angle), 0,
           0, Math.sin(angle), Math.cos(angle), 0,
           0, 0, 0, 1);

    return m;
}

function rotateInY(angle) {

    var m = new THREE.Matrix4();

    m.set( Math.cos(angle), 0, Math.sin(angle), 0,
           0, 1, 0, 0,
           -Math.sin(angle), 0, Math.cos(angle), 0,
           0, 0, 0, 1);

    return m;
}


function rotateInZ(angle) {

    var m = new THREE.Matrix4();

    m.set( Math.cos(angle), -Math.sin(angle), 0, 0,
           Math.sin(angle), Math.cos(angle), 0, 0,
           0, 0, 1, 0,
           0, 0, 0, 1);

    return m;
}