function pa(arr){
    let min = 0
    let ans = ''
    for(let i=0; i<arr.length; i++){
        let myarr = arr[i].split(' ')
        if(parseInt(myarr[2])<min){
            min = myarr[2]
            ans = myarr[0] + ' ' + myarr[1]
        }
    }
    return (ans != '') ? ans : 'Are you kidding me?'
}

//console.log(pa(['TACO hanon 0', 'peggy Penny 74', 'Debbie MeiMei -66']))
//console.log(pa(['TACO hanon 0', 'peggy Penny 74', 'Debbie MeiMei 66']))
//console.log(pa(['TACO hanon 0', 'peggy Penny -66', 'Debbie MeiMei -66']))
//console.log(pa(['TACO hanon 0', 'peggy Penny 0', 'Debbie MeiMei 0']))
//console.log(pa(['TACO hanon 0', 'peggy Penny 0', 'Debbie MeiMei 0']))
console.log(pa(['TACO hanon -2', 'peggy Penny 0', 'Debbie MeiMei -66']))