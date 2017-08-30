function DatController(g, st, d) {
    var gui = g;
    var structure = st;
    var draw = d;

    var controls = new function() {
        // Nodes
        function resetNodes(t) {
            t.x = '0';
            t.y = '0';
            t.z = '0';
        }
        resetNodes(this);

        this.addNode = function() {
            if(isNaN(this.x) || isNaN(this.y) || isNaN(this.z))
                alert("enter a valid number");
            else {
                structure.addNode(this.x, this.y, this.z);
                resetNodes(this);
                d.redraw();
                updateElementGUI();
            }
        }

        // Elements 
        function resetElements(t) {
            t.n1 = '0';
            t.n2 = '0';
        }
        resetElements(this);

        this.addElement = function() {
            structure.addElement(this.n1, this.n2);
            resetElements(this);
            d.redraw();
        }

        // Loads
        function resetLoads(t) {
            t.element = '';
            t.magnitude = '';
            t.type = '';
        }
        resetLoads(this);

        this.addLoad = function() {
            structure.addLoad(this.element, this.magnitude, this.type);
            resetLoads(this);
            d.redraw();
        }

        this.clear = function () {
            structure.reset();
            draw.redraw();
        }
    }

    // Nodes
    var f1 = gui.addFolder('Add Node');
    f1.add(controls, 'x', 0, 10).listen();
    f1.add(controls, 'y', 0, 10).listen();
    f1.add(controls, 'z', 0, 10).listen();
    f1.add(controls, 'addNode');

    // Elements
    var f2 = gui.addFolder('Add Element');
    n1list = f2.add(controls, 'n1', structure.getNodeArray()).listen();
    n2list = f2.add(controls, 'n2', structure.getNodeArray()).listen();
    f2.add(controls, 'addElement');

    function updateElementGUI() {
        f2.remove(n1list);
        f2.remove(n2list);
        n1list = f2.add(controls, 'n1', structure.getNodeArray()).listen();
        n2list = f2.add(controls, 'n2', structure.getNodeArray()).listen();
    }

    // Loads
    var f3 = gui.addFolder('Add Load');
    f3.add(controls, 'addLoad');
    // TODO Change to element array
    elist = f3.add(controls, 'element', structure.getNodeArray()).listen();

    gui.add(controls, 'clear');


}
