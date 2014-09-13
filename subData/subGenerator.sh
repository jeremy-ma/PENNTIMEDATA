#!/bin/sh

FILES="../courseinfo/*.html"

for file in $FILES
do
	python parser.py "$file"

done

