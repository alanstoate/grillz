function DatController(comp_gui, settings_gui, structure, draw, calcCall) {

//////////////////////////////////////////////////////////////////////////////// 
    // Component Settings Controller
//////////////////////////////////////////////////////////////////////////////// 
    //
    // This sets the functions that will be called when different buttons are
    // pressed
    
    var components_controls = new function() {
        var cont = this;

        function addComponent(func, reset) {
            func();
            reset(cont);
            draw.redraw();
        }

        // Nodes ----------------------------------------
        function resetNodes(t) {
            t.x = '0';
            t.y = '0';
            t.fixed = false;
        }
        resetNodes(this);

        this.addNode = function() {
            var addNodeFunc = function() {
                if(validateFloat(cont.x) && validateFloat(cont.y))
                    structure.addNode(cont.x, cont.y, cont.fixed);
            }

            addComponent(addNodeFunc, resetNodes);
            UpdateElementGUI();
        }

        // Elements---------------------------------------- 
        function resetElements(t) {
            t.n1 = '0';
            t.n2 = '0';
        }
        resetElements(this);

        this.addElement = function() {
            var addElementFunc = function(){
                structure.addElement(cont.n1, cont.n2);
            }

            addComponent(addElementFunc, resetElements, [UpdateLoadGUI]);
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
            var addLoadFunc = function (){
                structure.addLoad(cont.element, cont.type, 
                                  cont.magnitude, cont.position);
            }
            addComponent(addLoadFunc, resetLoads);
        }

        // Clear ----------------------------------------
        this.clear = function () {
            structure.reset();
            draw.redraw();
        }
    }

//////////////////////////////////////////////////////////////////////////////// 
    // Components view
//////////////////////////////////////////////////////////////////////////////// 
    // Add the buttons to the screen. Each component type has it's own subfolder
    //
    // Nodes
    var components_group = comp_gui.addFolder('Add Components');
    components_group.open();
    var f1 = components_group.addFolder('Node');
    addButtonControl(f1, components_controls, 'addNode', "Add");
    addStringControl(f1, components_controls, 'x', 'x');
    addStringControl(f1, components_controls, 'y', 'y');
    addArrayControl(f1, components_controls, 'fixed', 'fixed' ,[true,false]);

    // Elements
    var f2 = components_group.addFolder('Element');

    addButtonControl(f2, components_controls, 'addElement', "Add");
    function addElementLists() {
        n1list = f2.add(components_controls, 'n1', structure.getNodeArray()) 
            .listen();
        n2list = f2.add(components_controls, 'n2', structure.getNodeArray()) 
            .listen();
    }
    addElementLists();


    function UpdateElementGUI() {
        f2.remove(n1list);
        f2.remove(n2list);
        addElementLists();
    }
    UpdateElementGUI();

    // Loads
    var f3 = components_group.addFolder('Load');
    f3.add(components_controls, 'addLoad').name("Add");
    f3.add(components_controls, 'type', ['UDL', 'Point']).listen();
    f3.add(components_controls, 'magnitude').listen();
    f3.add(components_controls, 'position').listen();

    function addLoadList() {
        elist = f3.add(
            components_controls, 
            'element', 
            structure.getElementArray())
            .listen();
    }
    addLoadList();

    function UpdateLoadGUI() {
        f3.remove(elist);
        addLoadList();
    }
    UpdateLoadGUI();

    components_group.add(components_controls, 'clear');

    // Settings controls -------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////
    // Controls
    var settings_controls = new function() {
        var settings = this;
        this.showLoads = true; 
        this.showDisplacements = false;
        this.calculate = function () {
            var addressString = "http://localhost:8000/calculate?";
            addressString += JSON.stringify(structure);

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if(this.readyState == 4 && this.status == 200){
                    structure.addNodeDisplacements(JSON.parse(xhttp.responseText));
                    alert("Calculation Succesful")
                    settings.showLoads = false;
                    draw.settings.drawLoads = false;
                    settings.showDisplacements = true;
                    draw.settings.drawDisps = true;
                    UpdateSettingsGui();
                }
                else{
                }
            }
            xhttp.open("GET", addressString, true);
            xhttp.send();
        }
    }

    // Add buttons to comp_gui
    var settings_group = settings_gui.addFolder('Settings');
    settings_group.open();
    settings_group.add(settings_controls, 'calculate');

    function AddShowButtons() {
        show_loads = 
            settings_group.add(settings_controls,
            'showLoads',
            this.showLoads);
        show_disp = 
            settings_group.add(settings_controls, 
            'showDisplacements', 
            this.showDisplacements);

        // Event listeners
        show_loads.onChange(function(value) {
            draw.settings.drawLoads = value;
            draw.redraw();
        });

        show_disp.onChange(function(v) {
            draw.settings.drawDisps = v;
            draw.redraw();
        })
    }
    AddShowButtons();

    function UpdateSettingsGui() {
        settings_group.remove(show_loads); 
        settings_group.remove(show_disp); 
        AddShowButtons();
        draw.redraw();
    }


    //////////////////////////////////////////////////////////////////////
    // Helper Functions
    //////////////////////////////////////////////////////////////////////

    function validateInput(func, input, error) {
        if(func(input) == false){
            alert(error);
            return false;
        }
        else return true;
    }

    function validateFloat(input) {
        var func = function(_in) {
            return isNaN(_in) ? false : true;
        }
        return validateInput(func, input, "Enter a valid number");
    }

    function addStringControl (folder, controls, control, name) {
        folder.add(controls, control).name(name).listen();
    }

    function addArrayControl (folder, controls, control, name, array) {
        folder.add(controls, control, array).name(name).listen();
    }

    function addButtonControl (folder, controls, control, name) {
        folder.add(controls, control).name(name);
    }

    function addToggleControl (folder, controls, control, name) {
        folder.add(controls, control).name(name);
    }
}
