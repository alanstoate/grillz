function Draw(sc, st) {
    var scene = sc;
    var structure = st;
    var draw = new function() {
        this.redraw = function(){
            while(scene.children.length > 3){ 
                var l = scene.children.length;
                scene.remove(scene.children[l - 1]); 
            }

            for(var i = 0; i < structure.nodes.length; i++) {
                var x = structure.nodes[i].x;
                var y = structure.nodes[i].y;
                var z = structure.nodes[i].z; 
                // create a cube
                var cubeGeometry = new THREE.BoxGeometry(4,4,4);
                var cubeMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00});
                var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

                cube.castShadow = true;
                cube.position.x = x;
                cube.position.y = y;
                cube.position.z = z;
                scene.add(cube);
            }

            for(var i = 0; i < structure.elements.length; i++) {
                var n1 = structure.elements[i].n1;
                var n2 = structure.elements[i].n2;

                var material = new THREE.LineBasicMaterial({
                    color: 0x0000ff
                }); var geometry = new THREE.Geometry();
                geometry.vertices.push(
                    new THREE.Vector3(n1.x, n1.y, n1.z),
                    new THREE.Vector3(n2.x, n2.y, n2.z),
                );

                var line = new THREE.Line( geometry, material );
                scene.add( line );
            }
        }
    }

    return draw;
}
