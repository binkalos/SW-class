window.onload = init();
var today,interval,uni;
var one_day =  24*60*60*1000;
function init(){
 document.getElementById("theForm").onsubmit = day;
}

function day(){
   date =  document.getElementById("date").value;//구입날짜
   uni = new Date(date).getTime();//구입날짜의 유닉스 시간
   today = new Date().getTime();
   interval = Math.floor(today-uni)/one_day;
    if(interval<31){
       alert("교환이 가능합니다.");
    }else{
       alert("교환기간이 지났습니다.");
    }
}