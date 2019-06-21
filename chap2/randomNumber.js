window.onload = init;//전통적인 이베느 발생->윈도우(global object)열리면
function init(){//초기화 함수 => 변수선언,html요소 읽어오기

   button1 =  document.getElementById("button1"); //alert(button1);
   button2 =  document.getElementById("button2"); //alert(button2);
   result = document.getElementById("result");

    button1.onclick = function(){
       result.innerHTML =  parseInt(Math.random()*10+1);
    }
    button2.onclick = function(){
        result.innerHTML = parseInt(Math.random()*100+1);
    
    }
}