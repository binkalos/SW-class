window.onload = init;

var today;
var message;
var output;

function init(){
    output = document.getElementById("output"); 

    today = new Date();
    message = "오늘의 날짜는" + today.toLocaleDateString() + "시간은" + 
    today.getHours(); + ":" + today.getMinutes();

    if(output.textContent!=undefined){
        output.textContent = message;
    }
    else{
        output.innerText = message;
    }
}