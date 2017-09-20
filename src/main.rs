#![feature(plugin)]
#![plugin(rocket_codegen)]
extern crate rocket;

#[macro_use]
extern crate serde_derive;

pub mod parser;
use parser::run_calculation;

use rocket::response::{NamedFile, content};

#[get("/js/lib/three.js")]
fn js_grill() -> content::Html<NamedFile> {
    let file = NamedFile::open("js/lib/three.js");
    content::Html(file.unwrap())
}

#[get("/js/draw.js")]
fn js_draw() -> content::Html<NamedFile> {
    let file = NamedFile::open("js/draw.js");
    content::Html(file.unwrap())
}

#[get("/js/dat_controller.js")]
fn js_dat_controller() -> content::Html<NamedFile> {
    let file = NamedFile::open("js/dat_controller.js");
    content::Html(file.unwrap())
}

#[get("/js/lib/dat.gui.js")]
fn js_dat_gui() -> content::Html<NamedFile> {
    let file = NamedFile::open("js/lib/dat.gui.js");
    content::Html(file.unwrap())
}

#[get("/js/lib/OrbitControls.js")]
fn js_orbit() -> content::Html<NamedFile> {
    let file = NamedFile::open("js/lib/OrbitControls.js");
    content::Html(file.unwrap())
}

#[get("/js/structure.js")]
fn js_structure() -> content::Html<NamedFile> {
    let file = NamedFile::open("js/structure.js");
    content::Html(file.unwrap())
}

#[get("/calculate?<n>")]
fn calculate(n: &str) -> String {
    run_calculation(str::replace(n, "%22", "\""))
}

#[get("/")]
fn index() -> content::Html<NamedFile> {
    let file = NamedFile::open("html/index.html");
    content::Html(file.unwrap())
}

fn main() {
    rocket::ignite()
        .mount("/", routes![index])
        .mount("/", routes![js_grill])
        .mount("/", routes![js_draw])
        .mount("/", routes![js_dat_controller])
        .mount("/", routes![js_dat_gui])
        .mount("/", routes![js_orbit])
        .mount("/", routes![js_structure])
        .mount("/", routes![calculate])
        .launch();
}
