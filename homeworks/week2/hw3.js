function isPrime(n) {
  var factor = []
  for(var i=1; i<=n; i++){
      if(n%i == 0) factor.push(i)
  }
  return factor.length==2
}

module.exports = isPrime