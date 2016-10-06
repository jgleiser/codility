/*
A string S consisting of N characters is called properly nested if:

S is empty;
S has the form "(U)" where U is a properly nested string;
S has the form "VW" where V and W are properly nested strings.
For example, string "(()(())())" is properly nested but string "())" isn't.

Write a function:

function solution(S);
that, given a string S consisting of N characters, returns 1 if string S is properly nested and 0 otherwise.

For example, given S = "(()(())())", the function should return 1 and given S = "())", the function should return 0, as explained above.

Assume that:

N is an integer within the range [0..1,000,000];
string S consists only of the characters "(" and/or ")".
Complexity:

expected worst-case time complexity is O(N);
expected worst-case space complexity is O(1) (not counting the storage required for input arguments).
Copyright 2009–2016 by Codility Limited. All Rights Reserved. Unauthorized copying, publication or disclosure prohibited.
*/
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(S) {
    var result = 0;
    for (var i = 0; i < S.length; i++) {
        if ("(" === S[i]) result += 1;
        else result -= 1;
        
        // if result is negative there are more ) than (
        if (result < 0) return 0;
    }
    if (0 === result) return 1;
    else return 0;
}
