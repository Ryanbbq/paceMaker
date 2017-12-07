function add(x, y) {
    var sum = x + y; 
    return sum; 
}
function multiply(a,b){
    var m = a * b;
    return m;
}
/*
function subtraction(ii ,iii){
    var s = ii - iii;
    console.log(s);
    return s;
}*/
//module.exports.subtraction = subtraction;
module.exports.add = add; 
module.exports.multiply = multiply;