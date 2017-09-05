extern crate serde;
extern crate serde_json;

#[macro_use]
extern crate serde_derive;

use serde_json::Error;

#[derive(Serialize, Deserialize)]
struct Node {
    x: u8,
    y: u8,
}

#[derive(Serialize, Deserialize)]
struct Element {
    n1: u8,
    n2: u8,
}

#[derive(Serialize, Deserialize)]
struct Load {
    element: u8,
    loadtype: String,
    magnitude: u8,
}


#[derive(Serialize, Deserialize)]
struct Structure {
    nodes: Vec<Node>,
    elements: Vec<Element>,
    loads: Vec<Load>,
}
