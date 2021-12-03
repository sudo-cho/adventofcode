use std::fs;

pub fn run () {
    let data = fs::read_to_string("./src/02/input.txt").expect("Unable to read file");

    // let (pos, depth) =
    //     data
    //     .lines()
    //     .fold((0, 0), |(x, d), m| {
    //         let c_d = m.split_once(" ").expect("Can't split string");
    //         match (c_d.0, c_d.1.parse::<i32>().unwrap()) {
    //             ("forward", v) => (x + v, d),
    //             ("down", v) => (x, d + v),
    //             ("up", v) => (x, d - v),
    //             _ => panic!("not matching")
    //         }
    //     });

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


    // println!("Part1: {}", pos * depth);
    println!("Part2: {}", pos * depth);
}
