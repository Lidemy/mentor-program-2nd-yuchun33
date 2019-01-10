function pc(arr1, arr2){
    let str = ''
    let pass = ''
    for(let i=0; i<arr1.length; i++){
        str+= arr1[i]
    }
    for(let i=0; i<arr2.length; i++){
        pass += str[arr2[i]-1]
    }
    return pass
}


console.log(pc(['ab', 'cd', 'ef'], [1, 4]));
console.log(pc(['ab', 'cd', 'efdddddddddd'], [1, 4, 8]));
