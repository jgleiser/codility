/*
A non-empty zero-indexed array A consisting of N integers is given.

A peak is an array element which is larger than its neighbours. More precisely, it is an index P such that 0 < P < N − 1 and A[P − 1] < A[P] > A[P + 1].

For example, the following array A:

    A[0] = 1
    A[1] = 5
    A[2] = 3
    A[3] = 4
    A[4] = 3
    A[5] = 4
    A[6] = 1
    A[7] = 2
    A[8] = 3
    A[9] = 4
    A[10] = 6
    A[11] = 2
has exactly four peaks: elements 1, 3, 5 and 10.

You are going on a trip to a range of mountains whose relative heights are represented by array A, as shown in a figure below. You have to choose how many flags you should take with you. The goal is to set the maximum number of flags on the peaks, according to certain rules.



Flags can only be set on peaks. What's more, if you take K flags, then the distance between any two flags should be greater than or equal to K. The distance between indices P and Q is the absolute value |P − Q|.

For example, given the mountain range represented by array A, above, with N = 12, if you take:

two flags, you can set them on peaks 1 and 5;
three flags, you can set them on peaks 1, 5 and 10;
four flags, you can set only three flags, on peaks 1, 5 and 10.
You can therefore set a maximum of three flags in this case.

Write a function:

function solution(A);
that, given a non-empty zero-indexed array A of N integers, returns the maximum number of flags that can be set on the peaks of the array.

For example, the following array A:

    A[0] = 1
    A[1] = 5
    A[2] = 3
    A[3] = 4
    A[4] = 3
    A[5] = 4
    A[6] = 1
    A[7] = 2
    A[8] = 3
    A[9] = 4
    A[10] = 6
    A[11] = 2
the function should return 3, as explained above.

Assume that:

N is an integer within the range [1..400,000];
each element of array A is an integer within the range [0..1,000,000,000].
Complexity:

expected worst-case time complexity is O(N);
expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).
Elements of input arrays can be modified.
*/
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) {
    var N = A.length;
    var next_peak = [];
    var flags_taken = 1; // asume at least 1 flag taken
    var result = 0;
    
    // no peaks available
    if (N < 3) return 0;
    
    // Create array with next peak index
    // Value of max_peak has the position of the next peak
    next_peak[N-1] = -1;
    
    for (var i = N-2; i >= 0; i--) {
        if (A[i] > A[i-1] && A[i] > A[i+1]) {
            next_peak[i] = i;
        }
        else {
            next_peak[i] = next_peak[i+1];
        }
    }
    
    // only 1 peak means only 1 flag
    if (next_peak.length === 1) return 1;
    
    /*  Try from 1 flag all the posibilities
        With next_peak we know where is the next peak
        and also we know that the number of flags taken
        determines the minimum distance that we can travel.
        Also always start trying from starting position and
        reset the number of flags used. At every peak found
        use a flag and travel to the next minimum position.
        In the end save the result of flags used or the
        maximum previously found
        (remember result starts in 0)
    */
    while ((flags_taken - 1) * flags_taken <= N) {
        var pos = 0;
        var flags_used = 0;
        while (pos < N && flags_used < flags_taken) {
            pos = next_peak[pos];
            if (pos === -1) break;
            flags_used++;
            pos += flags_taken;
        }
        result = Math.max(result, flags_used);
        flags_taken++;
    }
    
    return result;
}
