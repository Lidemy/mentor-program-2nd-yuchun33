function pb(M, N){
    if(M.length>N.length){
        return 'Unfair'
    }
    if(M.length == N.length){
        for(let i=0; i<M.length; i++){
            if(M[i]>N[i]){
                return 'Unfair'
            }
        }
    }
    return 'Fair'

}

console.log(pb('123', '456'));
console.log(pb('4123', '456'));
console.log(pb('455', '456'));
console.log(pb('456', '456'));
console.log(pb('0', '0'));
console.log(pb('45633333333333333333333333333333333333333333333333333333333333333333333333', '456'));
console.log(pb('45633333333333333333333333333333333333333333333333333333333333333333333333', '45633333333333333333333333333333333333333333333333333333333333333333333332'));

