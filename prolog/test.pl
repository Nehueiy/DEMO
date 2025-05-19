likes(john, pizza).
likes(mary, sushi).

friend(X, Y) :- likes(X, Z), likes(Y, Z).