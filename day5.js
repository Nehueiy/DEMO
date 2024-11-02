var data = {
    name: "Neha Bashyal",
    age: 19,
    location: "Chitwan"
}
console.log(data['name'])
//for in
/*
for (let JS in data)
{
    console.log(JS)
}
   for (let key in data)
   {
    console.log(data[key])
   }
    array vitra object hunxa ki hudaina
    object vitra array huna sakxa ki sakdaina
    hunxa
    
   var todos = [
   {
    "userId": 1,
    "id": 1,
    "title": "deltectus aut autem",
   "completed": false
   },
]
for (let todo of todos)
{
    console.log(todo)
}
    
//function
console.log(1+2)
//sendmail feature
// register gardaa mail janu paryo, forgotpassword, announcement
//sendmail function
// REGULAR FUNCTION , ARROW FUNCTION
function sayHello()
{
    console.log("Hello")
    console.log("Hello")
}
sayHello()
sayHello()
*/
function sayHello(name)
{
    console.log("Hello Im" +name)
    
}
var sayHello = () =>console.log("Helloi")
//sayHello('youo')
function addTwoNumbers(num1,num2)
{
    console.log(num1+num2)

}
addTwoNumbers(19,70)
//parameter, argument
//function pov, kehi magiraxa vane --> parameter
//function call garda POV, pathaune kura --> argument
var foods = ['chowmein', 'momo', 'burger']
var streetFoods = ['chatpate', 'panipuri', 'momo']
//chowmein, momo, burger --> using function
function loopFoods(foodsArray)
{
 for(let food of foods)
    {
        console.log(food)
    }  
}

loopFoods(foods)
loopFoods(streetFoods)

