extern crate serde_json;
extern crate GrillRust;

use self::GrillRust::element_properties::*;
use self::GrillRust::structure::*;
use self::GrillRust::element::*;

#[derive(Serialize, Deserialize)]
struct NodeSerial {
    pub x: f64,
    pub y: f64,
    pub fixed: bool,
}

#[derive(Serialize, Deserialize)]
struct ElementSerial {
    pub n1: usize,
    pub n2: usize,
}

#[derive(Serialize, Deserialize)]
struct LoadSerial {
    pub element: usize,
    pub loadtype: String,
    pub magnitude: f64,
}


#[derive(Serialize, Deserialize)]
struct StructureSerial {
    pub nodes: Vec<NodeSerial>,
    pub elements: Vec<ElementSerial>,
    pub loads: Vec<LoadSerial>,
}

pub fn run_calculation(input: String) -> String {
    let props = ElementProperties::new(200E+6, 2.133E-6, 80E+6, 2.03E-6);
    let structure_serial: StructureSerial = serde_json::from_str(&input).unwrap();
    let mut structure = Structure::new();

    for n in &structure_serial.nodes {
        structure.add_node((n.x, n.y), n.fixed);
    }

    for e in &structure_serial.elements {
        structure.add_element(e.n1, e.n2, props);
    }

    for l in &structure_serial.loads {
        structure.add_element_load(l.element, l.magnitude, 0.1, LoadType::UDL);
    }

    structure.run_calc();

    let disp = structure.displacements.into_vec();

    serde_json::to_string(&disp).unwrap()
}
