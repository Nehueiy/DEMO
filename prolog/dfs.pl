% Graph representation (adjacency list)
edge(a, b).
edge(a, c).
edge(b, d).
edge(c, e).
edge(c, f).
edge(d, g).
edge(e, h).

% Depth-first search
dfs(Node, Visited) :-
    dfs(Node, [], Visited).

dfs(Node, Path, Visited) :-
    \+ member(Node, Path),    % Check if the node is not in the current path
    write(Node), nl,
    dfs_neighbours(Node, [Node|Path], Neighbours),
    dfs_all(Neighbours, [Node|Path], Visited).

dfs_neighbours(Node, Path, Neighbours) :-
    findall(NextNode, (edge(Node, NextNode), \+ member(NextNode, Path)), Neighbours).

dfs_all([], _, _).
dfs_all([H|T], Path, Visited) :-
    dfs(H, Path, Visited),
    dfs_all(T, Path, Visited).