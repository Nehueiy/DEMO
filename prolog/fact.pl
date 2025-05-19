male(albert). 
male(bob).
male(bill).
male(carl).
male(charlie).
male(dan).
male(edward).

female(alice).
female(betsy).
female(diana).

parent(albert, bob).
parent(albert, betsy).
parent(albert, bill).
parent(alice, bob).
parent(alice, betsy).
parent(alice, bill).
parent(bob, carl).
parent(bob, charlie).











father(X, Y):- parent(X, Y), male(X).
mother(X, Y):- parent(X, Y), female(X).
get_grandchild :-
    parent(albert, X),
    parent(X, Y),
    write('Albert grandchild is '),
    write(Y),nl.
















what_grade(5) :-
    write('Go to kindergarten').

what_grade(6) :-
    write('Go to lst Grade').

what_grade(Other) :-
    Grade is Other - 5,
    format('Go to grade ~w',[Grade]).




% Task 1: List Manipulation

% Finding the length of a list
leng([], 0).
leng([_|Tail], N) :-
    leng(Tail, N1),
    N is N1 + 1.

% Summing the elements of a list
sum([], 0).
sum([Head|Tail], Total) :-
    sum(Tail, SumTail),
    Total is Head + SumTail.

% Finding the maximum element in a list
max([X], X).
max([Head|Tail], Max) :-
    max(Tail, MaxTail),
    Max is max(Head, MaxTail).

% Reversing a list
reverse1(List, Reversed) :-
    reverseAcc(List, [], Reversed).
reverseAcc([], Acc, Acc).
reverseAcc([Head|Tail], Acc, Reversed) :-
    reverseAcc(Tail, [Head|Acc], Reversed).

% Task 2: Simple Arithmetic Operations

% Addition
add(X, Y, Result) :- Result is X + Y.

% Subtraction
subtract(X, Y, Result) :- Result is X - Y.

% Multiplication
multiply(X, Y, Result) :- Result is X * Y.

% Division
divide(X, Y, Result) :- Result is X / Y.

% Task 3: Combine List and Arithmetic Operations

% Sum of squares of elements in a list
sumOfSquares(List, Result) :-
    squareList(List, SquaredList),
    sum(SquaredList, Result).

squareList([], []).
squareList([Head|Tail], [Squared|SquaredTail]) :-
    Squared is Head * Head,
    squareList(Tail, SquaredTail).


% Facts about books
book('To Kill a Mockingbird', author('Harper Lee'), genre('Fiction')).
book('1984', author('George Orwell'), genre('Dystopian')).
book('The Great Gatsby', author('F. Scott Fitzgerald'), genre('Fiction')).
book('Sapiens', author('Yuval Noah Harari'), genre('Non-fiction')).

% Facts about book availability
available('To Kill a Mockingbird', library('Central Library')).
available('1984', library('Community Library')).
available('Sapiens', library('City Library')).

abooks(X, Y):- book(Y, author(X), Z).