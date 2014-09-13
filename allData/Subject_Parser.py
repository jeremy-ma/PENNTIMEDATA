import sys

import re

import linecache


filename = sys.argv[1]
subject_file = open(filename, 'r')


def normalize(text):
    lower = text.lower()
    normal = ' '.join(lower.split())
    return normal


def is_number(s):
    try:
        float(s)
        return True
    except ValueError:
        return False


course = linecache.getline(filename, 1).split()
text = open('new.txt', 'w')


first = True
errthang = ''

crscode = filename.split('/')[2]
crscode = crscode.split('.')[0]
print filename

line = crscode + ' '
for word in course:
	if first == True:
	    first = False
	elif is_number(word[0]): 
		break
	else:
		line = line + word + ' '
errthang = errthang + line

section = ''
grabNextLine = False

for line in subject_file:
	line = normalize(line)
	match = re.match(r'(\d{3}) .*', line)
	if match:
		courseinfo = line.split()
		if (len(courseinfo)>=4):
			for i in range(0, 4):
				section = section + courseinfo[i] + ' '
			section = section + '\n'
		else:
			num = match.group(1) 
			grabNextLine = True

	elif grabNextLine == True:
		courseinfo = line.split()
		for i in range(0,3):
			section = section + courseinfo[i] + ' '
		section = section + num + ' '
		section = section + '\n'
		grabNextLine = False

errthang = errthang + '\n' + section
errthang = '\n' + errthang

text.write(errthang)

