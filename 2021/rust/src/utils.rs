use std::fs;

pub fn file_to_vec_i32(path: &str) -> Vec<i32> {
    let data = fs::read_to_string(path).expect("Unable to read file");

    let lines: Vec<i32> = data
        .lines()
        .map(|s| s.parse().unwrap())
        .collect();

    return lines;
}
