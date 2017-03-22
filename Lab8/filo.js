"use strict"
 
 // Fork var
var Fork = function () {
    this.state = 0;
    this.maxAttempt = 12;
    return this;
}

// Acquire the fork by some philosopher
Fork.prototype.acquire = function (cb, error) {
    var that = this;
    (function wait(attempt) {
            setTimeout(function(){
                if(attempt < that.maxAttempt)
                    if (that.state == 0) {
                        that.state = 1;
                        cb();
                    } else {
                        //wait(attempt+1);
                    }
                else
                    if(error) error()
            }, Math.floor(Math.random()*Math.pow(2, attempt)))
    })(0);
}
 
// Release the fork by said philosopher
Fork.prototype.release = function () {
    this.state = 0;
}
 
// Philosopher implementation
var Philosopher = function (id, forks) {
    this.id = id;
    this.forks = forks;
    this.f1 = id % forks.length;
    this.f2 = (id + 1) % forks.length;
    return this;
}

// Naive solution (doesn't really work, deadlock)
Philosopher.prototype.startNaive = function (count) {
    
    // Forks, initialize
    var forks = this.forks,
        f1 = this.f1,
        f2 = this.f2,
        id = this.id;
 
    // Error throws
    function error1(){
        console.log("Filozof nr "+id+" nie moze podniesc widelca nr " + f1);
    }
    function error2(){
        console.log("Filozof nr "+id+" nie moze podniesc widelca nr " + f2);
    }
 
    // Try to pick up the fork, check if the end condition hasn't been met
    (function take(attempt){
        if(attempt < count)
            forks[f1].acquire(function(){
                console.log("Filozof nr "+id+" podniosl widelec nr " + f1)
                forks[f2].acquire(function(){
                    console.log("Filozof nr "+id+" podniosl widelec nr " + f2)
                    setTimeout(function(){
                        forks[f1].release();
                        console.log("  Filozof nr "+id+" odklada widelec nr " + f1);
                        forks[f2].release();
                        console.log("  Filozof nr "+id+" odklada widelec nr " + f2);
                        console.log("     Filozof nr "+id+" konczy posilek");
                        take(attempt+1)
                    }, 200)
                }, error2)
            }, error1)
    })(0);
}

// Asymmetrical - first we serve the odd/even numbered philosophers
Philosopher.prototype.startAsym = function (count) {
    
    // Initilalize
    var forks = this.forks,
        f1 = this.f1,
        f2 = this.f2,
        id = this.id;
        // Check odd/even - simple fork swap
        if( id % 2 != 0 ) {
            var tmp = f1;
            f1 = f2;
            f2 = tmp;
        }
 
    // Error logs
    function error1(){
        console.log("Filozof nr "+id+" nie moze podniesc widelca nr " + f1);
    }
    function error2(){
        console.log("Filozof nr "+id+" nie moze podniesc widelca nr " + f2);
    }
 
    // Attempt to execute
    (function take(attempt){
        if(attempt < count)
            forks[f1].acquire(function(){
                console.log("Filozof nr "+id+" podniosl widelec nr " + f1);
                forks[f2].acquire(function(){
                    console.log("Filozof nr "+id+" podniosl widelec nr " + f2);
                    setTimeout(function(){
                        forks[f1].release();
                        console.log("  Filozof nr "+id+" odklada widelec nr " + f1);
                        forks[f2].release();
                        console.log("  Filozof nr "+id+" odklada widelec nr " + f2);
                        console.log("     Filozof nr "+id+" konczy posilek");
                        take(attempt+1);
                    }, 200)
                }, error2)
            }, error1)
    })(0);
}
 
var acquired = 0;
var waiting = [];

// Waiter solution - asking a third-party object to access a fork
Philosopher.prototype.startConductor = function (count) {
    // Initialize
    var forks = this.forks,
        f1 = this.f1,
        f2 = this.f2,
        id = this.id;
 
    // Check if we can lift - if so do it and increment, if not push the callback for waiting queue
    function check(callback){
        if (acquired < 4){
            acquired+=2;
            callback();
        } else
            waiting.push(callback);
    }
 
    // Error logs
    function error1(){
        console.log("Filozof nr "+id+" nie moze podniesc widelca nr " + f1);
    }
    function error2(){
        console.log("Filozof nr "+id+" nie moze podniesc widelca nr " + f2);
    }
 
    // Attempt to execute
    (function take(attempt){
        if(attempt < count)
            check(function(){
                forks[f1].acquire(function(){
                    console.log("Filozof nr "+id+" podniosl widelec nr " + f1);
                    forks[f2].acquire(function(){
                        console.log("Filozof nr "+id+" podniosl widelec nr " + f2);
                        setTimeout(function(){
                            forks[f1].release();
                            console.log("  Filozof nr "+id+" odklada widelec nr " + f1);
                            acquired--;
                            forks[f2].release();
                            console.log("  Filozof nr "+id+" odklada widelec nr " + f2);
                            console.log("     Filozof nr "+id+" konczy posilek");
                            acquired--;
                            var cb =waiting.shift();
                            if (cb) check(cb);
                            take(attempt+1);
                        }, 200)
                    }, error2)
                }, error1)
            })
    })(0);
 
}
 
 
 // Execute the program
var N = 5;
var forks = [];
var philosophers = [];

// Forks
for (var i = 0; i < N; i++) {
    forks.push(new Fork());
}

// Philosophers
for (var i = 0; i < N; i++) {
    philosophers.push(new Philosopher(i, forks));
}
 
// Execute
for (var i = 0; i < N; i++) {
    //philosophers[i].startNaive(3);
    //philosophers[i].startAsym(3);
    philosophers[i].startConductor(3);
};