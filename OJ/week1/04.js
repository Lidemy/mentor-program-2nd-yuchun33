function pd(arr){
    let sum = 0
    for(let i=0; i<arr.length; i++){
        sum += arr[i]
    }
    let avg = sum/arr.length
    let num = 0
    for(let i=0; i<arr.length; i++){
        if(arr[i]<avg){
            num += 1
        }
    }
    return num
}


console.log(pd([1, 3, 5]));
console.log(pd([1, 1, 1]));
