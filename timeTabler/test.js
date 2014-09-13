var fs = require('fs');

var filename = process.argv[2];

console.log(filename);


function get_line(filename, callback) {
    var data = fs.readFileSync(filename, 'utf8')
    var lines = data.split("\n")
    var line_no = 0;
    lines.forEach(function(line){
    	callback(line);
    	line_no = line_no + 1
    })
}

get_line(filename, function(line){
  //console.log(line);
 	matches = line.match('WRIT089')
 	if (matches != null) {
		console.log(matches)
	}	
 	matches = line.match('CIS191')
 	if (matches != null) {
		console.log(matches)
	}	
 	matches = line.match('CIS380')
 	if (matches != null) {
		console.log(matches)
	}	
 	matches = line.match('ESE304')
 	if (matches != null) {
		console.log(matches)
	}	
})

/*
var myObject = {
  firstName: 'Adi',
  lastName: 'Dahiya'
};

console.log(myObject.firstName);
console.log(myObject.lastName);
*/