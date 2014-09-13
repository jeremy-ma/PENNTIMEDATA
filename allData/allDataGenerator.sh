#!/bin/sh

FILES="../subData/*.txt"

echo '' > allData.txt
touch new.txt

for file in $FILES
do 
	python Subject_Parser.py "$file"
	cat new.txt >> allData.txt
done