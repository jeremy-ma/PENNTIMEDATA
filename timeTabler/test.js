var fs = require('fs');

var filename = process.argv[2];

console.log(filename);


function get_line(filename, callback) {
    var data = fs.readFileSync(filename, 'utf8')
    var lines = data.split("\n")
    
    lines.forEach(function(line){
    	callback(line);
    	
    })
}
function Section(code, type, days,times ){

}

function Class(coursecode, courseInfoString){
	this.ccode = coursecode;
	this.secArray = new Array();

	sections = courseInfoString.split('{');
	name = sections[0];
	name = name.split(' ');
	name.shift();
	name = name.join(' ');

	this.courseName = name;

	sections.shift();

	//sections only contains section info


	for section in sections {
		tba = section.match('tba');
		//if course is to be announced, ignore it
		if (tba == null){
			continue;
		}
		section.replace('}','');
		fields = section.split(' ');
		
		secObj = Section()
		
	}




}

function get_sub_data(crscodes,filename){
	var courses = crscodes.split(" ");
	var data = fs.readFileSync(filename, 'utf8');
	var lines = data.split('\n');
	//Should do this with binary search but eh
	lines.forEach(function(line){
		for (var i =0,len = courses.length;i<len;i++){
			matches = line.match(courses[i] + '(.*)');
			if (matches!=null){
				console.log(matches[1]);

			}
		}
	})
	
}

get_sub_data('CIS191 CIS380 ESE304 ACCT101', 'finaldata.txt')




/*
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

*/