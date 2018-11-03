function Stack(){
    var arr = []
    var i = 0
    return{
        push: function(num){
            arr[i]=num
            i++  
        },
        pop: function(){
            var val = arr[i-1]
            arr.splice(i-1,1)
            i--
            return val;            
        }
    }
}

var stack = new Stack()
stack.push(10)
stack.push(5)
console.log(stack.pop()) // 5
console.log(stack.pop()) // 10


function Queue(){
    var arr = []
    var i = 0
    return{
        push: function(num){
            arr[i]=num
            i++  
        },
        pop: function(){
            var val = arr[0]
            arr.splice(0,1)
            return val;            
        }
    }
}

var queue = new Queue()
queue.push(1)
queue.push(2)
console.log(queue.pop()) // 1
console.log(queue.pop()) // 2