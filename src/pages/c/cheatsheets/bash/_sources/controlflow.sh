echo "first"; echo "second"
echo "always executes" || echo "only executes if first command fails"
echo "always executes" && echo "only executes if first command does not fail"

my_arr=(apple banana orange lemon)
for v in ${my_arr[@]}; do
    echo $v
done

str1="foo"
if [[ $str1 == "bar" ]]; then
    echo "this is true"
else
    echo "this is false"
fi

num1=12
if [[ $str1 != "bar" ]] && [[ $num1 -eq 12 ]]; then
    echo "this is true"
fi
