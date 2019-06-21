window.onload = init;

function init(){
document.getElementById("link").onclick = windowOpen;
}
function windowOpen(){
    var popup = window.open("popupB.html","width=500 hright=300 resizable=1");

    if((popup!==null) && (!popup.closed)){
        popup.focus();//팝업창 쪽으로 포커싱 됨(횔성화)
        return false;
    }
}