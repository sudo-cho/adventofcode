main :: IO ()
main = do
  input <- map (read :: String -> Int) . lines <$> readFile "input.txt"
  print $ result input 1

result :: Ord a => [a] -> Int -> Int
result xs n = length . filter (uncurry (<)) . zip xs . drop n $ xs
