/*
A DNA sequence can be represented as a string consisting of the letters A, C, G and T, which correspond to the types of successive nucleotides in the sequence. Each nucleotide has an impact factor, which is an integer. Nucleotides of types A, C, G and T have impact factors of 1, 2, 3 and 4, respectively. You are going to answer several queries of the form: What is the minimal impact factor of nucleotides contained in a particular part of the given DNA sequence?

The DNA sequence is given as a non-empty string S = S[0]S[1]...S[N-1] consisting of N characters. There are M queries, which are given in non-empty arrays P and Q, each consisting of M integers. The K-th query (0 ≤ K < M) requires you to find the minimal impact factor of nucleotides contained in the DNA sequence between positions P[K] and Q[K] (inclusive).

For example, consider string S = CAGCCTA and arrays P, Q such that:

    P[0] = 2    Q[0] = 4
    P[1] = 5    Q[1] = 5
    P[2] = 0    Q[2] = 6
The answers to these M = 3 queries are as follows:

The part of the DNA between positions 2 and 4 contains nucleotides G and C (twice), whose impact factors are 3 and 2 respectively, so the answer is 2.
The part between positions 5 and 5 contains a single nucleotide T, whose impact factor is 4, so the answer is 4.
The part between positions 0 and 6 (the whole string) contains all nucleotides, in particular nucleotide A whose impact factor is 1, so the answer is 1.
Write a function:

function solution(S, P, Q);
that, given a non-empty zero-indexed string S consisting of N characters and two non-empty zero-indexed arrays P and Q consisting of M integers, returns an array consisting of M integers specifying the consecutive answers to all queries.

The sequence should be returned as:

a Results structure (in C), or
a vector of integers (in C++), or
a Results record (in Pascal), or
an array of integers (in any other programming language).
For example, given the string S = CAGCCTA and arrays P, Q such that:

    P[0] = 2    Q[0] = 4
    P[1] = 5    Q[1] = 5
    P[2] = 0    Q[2] = 6
the function should return the values [2, 4, 1], as explained above.

Assume that:

N is an integer within the range [1..100,000];
M is an integer within the range [1..50,000];
each element of arrays P, Q is an integer within the range [0..N − 1];
P[K] ≤ Q[K], where 0 ≤ K < M;
string S consists only of upper-case English letters A, C, G, T.
Complexity:

expected worst-case time complexity is O(N+M);
expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).
Elements of input arrays can be modified.
*/
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(S, P, Q) {
    var A = [0],
        C = [0],
        G = [0];
    var a = 0, c = 0, g = 0;
    var R = [];
    
    if (S[0] === 'A') A[0] = 1;
    else if (S[0] === 'C') C[0] = 1;
    else if (S[0] === 'G') G[0] = 1;
    
    // prefix sum
    for (var i = 1; i < S.length; i++) {
        a = 0, c = 0, g = 0;
        
        if (S[i] === 'A') a = 1;
        else if (S[i] === 'C') c = 1;
        else if (S[i] === 'G') g = 1;
        
        A[i] = A[i-1] + a;
        C[i] = C[i-1] + c;
        G[i] = G[i-1] + g;
    }
    
    for (var j = 0; j < P.length; j++) {
        // Px = Qx, result = S[Px]
        if (P[j] === Q[j]) {
            if (S[P[j]] === 'A') R[j] = 1;
            else if (S[P[j]] === 'C') R[j] = 2;
            else if (S[P[j]] === 'G') R[j] = 3;
            else R[j] = 4;
        }
        // Px = 0 -> check Genomes[Qx]
        else if (P[j] === 0) {
            if (A[Q[j]] > 0) R[j] = 1;
            else if (C[Q[j]] > 0) R[j] = 2;
            else if (G[Q[j]] > 0) R[j] = 3;
            else R[j] = 4;
        }
		// Check Genomes[Qx-(Px-1)] > 0 to see if appears
        else if (A[Q[j]] - A[P[j]-1] > 0) R[j] = 1;
        else if (C[Q[j]] - C[P[j]-1] > 0) R[j] = 2;
        else if (G[Q[j]] - G[P[j]-1] > 0) R[j] = 3;
        else R[j] = 4;
    }

    return R;
}
