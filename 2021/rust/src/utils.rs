pub fn file_to_vec_i32(path: &str) -> Vec<i32> {
    let data = f_to_string(path);

    let lines: Vec<i32> = data
        .lines()
        .map(|s| s.parse().unwrap())
        .collect();

    return lines;
}

pub fn f_to_string(path: &str) -> String {
    std::fs::read_to_string(path).expect("unable to read file")
}
