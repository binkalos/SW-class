window.onload = init;

function init() {
    document.getElementById("myForm").onsubmit = sortWords;
}

function sortWords() {
    var words = document.getElementById("words").value;
    output = document.getElementById("output");

    original = words.split(' ');// array
    words = words.toLowerCase(); // string
    words = words.split(' '); // array
    
    for(var i=0; i<original.length; i++){
        if(original[i].toLowerCase()==words[i])
            words[i]=original[i];
    }
    var sorted = words.sort(); // array
    sorted = sorted.join(' - '); // string
    output.innerHTML = sorted;
    return false;
}