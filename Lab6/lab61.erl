-module(lab61).
-export([start/0, stop/0, wait/0, signal/0, init/0]).

%% DODAC MONITOR

%% Start the semaphore process by spawning it and registering it with BIF under a suitable name
start() ->
	register(lab61, spawn(?MODULE, init, [])).

%% Stop the semaphore process - send stop singal to free() function
stop() ->
	lab61 ! stop.

%% Init function, calls the main semaphore fun - free()
init() ->
	free().

%% Free waits for msgs with request to block the semaphore, sends back confirmatory 'ok', then gets busy(). If it gets stop singal it calls terminate()
free() ->
	receive
		{wait, Pid} ->
			Pid ! ok,
			busy(Pid);

		stop ->
			terminate()
	end.

%% Called when a process wants to acquire the semaphore, after  getting the msg has been confirmed, function quits
wait() ->
	lab61 ! {wait, self()},
	receive ok -> 
		ok 
	end.

%% Called when a proccess wants to free the semaphore
signal() ->
	lab61 ! {signal, self()}, ok.

%% Busy keeps the semaphore busy until a process frees it, so it can go back to the main free() function
busy(Pid) ->
	receive
		{signal, Pid} ->
			free()
	end.

%% Clean-up - terminate all proccesses that try to lock the semaphore during shut-down, then close it
terminate() ->
	receive
		{wait, Pid} ->
			exit(Pid, kill),
			terminate()
	after
		0 -> ok
	end.

