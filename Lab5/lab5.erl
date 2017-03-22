-module(lab5).

-export([start/1, ping/2, pong/0]).

%% Second process, called when the countdown reaches 0
ping(0, Pong_PID) ->
    Pong_PID ! finished,
    io:format("Ping out!~n", []);

%% Second process, initiates 
ping(N, Pong_PID) ->
    Pong_PID ! {self(), ping},
    receive
        pong ->
            io:format("Ping!~n", [])
    end,
    ping(N - 1, Pong_PID).

%% First process, waits for the other to start sending msgs
pong() ->
    receive
        finished ->
            io:format("Pong out!~n", []);
        {Ping_PID, ping} ->
            io:format("Pong!~n", []),
            Ping_PID ! pong,
            pong()
    end.

start(X) ->
    Pong_PID = spawn(lab5, pong, []),
    spawn(lab5, ping, [X, Pong_PID]).