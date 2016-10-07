/*
Two positive integers N and M are given. Integer N represents the number of chocolates arranged in a circle, numbered from 0 to N − 1.

You start to eat the chocolates. After eating a chocolate you leave only a wrapper.

You begin with eating chocolate number 0. Then you omit the next M − 1 chocolates or wrappers on the circle, and eat the following one.

More precisely, if you ate chocolate number X, then you will next eat the chocolate with number (X + M) modulo N (remainder of division).

You stop eating when you encounter an empty wrapper.

For example, given integers N = 10 and M = 4. You will eat the following chocolates: 0, 4, 8, 2, 6.

The goal is to count the number of chocolates that you will eat, following the above rules.

Write a function:

function solution(N, M);
that, given two positive integers N and M, returns the number of chocolates that you will eat.

For example, given integers N = 10 and M = 4. the function should return 5, as explained above.

Assume that:

N and M are integers within the range [1..1,000,000,000].
Complexity:

expected worst-case time complexity is O(log(N+M));
expected worst-case space complexity is O(log(N+M)).
*/
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// Gcd function from https://codility.com/media/train/10-Gcd.pdf
var Gcd = function(a, b, res = 1) {
    if (a === b) return res * a;
    else if (a % 2 === 0 && b % 2 === 0) return Gcd(a/2, b/2, 2*res);
    else if (a % 2 === 0) return Gcd(a/2, b, res);
    else if (b % 2 === 0) return Gcd(a, b/2, res);
    else if (a > b) return Gcd(a-b, b, res);
    else return Gcd(a, b-a, res);
};

function solution(N, M) {
    var gcd = Gcd(N, M);
    var lcm = (N * M) / gcd;
    
    //console.log("gcd = " + gcd);
    //console.log("lcm = " + lcm);
    
    return lcm / M;
    // return N / Gcd(N, M) is the same result in 1 line
}
