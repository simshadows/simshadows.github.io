#!/usr/bin/env bash

my_variable1="lmao ayy"
my_variable2="my_variable1"
my_variable3= "whoami"

echo "============"

echo $my_variable1
echo $my_variable2

echo $my_variable1             # "lmao ayy"
echo ${my_variable1/ayy/dab}   # "lmao dab"
echo ${!my_variable2}          # "lmao ayy"
echo ${i_dont_exist:-"foo"}    # "lmao ayy"
echo ${i_dont_exist:-$my_variable1}   # "lmao ayy"
