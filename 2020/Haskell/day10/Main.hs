import Data.List

main :: IO ()
main = do
  contents <- readFile "input"
  print . part1 . map readInt . lines $ contents

readInt :: String -> Int
readInt = read

part1 :: [Int] -> Int
part1 = result . getJolt . sort . prependMyAdapter

prependMyAdapter :: [Int] -> [Int]
prependMyAdapter x = 0 : (maximum x) + 3 : x

getJolt :: [Int] -> [Int]
getJolt xs = zipWith (-) (tail xs) xs

result :: [Int] -> Int
result xs = ones * threes
  where
    ones = length $ filter (\x -> x == 1) xs
    threes = length $ filter (\x -> x == 3) xs
