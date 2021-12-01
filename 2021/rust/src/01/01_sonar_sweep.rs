use std::fs;

fn result(l: &[i32], skip: usize) -> usize {
    l.iter()
     .zip(l.iter().skip(skip))
     .filter(|(a, b)| b > a)
     .count()
}

pub fn run () {
    let data = fs::read_to_string("./src/01/input.txt").expect("Unable to read file");

    let lines: Vec<i32> = data
        .lines()
        .map(|s| s.parse().unwrap())
        .collect();

    println!("Part 1: {:#?}", result(&lines, 1));
    println!("Part 2: {:#?}", result(&lines, 3));
}
