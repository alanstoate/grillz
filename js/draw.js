function Draw(sc, st) {
    var scene = sc;
    var structure = st;

    var draw = new function() {
        this.settings = {
            drawLoads: true 
        }

        this.redraw = function(){
            while(scene.children.length > 2){ 
                var l = scene.children.length;
                scene.remove(scene.children[l - 1]); 
            }

            // Draw all nodes
            for(var i = 0; i < structure.nodes.length; i++) {
                drawNode(structure.nodes[i]); 
            }

            for(var i = 0; i < structure.elements.length; i++) {
                drawElement(structure.elements[i].n1, structure.elements[i].n2);
            }

            if (this.settings.drawLoads == true) {
                for(var i = 0; i < structure.loads.length; i++) {
                    drawLoads(structure.loads[i]);
                }
            }
        }
    }

    function drawNode(n) {
        var geometry = new THREE.SphereGeometry(2,20,20);
        if(n.fixed == true) 
            var material = new THREE.MeshLambertMaterial({color: 0x00ff00});
        else
            var material = new THREE.MeshLambertMaterial({color: 0xff0000});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.x = n.x;
        mesh.position.y = n.y;
        scene.add(mesh);
    }

    function drawElement(n1, n2) {
        var x1 = structure.nodes[n1].x;
        var y1 = structure.nodes[n1].y;

        var x2 = structure.nodes[n2].x;
        var y2 = structure.nodes[n2].y;

        var length = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));

        var geometry = new THREE.BoxGeometry(length,1,1);
        var material = new THREE.MeshLambertMaterial({color: 0x0000ff});
        var mesh = new THREE.Mesh(geometry, material);

        scene.add(mesh);

        var rotz = Math.atan((y2 - y1) / (x2 - x1));

        mesh.position.x = (x1 + x2) / 2;
        mesh.position.y = (y1 + y2) / 2;

        mesh.rotation.z = rotz;
    }

    function drawLoads(l) {
        var load = l.magnitude;
        var e = structure.elements[l.element];

        var n1 = e.n1;
        var n2 = e.n2;

        var x1 = structure.nodes[n1].x;
        var y1 = structure.nodes[n1].y;

        var x2 = structure.nodes[n2].x;
        var y2 = structure.nodes[n2].y;

        var length = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));

        var dx = x2 - x1;
        var dy = y2 - y1;

        for(var i = 0; i < 11; i++) {
            var x = x1 + (dx) * (i / 10);
            var y = y1 + (dy) * (i / 10);

            var material = new THREE.LineBasicMaterial({ color: 0xff0000 });
            var geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(x,y,0.1));
            geometry.vertices.push(new THREE.Vector3(x,y,load));
            var line = new THREE.Line(geometry, material);
            scene.add(line);
        }
    }

    return draw;
}
