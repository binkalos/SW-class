window.onload = init;
var type;
var years;//전역변수
function init(){
    document.getElementById("myForm").onsubmit = calculate;
}
function calculate(){
    type = document.getElementById("type").value;
    years = document.getElementById("years").value;

    switch(type){
        case 'basic':cost=10000;break;
        case 'premium':cost=15000;break;
        case 'gold':cost=20000;break;
        case 'platium':cost=25000;break;
    }
    cost =cost*years;

    if(years>=2){
        cost*=0.8;
    }
    document.getElementById("cost").value = cost + "원";
    return false;
}