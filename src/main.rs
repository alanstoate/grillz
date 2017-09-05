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

fn main() {
    let n1 = Node{ x: 10, y:0 };
    let n2 = Node{ x: 10, y:10 };

    let e1 = Element{ n1: 0, n2: 1};

    let l = Load{element: 0, loadtype: "UDL".to_string(), magnitude: 15};
    let s = Structure{nodes: vec![n1,n2], elements: vec! [e1], loads: vec![l]};

    let serialized = serde_json::to_string(&s).unwrap();
    println!("serialized = {}", serialized);
}
