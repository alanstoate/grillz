function Draw(sc) {
    var scene = sc;
    var draw = new function() {
        this.redraw = function(){
            var cubeGeometry = new THREE.BoxGeometry(4,4,4);
            var cubeMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00});
            var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

            cube.position.x = 0;
            cube.position.y = 0;
            cube.position.z = 0;
            scene.add(cube);
        }
    }

    return draw;
}
