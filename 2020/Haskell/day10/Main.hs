import Data.List

main :: IO ()
main = do
  input <- sort . map readInt . lines <$> readFile "input"
  print $ part1 input
  print $ part2 input [(0, 1)]

readInt :: String -> Int
readInt = read

part1 :: [Int] -> Int
part1 = result . getJolt . prependMyAdapter

prependMyAdapter :: [Int] -> [Int]
prependMyAdapter x = 0 : (maximum x) + 3 : x

getJolt :: [Int] -> [Int]
getJolt xs = zipWith (-) (tail xs) xs

result :: [Int] -> Int
result xs = ones * threes
  where
    ones = length $ filter (\x -> x == 1) xs
    threes = length $ filter (\x -> x == 3) xs

-- You don't need tribonacci or smthg if you can memoize
-- the results of the recursion
part2 :: [Int] -> [(Int, Int)] -> Int
part2 (x:xs) memo =
  case xs of
    [] -> i
    _  -> part2 xs ((x, i):memo)
  where
    i = sum . map snd $ takeWhile (\(y, _) -> x - y <= 3) memo
