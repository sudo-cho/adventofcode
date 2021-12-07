main :: IO ()
main = do
  input <- lines <$> readFile "input.txt"
  print $ (\(x, y, _) -> x * y) $ result input
    where result xs = foldl dive (0, 0, 0) xs

dive :: (Int, Int, Int) -> [Char] -> (Int, Int, Int)
dive (x, d, a) m = case l of ("forward", v) -> (x + v, d + a * v, a)
                             ("down", v)    -> (x, d, a + v)
                             ("up", v)      -> (x, d, a - v)
                             _              -> error "not matching"
                   where l = let (f : s : _) = words m in (f, read s :: Int)
