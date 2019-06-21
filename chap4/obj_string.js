window.onload = init;
var id_input="";
var count;
var output;

function init(){
    document.getElementById("myForm").onsubmit = check;
}

function check(){
    document.getElementById("id_input").Value;
    count = id_input.length;
    if(count < 6){
        alert("아이디는 6글자 이상이어야 합니다.");
        reset;
    }
    else{
        //서버 전송
    }
}
function reset(){
    document.getElementById("id_input").Value = "";
}
