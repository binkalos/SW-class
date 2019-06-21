window.onload = init;
//전역변수(함수밖에 써야 전역변수/ 여러 함수가 같이 쓸 수 있음)
var task_arr = [];
var i;
function init(){
 document.getElementById("theForm").onsubmit = addTask;
}//init

function addTask(){
    task = document.getElementById("task").value;

    if(task){//task가 존재하는 경우라는 뜻
        task_arr[task_arr.length] = task;//push로 쓰려면=> task_arr.push(task)
        message = "해야 할 업무" ;
        document.getElementById("output").innerHTML = message;
        for(i = 0;i<task_arr.length;i++){
            document.getElementById("tasking").innerHTML +=  "<li>" +task_arr[i]+  "</li>";
        }//for
    }//if
    return false;
}//addtask