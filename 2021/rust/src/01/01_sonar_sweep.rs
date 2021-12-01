use std::fs;

pub fn run () {
    let data = fs::read_to_string("./src/01/input.txt").expect("Unable to read file");

    let lines = data
        .lines()
        .map(|s| s.parse().unwrap())
        .collect::<Vec<i32>>();

    // windows allow to group value by tuple
    let result1 = &lines
        .windows(2)
        .filter(|n| n[0] < n[1])
        .count();

    let result2 = &lines
        .windows(3)
        .map(|w| w.iter().sum())
        // could be refactor as function to remove dup
        .collect::<Vec<i32>>()
        .windows(2)
        .filter(|n| n[0] < n[1])
        .count();

    println!("{:#?}", result1);
    println!("{:#?}", result2);
}
