function DatController(g, st, d, calcCall) {
    var gui = g;
    var structure = st;
    var draw = d;

    // Components controls --------------------------------------------------------------------
    {
        var components_controls = new function() {
            // Nodes ----------------------------------------
            function resetNodes(t) {
                t.x = '0';
                t.y = '0';
                t.fixed = false;
            }
            resetNodes(this);

            this.addNode = function() {
                if(isNaN(this.x) || isNaN(this.y))
                    alert("enter a valid number");
                else {
                    structure.addNode(this.x, this.y, this.fixed);
                    resetNodes(this);
                    d.redraw();
                    updateElementGUI();
                }
            }

            // Elements---------------------------------------- 
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

            // Loads----------------------------------------
            function resetLoads(t) {
                t.element = '';
                t.type = '';
                t.magnitude = '';
                t.position = '';
            }
            resetLoads(this);

            this.addLoad = function() {
                structure.addLoad(this.element, this.type, this.magnitude, this.position);
                resetLoads(this);
                d.redraw();
            }
            // Clear ----------------------------------------
            this.clear = function () {
                structure.reset();
                draw.redraw();
            }
        }

        // Nodes
        var components_group = gui.addFolder('Add Components');
        components_group.open();
        var f1 = components_group.addFolder('Add Node');
        f1.add(components_controls, 'x').listen();
        f1.add(components_controls, 'y').listen();
        f1.add(components_controls, 'fixed', [true,false]).listen();
        f1.add(components_controls, 'addNode');

        // Elements
        var f2 = components_group.addFolder('Add Element');
        n1list = f2.add(components_controls, 'n1', structure.getNodeArray()).listen();
        n2list = f2.add(components_controls, 'n2', structure.getNodeArray()).listen();
        f2.add(components_controls, 'addElement');

        function updateElementGUI() {
            f2.remove(n1list);
            f2.remove(n2list);
            n1list = f2.add(components_controls, 'n1', structure.getNodeArray()).listen();
            n2list = f2.add(components_controls, 'n2', structure.getNodeArray()).listen();
        }

        // Loads
        var f3 = components_group.addFolder('Add Load');
        f3.add(components_controls, 'addLoad');
        f3.add(components_controls, 'type', ['UDL', 'Point']).listen();
        f3.add(components_controls, 'magnitude').listen();
        f3.add(components_controls, 'position').listen();
        elist = f3.add(components_controls, 'element', structure.getElementArray()).listen();

        function updateLoadGUI() {
            f3.remove(elist);
            elist = f3.add(components_controls, 'element', structure.getElementArray()).listen();
        }

        components_group.add(components_controls, 'clear');
    }

    // Settings controls --------------------------------------------------------------------
    {
        // Controls
        var settings_controls = new function() {
            this.showLoads = false; 
            this.calculate = function () {
                calcCall();
            }
        }

        // Add buttons to gui
        var settings_group = gui.addFolder('Settings');
        settings_group.open();
        show = settings_group.add(settings_controls, 'showLoads', false);
        settings_group.add(settings_controls, 'calculate');

        // Event listeners
        show.onChange(function(value) {
            draw.settings.drawLoads = value;
            draw.redraw();
        });
    }
}
