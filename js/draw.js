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
                drawNode(x,y,z);
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

    function drawNode(x,y,z,s) {
        // create a cube
        var geometry = new THREE.SphereGeometry(2,20,20);
        var material = new THREE.MeshLambertMaterial({color: 0x00ff00});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        scene.add(mesh);
    }
    return draw;
}
