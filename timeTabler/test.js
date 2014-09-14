var fs = require('fs');

var filename = process.argv[2];

function Section(code, type, daysRunning,timeString ){
	this.code = code;
	this.type = type;
	this.days = new Array();
	dayList = daysRunning.split("");
	//console.log(dayList.length);
	
	for (j=0;j<dayList.length;j++) {
		
		if (dayList[j]=='m') {
			this.days.push(0);
			//console.log(dayList[i]);
		} else if (dayList[j]=='t') {
			this.days.push(1);
			//console.log(dayList[i]);
		} else if (dayList[j]=='w') {
			this.days.push(2);
			//console.log(dayList[i]);
		} else if (dayList[j]=='r') {
			this.days.push(3);
			//console.log(dayList[i]);
		} else if (dayList[j]=='f') {
			this.days.push(4);
			//console.log(dayList[i]);
		} else {
			console.log("error in Section constructor\n");
		}
	}
	
	//console.log(this.days);
	timeMatch = timeString.match('([0-9:]*)-([0-9:]*)([A-Za-z]*)');
	//map times 00:00am to 11:30pm to 0-47
	if (timeMatch[3]=='am' || timeMatch[3] == 'noon') {
		startTime = timeMatch[1].split(':');
		this.startTime = 2*parseInt(startTime[0]);
		endTime = timeMatch[2].split(':');
		this.endTime = 2*parseInt(endTime[0]);
		
		if (startTime.length==2){
			//if it starts on a half hour
			this.startTime += 1;
			//increment by 1 for the half hour
		}

		if (endTime.length==2){
			//same here
			this.endTime += 1;

		}

	} else if (timeMatch[3]=='pm') {
		startTime = timeMatch[1].split(':');
		this.startTime = 2*parseInt(startTime[0]);
		endTime = timeMatch[2].split(':');
		this.endTime = 2*parseInt(endTime[0]);

		//increment by half an hour
		if (startTime.length==2){

			this.startTime +=1;
		}
		if (endTime.length==2){
			this.endTime +=1;
		}

		if (this.startTime<this.endTime) {
			this.startTime+=24;
			this.endTime+=24;
		} else {
			this.endTime +=24;
		}

	} else {
		console.log("error in 2nd part of Section Constructor\n");
	}

	//console.log(timeString);
	//console.log('startime' + this.startTime);
	//console.log('endtime' + this.endTime);
}

Section.prototype.getStart = function(){
	return this.startTime;
}

Section.prototype.getEnd = function() {
	return this.endTime;
}

Section.prototype.getType = function() {
	return this.type;
}

Section.prototype.getDays = function() {
	return this.days;
}

function Class(coursecode, courseInfoString){
	this.ccode = coursecode;
	//console.log(this.ccode);
	this.secArray = new Array();
	this.secTypes = new Array();

	sections = courseInfoString.split('{');
	name = sections[0];
	name = name.split(' ');
	name.shift();
	name = name.join(' ');

	this.courseName = name;

	sections.shift();

	//sections only contains section info

	for (i=0;i<sections.length;i++) {
		tba = sections[i].match('tba');
		//if course is to be announced, ignore it
		if (tba != null){
			continue;
		}
		sections[i] = sections[i].replace('}','');
		fields = sections[i].split(' ');

		//record types of sections
		if (this.secTypes.indexOf(fields[1])<0){
			this.secTypes.push(fields[1]);
		}
		//console.log(this.secTypes);

		secObj = new Section(fields[0],fields[1],fields[2],fields[3]);
		//add to list of sections
		this.secArray.push(secObj);
	}

}

Class.prototype.getCode = function (){
	return this.ccode;
}

Class.prototype.getSecTypes = function(){
	return this.secTypes;
}

Class.prototype.getCourseName = function() {
	return this.courseName;
}


function get_sub_data(crscodes,filename){
	var courses = crscodes.split(" ");
	var data = fs.readFileSync(filename, 'utf8');
	var lines = data.split('\n');
	var classArray = new Array();
	//Should do this with binary search but eh
	//search for subject and fill classArray with classes
	lines.forEach(function(line){
		for (var i =0,len = courses.length;i<len;i++){
			matches = line.match(courses[i] + '(.*)');
			if (matches!=null){
				//console.log(courses[i]);

				test = new Class(courses[i],matches[1]);

				classArray.push(test);

			}
		}
	})

	return classArray;	
}


function Schedule(section,courseCode){
	
	this.timeTable = new Array();
	for (k=0; k<5;k++){
		day = new Array();
		for (l=0; l<48;l++){
			day.push('');
		}
		this.timeTable.push(day);
	}

	days = section.getDays();
	startTime = section.getStart();
	endTime = section.getEnd();

	for (b=0;b<days.length;b++){
		for (v=startTime;v<endTime;v++){
			section[b][v] = courseCode + '_' + section.getType;
		}
	}
	
}

Schedule.prototype.getSchedule = function() {
	return this.timeTable;
}

Schedule.prototype.add = function(otherSched) {
	//merges other schedule into currrent one
	//changes it!!
	other = otherSched.getSchedule();
	cur = this.getSchedule();

	for (m=0;m<5;m++){
		for(n=0;n<48;n++){
			cur[m][n]=cur[m][n] + other[m][n];
		}
	}

	return cur;
}





















array = get_sub_data('CIS191 CIS380 ESE304 ACCT101', 'finaldata.txt');

for (i=0; i<array.length;i++) {

	///console.log(array[i].getCode());
	//console.log(array[i].getSecTypes());
	console.log(array[i].getCourseName());
}






