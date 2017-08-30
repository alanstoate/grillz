function Structure() {
    var structure = new function () {
        this.nodes = [];
        this.elements = [];
        this.loads = [];

        this.getNodeArray = function() {
            var arr = [];
            for(var i = 0; i < this.nodes.length; i++) {
                arr.push(i);
            }
            return arr;
        }

        this.addNode = function(_x, _y, _z) {
            this.nodes.push( {
                x: _x,
                y: _y,
                z: _z
            });
        }

        this.addElement = function(_n1, _n2) {
            this.elements.push( {
                n1: this.nodes[_n1],
                n2: this.nodes[_n2]
            });
        }

        this.addLoad = function(_element, _loadType, _pos, _magnitude) {

        }
    }

    return structure;
}
