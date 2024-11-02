//higher order function(forEach, map, filter, reduce)
// foreach --> array loop garne
/*
function sayHello(func){
    console.log('I am' )
}
sayHello(function abc())
{

}

var days = ['Sunday', 'Monday', 'Tuesday','Wednesday']
days.forEach(function(day) {
console.log(day)
})

//days.map({
//    reduce,filter
//})

todos.forEach(function(todo)
{
    console.log(todo.title)
})
var nums = [1,2,3,4,5]
var squareOfNums = []
nums.forEach(function(num){
    squareOfNums.push(num * num)
})
console.log(nums)
console.log(squareOfNums)
//map
var nums = [1,2,3,4,5]
nums.map(function(num)
{
    return 1
})
    
   var nums= [1,2,3,4,5]
   var squareOfNums =  nums.map(function(num){
    return num * num
   })
   // 1 * 1 = 1 ---> [1,4,9,16,25]
   console.log(squareOfNums)
   var datas= [
   {
    firstName : "Manish",
    lastName : "Basnet"
   }, 
   {
   firstName: "New",
   lastName:"York"
   }
   ]
   var result = datas.map(function(data)
{
 //   return 'Manish'
 return {
firstName : data.firstName,
lastName : data.lastName,
fullName : data.firstName + data.lastName
//name: "Manish"
 }
})
console.log(datas)
console.log(result)
/*
 var newDatas= [
    {
        firstName: "Manish",
   lastName:"Basnet",
   fullName: "Manish Basnet"
    }
    {
        firstName: "New",
   lastName:"York",
   fullName:"New York"
    }
    
 ]

var nums = [1,2,3]
 var output = nums.map(function(num)
return {
    text : "Pnc",
    num : 0
})
var foods = [
    {
        name : "momo",
        price : 120,
        qty : 4
    }
]
var result = foods.map(function(food){
    console.log(food)
    return {
        ...data,
        //name: foods.name
 total : food.prize * food.qty   }
})
var nums = [1,2,3,4,5,6,7,8,9,10]
nums.filter(function(num){
    return num % 2 == 0
})
console.log(evenNums)
var files= ['index.css', 'index.c', 'index.html','index.js']
var result = files.filter(function(file)
{
    return file.endsWith(".js")

})
console.log(result)
var foods = [
    {
    name:"momo",
    price : 150,
    qty : 4
},
{
    name:"chowmein",
    price: 120,
    qty: 4
}
]
var result = foods.filter(function(food){
    return food.price == 150
})
console.log(result)
var students = [
    {
        name : 'Anish',
        status : 'pass'
    },
    {
        name : 'Anyol',
        status : 'pass'
    },
    {
        name: 'Oup',
        status : 'active'

    }

]
// wap display status pass hune and name ends with sh
const op = students.filter(function(student)
{
    return student.status === 'pass' && student.name.endsWith('sh')
})
  console.log(op)
  
 // reduce
 var nums = [1,2,3,4,5]
 nums.reduce(function(accumulator, num){
return num + accumulator
},0) //accumulator value initiate 0
/*
accumulator = 0 
return 1 + 0 = 1
accumulator = 1
return 2 + 1 = 3 
acc = 3
return 3 + 3 = 6
acc = 6
return 4 + 6 = 10
acc = 10
return 5 + 10 = 15
acc = 15


console.log(sum)
*/
var cart = [
    {
        name : "watch",
        price: 18999,
        qty: 1

    },
    {
        name : "gamepad",
        price : 2479,
        qty : 1
    }

]
/*
{
    totalAmount: 123123,
    totalQty: 123
}
    */
const op = cart.reduce(function(accumulator,item)
{
    accumulator.totalAmount = item.price * item.qty * accumulator.totalAmount
accumulator.totalQty = item.qty + accumulator.totalQty
return accumulator
},
{totalAmount:70, totalQty:7})
console.log(op)
/* acc.totalAmount= 10*7+0 = 70
acc.totalQty = 7 + 0
*/