/*
A non-empty zero-indexed array A consisting of N integers is given.

A triplet (X, Y, Z), such that 0 ≤ X < Y < Z < N, is called a double slice.

The sum of double slice (X, Y, Z) is the total of A[X + 1] + A[X + 2] + ... + A[Y − 1] + A[Y + 1] + A[Y + 2] + ... + A[Z − 1].

For example, array A such that:

    A[0] = 3
    A[1] = 2
    A[2] = 6
    A[3] = -1
    A[4] = 4
    A[5] = 5
    A[6] = -1
    A[7] = 2
contains the following example double slices:

double slice (0, 3, 6), sum is 2 + 6 + 4 + 5 = 17,
double slice (0, 3, 7), sum is 2 + 6 + 4 + 5 − 1 = 16,
double slice (3, 4, 5), sum is 0.
The goal is to find the maximal sum of any double slice.

Write a function:

function solution(A);
that, given a non-empty zero-indexed array A consisting of N integers, returns the maximal sum of any double slice.

For example, given:

    A[0] = 3
    A[1] = 2
    A[2] = 6
    A[3] = -1
    A[4] = 4
    A[5] = 5
    A[6] = -1
    A[7] = 2
the function should return 17, because no double slice of array A has a sum of greater than 17.

Assume that:

N is an integer within the range [3..100,000];
each element of array A is an integer within the range [−10,000..10,000].
Complexity:

expected worst-case time complexity is O(N);
expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).
Elements of input arrays can be modified.
*/
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');
/*
left and right hold the sums going from left to right and right to left
they don't include A[0] and A[N-1] because of rules
to get maxSum we have to check the sum removing the number in the index (sum before and sum after)
*/
function solution(A) {
    var N = A.length;
    var left = Array(N).fill(0),
        right = Array(N).fill(0);
    var maxSum = 0;
    
    for (var i = 1; i < N-1; i++) {
        left[i] = Math.max(0, left[i-1] + A[i]);        
        right[N-1-i] = Math.max(0, right[N-i] + A[N-1-i]);
    }
    
    //console.log("left = " + JSON.stringify(left));
    //console.log("right = " + JSON.stringify(right));
    
    for (var i = 1; i < N-1; i++) {
        maxSum = Math.max(maxSum, left[i-1] + right[i+1]);
    }
    
    return maxSum;
}
