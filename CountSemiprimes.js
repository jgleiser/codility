/*
A prime is a positive integer X that has exactly two distinct divisors: 1 and X. The first few prime integers are 2, 3, 5, 7, 11 and 13.

A semiprime is a natural number that is the product of two (not necessarily distinct) prime numbers. The first few semiprimes are 4, 6, 9, 10, 14, 15, 21, 22, 25, 26.

You are given two non-empty zero-indexed arrays P and Q, each consisting of M integers. These arrays represent queries about the number of semiprimes within specified ranges.

Query K requires you to find the number of semiprimes within the range (P[K], Q[K]), where 1 ≤ P[K] ≤ Q[K] ≤ N.

For example, consider an integer N = 26 and arrays P, Q such that:

    P[0] = 1    Q[0] = 26
    P[1] = 4    Q[1] = 10
    P[2] = 16   Q[2] = 20
The number of semiprimes within each of these ranges is as follows:

(1, 26) is 10,
(4, 10) is 4,
(16, 20) is 0.
Write a function:

function solution(N, P, Q);
that, given an integer N and two non-empty zero-indexed arrays P and Q consisting of M integers, returns an array consisting of M elements specifying the consecutive answers to all the queries.

For example, given an integer N = 26 and arrays P, Q such that:

    P[0] = 1    Q[0] = 26
    P[1] = 4    Q[1] = 10
    P[2] = 16   Q[2] = 20
the function should return the values [10, 4, 0], as explained above.

Assume that:

N is an integer within the range [1..50,000];
M is an integer within the range [1..30,000];
each element of arrays P, Q is an integer within the range [1..N];
P[i] ≤ Q[i].
Complexity:

expected worst-case time complexity is O(N*log(log(N))+M);
expected worst-case space complexity is O(N+M), beyond input storage (not counting the storage required for input arguments).
Elements of input arrays can be modified.
*/
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// ArrayF function from https://codility.com/media/train/9-Sieve.pdf
var ArrayF = function(N) {
    var F = Array(N+1).fill(0);
    for (var i = 2; i*i <= N; i++) {
        if (F[i] === 0) {
            for (var k = i*i; k <= N; k += i) {
                if (F[k] === 0) F[k] = i;
            }
        }
    }
    return F;
};

// Factorization function from https://codility.com/media/train/9-Sieve.pdf
var Factorization = function (x, F) {
    var primeFactors = [];
    while (F[x] > 0) {
        primeFactors.push(F[x]);
        x /= F[x];
    }
    primeFactors.push(x);
    return primeFactors;
};

/*
Big solution, easier to understand
SemiPrimes are only factorized by 2 prime numbers
We need to know the ammount of semiPrimes between 2 numbers
*/
function solution(N, P, Q) {
    var result = [];
    var arrayF = ArrayF(N);
    var semiPrimes = [];
    var semiPrimesIndex = Array(N+1).fill(0);
    var semiPrimesTotal = [0];
    
    for (var i = 4; i <= N; i++) {
        var primeFactors = Factorization(i, arrayF);
        if (primeFactors.length === 2) {
            semiPrimes.push(i);
        }
    }
    
    for (var i = 0; i < semiPrimes.length; i++) {
        semiPrimesIndex[semiPrimes[i]] = 1;
    }
    
    for (var i = 1; i < semiPrimesIndex.length; i++) {
        semiPrimesTotal[i] = semiPrimesTotal[i-1] + semiPrimesIndex[i];
    }
    
    //console.log(JSON.stringify(semiPrimes));
    //console.log(JSON.stringify(semiPrimesIndex));
    //console.log(JSON.stringify(semiPrimesTotal));
    
    for (var k = 0; k < P.length; k++) {
        result[k] = semiPrimesTotal[Q[k]] - semiPrimesTotal[P[k]-1];
    }
    
    return result;
}

/*
Optimized solution, does same as above with less code
*/
function solution(N, P, Q) {
    var result = [];
    var FactorizationArray = ArrayF(N);
    var semiPrimesIndex = Array(N+1).fill(0);
    var semiPrimesTotal = [0,0,0,0];
    
    for (var i = 4; i < N+1; i++) {
        if (Factorization(i, FactorizationArray).length === 2) {
            semiPrimesIndex[i] = 1;
        }
        semiPrimesTotal[i] = semiPrimesTotal[i-1] + semiPrimesIndex[i];
    }
    
    //console.log(JSON.stringify(semiPrimesIndex));
    //console.log(JSON.stringify(semiPrimesTotal));
    
    for (var k = 0; k < P.length; k++) {
        result[k] = semiPrimesTotal[Q[k]] - semiPrimesTotal[P[k]-1];
    }
    
    return result;
}
