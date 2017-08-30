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
                drawNode(structure.nodes[i].x,
                    structure.nodes[i].y,
                    structure.nodes[i].z); 
            }

            for(var i = 0; i < structure.elements.length; i++) {
                drawElement(structure.elements[i].n1, structure.elements[i].n2);
            }
        }
    }

    function drawNode(x,y,z) {
        var geometry = new THREE.SphereGeometry(2,20,20);
        var material = new THREE.MeshLambertMaterial({color: 0x00ff00});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        scene.add(mesh);
    }

    function drawElement(n1, n2) {
        var x1 = n1.x;
        var y1 = n1.y;
        var z1 = n1.z;
        
        var x2 = n2.x;
        var y2 = n2.y;
        var z2 = n2.z;

        var length = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)+(z2-z1)*(z2-z1));

        var geometry = new THREE.BoxGeometry(length,1,1);
        var material = new THREE.MeshLambertMaterial({color: 0x0000ff});
        var mesh = new THREE.Mesh(geometry, material);

        scene.add(mesh);

        var roty = Math.atan((z2 - z1) / (x2 - x1));

        var xzlen = Math.sqrt((x2-x1)*(x2-x1)+(z2-z1)*(z2-z1));
        var rotz  = Math.atan((y2 - y1) / xzlen);

        mesh.position.x = (x1 + x2) / 2;
        mesh.position.y = (y1 + y2) / 2;
        mesh.position.z = (z1 + z2) / 2;

        mesh.rotation.y = -roty;
        mesh.rotation.z = rotz;
    }

    return draw;
}
