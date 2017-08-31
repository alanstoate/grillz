function DatController(g, st, d) {
    var gui = g;
    var structure = st;
    var draw = d;

    var controls = new function() {
        // Nodes
        function resetNodes(t) {
            t.x = '0';
            t.y = '0';
        }
        resetNodes(this);

        this.addNode = function() {
            if(isNaN(this.x) || isNaN(this.y))
                alert("enter a valid number");
            else {
                structure.addNode(this.x, this.y);
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
            updateLoadGUI();
        }

        // Loads
        function resetLoads(t) {
            t.element = '';
            t.type = '';
            t.magnitude = '';
        }
        resetLoads(this);

        this.addLoad = function() {
            structure.addLoad(this.element, this.type, this.magnitude);
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
    f1.add(controls, 'x').listen();
    f1.add(controls, 'y').listen();
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
    f3.add(controls, 'type', ['UDL', 'Point']).listen();
    f3.add(controls, 'magnitude').listen();
    elist = f3.add(controls, 'element', structure.getElementArray()).listen();

    function updateLoadGUI() {
        f3.remove(elist);
        elist = f3.add(controls, 'element', structure.getElementArray()).listen();
    }

    gui.add(controls, 'clear');
}
