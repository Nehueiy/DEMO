% Graph representation (weighted directed graph)
edge(a, b, 2).
edge(a, c, 4).
edge(b, d, 3).
edge(c, e, 5).
edge(c, f, 1).
edge(d, g, 7).
edge(e, h, 6).

% Heuristic function (straight-line distance)
distance(a, h, 8).
distance(b, h, 6).
distance(c, h, 5).
distance(d, h, 7).
distance(e, h, 4).
distance(f, h, 3).
distance(g, h, 2).
distance(h, h, 0).  % Distance from the goal to itself is 0.

% Goal state
goal(h).

% Node representation
% node(Current, F, G, Path)
% F: Total cost (G + H)
% G: Cost from the start node
% Path: Path from the start node to the current node
node(a, 0, 0, []).
node(b, 0, 0, []).
node(c, 0, 0, []).
node(d, 0, 0, []).
node(e, 0, 0, []).
node(f, 0, 0, []).
node(g, 0, 0, []).
node(h, 0, 0, []).

% A* search
a_star(Start, Path, Cost) :-
    a_star([node(Start, 0, 0, [])], [], Path, Cost).

a_star([node(Current, _, G, Path)|_], _, Path, G) :-
    goal(Current).

a_star([node(Current, _, G, Path)|Open], Closed, FinalPath, FinalCost) :-
    findall(node(Next, F, G1, [Current|Path]),
            (edge(Current, Next, Cost), \+ member(Next, Closed),
             G1 is G + Cost, heuristic(Next, H), F is G1 + H),
            Successors),
    append(Successors, Open, UpdatedOpen),
    sort(UpdatedOpen, SortedOpen),
    a_star(SortedOpen, [Current|Closed], FinalPath, FinalCost).

% Heuristic function (straight-line distance)
heuristic(Node, H) :- distance(Node, h, H).

% Example usage
% To find the shortest path and cost from 'a' to 'h', you can use:
% ?- a_star(a, Path, Cost).
