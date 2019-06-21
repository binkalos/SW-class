window.onload = init;
function init(){
        document.getElementById("myForm").onsubmit = cal;
}
function cal(){
    var volume;
    var radius = document.getElementById("radius").value;

    if(radius>0){
        radius = Math.abs(radius);
        volume = (4/3)*Math.PI * Math.pow(radius,3);
        volume = volume.toFixed(2);
        document.getElementById("volume").value = volume;
        return false;
    }
    else{
        alert("반지름은 양수 입니다!");
        document.getElementById("radius").value="";
    }
}