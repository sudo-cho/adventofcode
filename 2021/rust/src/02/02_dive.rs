#[path = "../utils.rs"]
mod utils;

pub fn run () {
    let data = utils::f_to_string("./src/02/input.txt");

    let (pos, depth, _aim) =
        data
        .lines()
        .fold((0, 0, 0), |(x, d, a), m| {
            let c_d = m.split_once(" ").expect("Can't split string");
            match (c_d.0, c_d.1.parse::<i32>().unwrap()) {
                ("forward", v) => (x + v, d + a * v, a),
                ("down", v) => (x, d, a + v),
                ("up", v) => (x, d, a - v),
                _ => panic!("not matching")
            }
        });

    println!("Part2: {}", pos * depth);
}
