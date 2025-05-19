male(john).
male(jim).
male(jony).
female(eliza).
female(ann).
female(lisa).
parent(john,jim).
parent(john,ann).
parent(eliza,jim).
parent(ann,peter).
parent(ann,lisa).
parent(jim,tony).
siblings(X,Y) :- parent(Z,X), parent(Z,Y).
father(X,Y) :- parent(X,Y), male(X).
mother(X,Y) :- parent(X,Y), female(Y).
grandfather(X,Y) :- parent(X,Z), parent(Z,Y), male(X).