window.onload = init;
//전역변수(함수밖에 써야 전역변수/ 여러 함수가 같이 쓸 수 있음)
var task_arr = [];
function init(){
 document.getElementById("theForm").onsubmit = addTask;
}//init

function addTask(){
    task = document.getElementById("task").value;

    if(task){//task가 존재하는 경우라는 뜻
        task_arr[task_arr.length] = task;//push로 쓰려면=> task_arr.push(task)
        message = "해야 할 일" + task_arr.length + "개가 있습니다.";
        document.getElementById("output").innerHTML = message;
        for(var i = 0;i<task_arr.length;i++){
            
        }//for
        
    }//if
    return false;
}//addtask