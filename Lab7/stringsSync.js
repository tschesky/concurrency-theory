var fs = require("fs");
var global = 0;

// General function
var dive = function (dir, action) {
  // Assert that it's a function
  if (typeof action !== "function")
    action = function (error, file) { };

  // Read the directory

  // readdirSync
   list = fs.readdirSync(dir);
    // For every file in the list
    list.forEach(function (file) {
      // Full path of that file
      var path = dir + "/" + file;
      // Get the file's stats
      fs.stat(path, function (err, stat) {
        // console.log(stat);
        // If the file is a directory
        if (stat && stat.isDirectory())
          // Dive into the directory
          dive(path, action);
        else
          // Call the action
          action(null, path);
      });
    });
};

var action = function(error, file){
	var buf = fs.readFileSync(file);
	var string = buf.toString();
	var array = string.split('\n');

	var no = array.length;
  global += no;
	console.log(file + '\t\t'+ no);
};

if(process.argv.length === 3){

	dive(process.argv[2], action);
}

process.on('exit', function (){
  console.log('\n>> Total lines count: \t' + global);
});
