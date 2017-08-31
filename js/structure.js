function Structure() {
    var structure = new function () {
        // Data members
        this.nodes = [];
        this.elements = [];
        this.loads = [];

        // Returns string array of node numbers
        this.getNodeArray = function() {
            var arr = [];
            for(var i = 0; i < this.nodes.length; i++) {
                arr.push(i);
            }
            return arr;
        }

        // Returns string array of element numbers
        this.getElementArray = function() {
            var arr = [];
            for(var i = 0; i < this.elements.length; i++) {
                arr.push(i);
            }
            return arr;
        }

        this.addNode = function(_x, _y) {
            this.nodes.push( {
                x: parseFloat(_x),
                y: parseFloat(_y)
            });
        }

        this.addElement = function(_n1, _n2) {
            this.elements.push( {
                n1: this.nodes[_n1],
                n2: this.nodes[_n2]
            });
        }

        this.addLoad = function(_element, _loadType, _mag) {
            this.loads.push({
                element: _element,
                loadtype: _loadType,
                magnitude: _mag
            });
        }

        this.reset = function() {
            this.nodes.length = 0;
            this.elements.length = 0;
            this.loads.length = 0;
        }
    }

    return structure;
}
