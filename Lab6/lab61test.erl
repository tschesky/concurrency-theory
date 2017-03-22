-module(lab61test).
-export([start/0]).

writer1(X) when X == 0 ->
	io:format("Writer1 has finished.~n", []);

writer1(X) when X > 0 ->
	io:format("Writer1  wrote: ~n", [] ),
	io:format("Writer1  wrote: ~n",  []),
	io:format("Writer1  wrote: ~n",  []),
	io:format("Writer1  wrote: ~n", [] ),
	writer1(X-4).

writer2(X) when X == 0 ->
	io:format("Writer2 has finished.~n", []);

writer2(X) when X > 0 ->
	io:format("Writer2  wrote: ~n", [] ),
	io:format("Writer2  wrote: ~n",  []),
	io:format("Writer2  wrote: ~n",  []),
	io:format("Writer2  wrote: ~n", [] ),
	writer2(X-4).

start() ->	
	spawn(lab61test, writer1, [40]).






