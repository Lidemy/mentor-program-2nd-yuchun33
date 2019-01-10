
function pe(num){
    function add(str){
        let sum = 0
        for(let i=0 ; i<str.length; i++){
            sum+=str[i]
        }
        return sum
    }

    let str = []
    for(let i=0; i<num; i++){
        if(num%i==0){
            str.push(i)
        }
    }
    let m = add(str)

    
    str = []
    for(let i=0; i<m; i++){
        if(m%i==0){
            str.push(i)
        }
    }
    let n = add(str)

    
    if(m==num){
        return m
    }else if(n==num){
        return m
    }else{
        return 0
    }
}



console.log(pe(6))
console.log(pe(7))
console.log(pe(220))
console.log(pe(0))
