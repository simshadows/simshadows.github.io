# Variable assignment must have no space around the `=` character.
my_var1="lmao ayy"
my_var2=$(printf "%s %d\n" "hello" 123)   # my_var3 becomes "hello 123"

# When in doubt, use double-quotes for variable expansion.

echo "$my_var1"      # "lmao ayy"
echo "${#my_var1}"   # "8" (string length)

echo "${my_var1:2:5}"   # "ao ay"
echo "${my_var1: -2}"   # "yy" (the space is required)

echo "${my_var1/ayy/dab}"   # "lmao dab"

other_var="my_var1"
echo "${!other_var}"   # "lmao ayy"

# Default value if empty/nonexistent
echo "${i_dont_exist:-"foo"}"      # "foo"
echo "${i_dont_exist:-$my_var1}"   # "lmao ayy"
echo "${my_var1:-"foo"}"           # "lmao ayy"

##################################################

my_array=(apple banana orange lemon)

echo "${my_array[@]}"        # "apple banana orange lemon"
echo "${#my_array[@]}"       # "4"

echo "${my_array[0]}"        # "apple"
echo "${my_array[1]}"        # "banana"
echo "${my_array[@]:1:2}"    # "banana orange" (same slicing as string)

##################################################

echo {1..10}     # "1 2 3 4 5 6 7 8 9 10"
echo {a..g}      # "a b c d e f g"
#echo {$x..$y}   # CAN'T USE VARIABLES
