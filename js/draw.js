function Draw(scene, structure) {
    var draw = new function() {

        // Public variables
        this.settings = {
            drawLoads: true, 
            drawDisps: true
        }

        // Public Functions
        this.redraw = function(){
            scene.remove(group);
            group = new THREE.Group();
            scene.add(group);

            // Draw all nodes
            structure.nodes.forEach(drawNode);

            structure.elements.forEach(drawElement);

            if (this.settings.drawLoads == true) {
                structure.loads.forEach(drawLoads);
            }

            if (this.settings.drawDisps == true) {
                structure.nodes.forEach(drawDisps);
            }
        }

        // Internals
        var group = new THREE.Group();
        scene.add(group);

        var addToGroup = function (object) {
            group.add(object);
        }

        var drawNode = function (n) {
            var geometry = new THREE.SphereGeometry(1,20,20);
            var color = n.fixed == true ? 0x00ff00 : 0xff0000;

            var material = new THREE.MeshLambertMaterial({color: color});
            var mesh = new THREE.Mesh(geometry, material);

            mesh.position.x = n.x;
            mesh.position.y = n.y;

            addToGroup(mesh);
        }

        var drawElement = function (e) {
            var n1 = e.n1;
            var n2 = e.n2;

            var x1 = structure.nodes[n1].x;
            var y1 = structure.nodes[n1].y;

            var x2 = structure.nodes[n2].x;
            var y2 = structure.nodes[n2].y;

            var length = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));

            var geometry = new THREE.BoxGeometry(length,1,1);
            var material = new THREE.MeshLambertMaterial({color: 0x0000ff});
            var mesh = new THREE.Mesh(geometry, material);

            addToGroup(mesh);

            var rotz = Math.atan((y2 - y1) / (x2 - x1));

            mesh.position.x = (x1 + x2) / 2;
            mesh.position.y = (y1 + y2) / 2;

            mesh.rotation.z = rotz;
        }

        var drawLine = function (x1, y1, z1, x2, y2, z2, color) {
            var material = new THREE.LineBasicMaterial({ color: color });
            var geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(x1,y1,z1));
            geometry.vertices.push(new THREE.Vector3(x2,y2,z2));
            var line = new THREE.Line(geometry, material);
            addToGroup(line);
        }

        var drawLoads = function (l) {
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


            if(l.loadtype == 'UDL') {
                for(var i = 0; i < 11; i++) {
                    var x = x1 + (dx) * (i / 10);
                    var y = y1 + (dy) * (i / 10);

                    drawLine(x,y,0.1,x,y,load, 0xff0000);

                }
            }
            else if(l.loadtype == 'Point') {
                var x = x1 + dx * l.position / length;
                var y = y1 + dy * l.position / length;

                drawLine(x,y,0.1,x,y,load,0x009999);
            }
        }

        var drawDisps = function (node) {
            if(node.displacement != null) {
                var x = node.x;              
                var y = node.y;              

                var rotX = node.displacement.rotX;
                var rotY = node.displacement.rotY;
                var transZ = node.displacement.transZ;

                drawLine(x, y, 0, -rotX, y,    0,      0x000099);
                drawLine(x, y, 0, x,     y,    0,      0x009900);
                drawLine(x, y, 0, x,     y,    -transZ,0x009900);
            }
        }
    }

    return draw;
}
