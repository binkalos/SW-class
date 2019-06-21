window.onload = init;

function init(){
    document.getElementById("myForm").onsubmit = sortWords;
}

function sortWords(){
    var words = document.getElementById("words").value;
    var output = document.getElementById("output");

    words = words.toLowerCase(); //전부 소문자로 바꾸겠다. (string)
    words = words.split(" "); //array (자동으로 배열로 저장이 된다.)
    var sorted = words.sort(); //array
    sorted = sorted.join(" - "); //string
    
    output.innerHTML = sorted;
    return false;
}