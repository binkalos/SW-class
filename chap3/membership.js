window.onload = init;
var type;
var years;//전역변수
function init(){
    document.getElementById("myForm").onsubmit = calculate;
}
function calculate(){
    type = document.getElementById("type").value;
    type = document.getElementById("years").value;
}