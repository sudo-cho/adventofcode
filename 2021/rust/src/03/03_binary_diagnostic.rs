#[path = "../utils.rs"]
mod utils;

const FQ_LEN: usize = 12;

pub fn run () {
    let data = utils::f_to_string("./src/03/input.txt");
    let sum = data
        .lines()
        .fold(vec![0; FQ_LEN], |sum_array, l| {
            let freq: Vec<_> = l
                .chars()
                .map(|c| c.to_digit(10).unwrap())
                .collect();

            let new_freq = freq
                .iter()
                .zip(sum_array.iter())
                .map(|(&a, &b)| a + b)
                .collect();

            return new_freq;
        });

    let len = sum.len() as u32;
    let gamma = sum
        .iter()
        .flat_map(|v| if v > &(len / 2) { 1 } else { 0 })
        .collect();

    // Not compiling for the moment
    println!("{:?}", gamma)
}
