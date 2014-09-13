import sys

import re

filename = sys.argv[1]
data = open(filename, 'r')
newdata = ''
finaldata = open('finaldata.txt', 'w')

for line in data:
	matchcourse = re.match(r'(\D)', line)
	matchsection = re.match(r'(\d{3}) .*', line)
	if matchcourse:
		courseinfo = line.strip()
		newdata = newdata + "\n"
		newdata = newdata + courseinfo + ' '
	if matchsection:
		sectioninfo = line.strip()
		newdata = newdata + "{" + sectioninfo + "} "

finaldata.write(newdata) 