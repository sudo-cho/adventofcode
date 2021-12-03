#[path = "../utils.rs"]
mod utils;

fn result(l: &[i32], skip: usize) -> usize {
    l.iter()
     .zip(l.iter().skip(skip))
     .filter(|(a, b)| b > a)
     .count()
}

pub fn run () {
    let lines = utils::file_to_vec_i32("./src/01/input.txt");

    println!("Part 1: {:#?}", result(&lines, 1));
    println!("Part 2: {:#?}", result(&lines, 3));
}
