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

        this.addNode = function(_x, _y, _fixed) {
            this.nodes.push( {
                x: parseFloat(_x),
                y: parseFloat(_y),
                fixed: (_fixed === 'true')
            });
        }

        this.addNodeDisplacements = function(disps) {
            for (var i = 0; i < this.nodes.length; ++i) {
                this.nodes[i].displacement = {
                    rotX:       disps[i*3 + 0],
                    rotY:       disps[i*3 + 1],
                    transZ:     disps[i*3 + 2]
                }
            }
        }

        this.addElement = function(_n1, _n2) {
            this.elements.push( {
                n1: parseInt(_n1),
                n2: parseInt(_n2)
            });
        }

        this.addLoad = function(_element, _loadType, _mag, _pos) {
            this.loads.push({
                element: parseInt(_element),
                loadtype: _loadType,
                magnitude: parseFloat(_mag),
                position: parseFloat(_pos)
            });
        }

        this.reset = function() {
            this.nodes.length = 0;
            this.elements.length = 0;
            this.loads.length = 0;
        }

        // Error Checkers

        // Returns true if n1 and n2 dont already define an element
        this.checkForDuplicateElement = function(n1, n2) {
            var noDuplicated = true;
            this.elements.forEach(function (x) {
                if ((n1 == x.n1 && n2 == x.n2) || (n1 == x.n2 && n2 == x.n1))
                    noDuplicated = false;
            })
        return noDuplicated;
        }
    }

    return structure;
}
