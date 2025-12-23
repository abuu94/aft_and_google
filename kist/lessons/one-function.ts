function getName():string{
    let firstName:string = "Abubakar";
    let lastName:string = "Omar";
    return firstName + " " + lastName;
}

console.log("Your Full name is: ",getName());


function getFriends(firtfriend:string,secondfriend:string):string{
    let friends = firtfriend + " and " + secondfriend;
    return  friends
}

console.log("My Friends are: ",getFriends("Mohd","Omar"));


function getPets(pet1:string,pet2:string):void{
    let friends = pet1 + " and " + pet2;
    console.log(friends);
}

getPets("Pussy Cat","Bull Dog");


console.log("=== Exercise and Practices :=== ");

function add(a:number,b:number):number{
    let result=a+b;
    return result;
}
function toTitleCase(text:string):string{
    let result = text.toUpperCase();
    return result;
}
function repeatText(text:string,times:number):string{
    let result = text.repeat(times);
    return result;
}
console.log(add(2, 3));
console.log(toTitleCase("hello world"));
console.log(repeatText("Hi", 3));
