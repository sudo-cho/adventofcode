import Data.Char ( digitToInt )

main :: IO ()
main = do
  input <- lines <$> readFile "input.txt"
  print $ part2 input

part1 :: [[Char]] -> Int
part1 i = (\(x, y) -> toDec x * toDec y ) $ (\x -> (x, invertBinary x)) $ mapToBinary $ sumOfLines $ i

sumOfLines :: [[Char]] -> [Int]
sumOfLines =
  foldl (\a x -> zipWith (+) a (map digitToInt x)) (replicate 12 0)

-- Initial length is 1000.
-- I could pass it from length input but got lazy here.
mapToBinary :: [Int] -> [Char]
mapToBinary =
  map (\x -> if (x * 2) >= 1000 then '1' else '0')

invertBinary :: [Char] -> [Char]
invertBinary =
  map (\c -> if c == '1' then '0' else '1')

toDec :: [Char] -> Int
toDec = foldl (\a x -> a * 2 + digitToInt x) 0

-- Taken from : https://github.com/Maeevick/adventofcode2021/blob/main/src/D3.hs
-- Which is very similar from my part 1, got lazy with part 2
-- Using where to determine final answer is way more elegant than making
-- tuples to do the final answer.
part2 :: [String] -> Int
part2 [] = 0
part2 l  = toDec oxygen * toDec carbon
 where
  initialLength = length l
  oxygen        = rate (>=) 0 l
  carbon        = rate (<) 0 l
  rate _  _ [x] = x
  rate op i xs  = rate  op (i + 1) (filter (\x -> x !! i == criteria op initialLength xs !! i) xs)

criteria :: (Int -> Int -> Bool) -> Int -> [String] -> [Char]
criteria op c l = map (\x -> if op (x * 2) (length l) then '1' else '0') (compute c l)

compute :: Int -> [String] -> [Int]
compute c = foldl (\a x -> zipWith (+) a (map digitToInt x)) (replicate c 0)
