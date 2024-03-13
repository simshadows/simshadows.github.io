#!/usr/bin/env bash

set -v    # Print commands as they are run.

echo "$#"   # "3" (number of args)
echo "$@"   # "foo bar baz"

echo "$0"   # "./demo.sh"
echo "$1"   # "foo"
echo "$2"   # "bar"

# Read stdin into new variable $name
echo "What is your name?"
read name
echo "Hello, $name!"

# Read contents of a file into a variable
filecontents=$(cat myfile.txt)
echo "$filecontents"
