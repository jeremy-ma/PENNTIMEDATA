
###Parses
import sys
import re

#get filename from command line argument & open it (file to be opened must be in same directory)
filename = sys.argv[1]
course_file = open(filename,'r')
start = False

subject = False
subInfo = ""

for line in course_file:
	if start == False:
		#match <p>Subject code
		matching = re.match(r'<p>([A-Z]*)-([0-9]*) .*',line)
		start = True
	else: 
		#match subject code
		matching = re.match(r'([A-Z]*)-([0-9]*) .*',line)

	if matching:
		#if we have found the start of a subject

		print matching.group()

		if subject == True:
			#if we were already printing out a subject
			#print to file
			newFileName = subName + subNum + ".txt"
			newFile = open(newFileName,"w")
			newFile.write(subInfo)
			subInfo = ""
			print "new subject"
		else: 
			#start recording
			subject = True
			subInfo = ""

		subName = matching.group(1)
		subNum = matching.group(2)


	if line=='</pre>':
		newFileName = subName + subNum + ".txt"
		newFile = open(newFileName,"w")
		newfile.write(subInfo)
		print "done"

		#print stuff out to file

	if subject == True:
		subInfo = subInfo + line 


