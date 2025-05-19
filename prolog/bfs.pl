% Graph representation (adjacency list)
edge(a, b).
edge(a, c).
edge(b, d).
edge(c, e).
edge(c, f).
edge(d, g).
edge(e, h).

% Breadth-first search
bfs(Start, Visited) :-
    bfs([Start], [], Visited).

bfs([], _, _).
bfs([Current|Rest], Path, Visited) :-
    \+ member(Current, Path),
    write(Current), nl,
    bfs_neighbours(Current, [Current|Path], _, RestQueue),
    append(Rest, RestQueue, NewQueue),
    bfs(NewQueue, [Current|Path], Visited).

bfs_neighbours(Node, Path, Neighbours, RestQueue) :-
    findall(NextNode, (edge(Node, NextNode), \+ member(NextNode, Path)), Neighbours),
    subtract(Neighbours, Path, RestQueue).
