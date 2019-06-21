window.onload = init();
function init(){
    document.getElementById("theForm").onsubmit = employee;
   }
   //폼을 제출하면 employee를 실행
   //emplyee 함수는 새로운 객체 생성한다.
function employee(){
   lastname =  document.getElementById("lastName").value;
   firstname = document.getElementById("firstName").value;
   department = document.getElementById("department").value;
   today = new Date();//입사한 날짜를 오늘 날짝로 생성
    var s = {
        성 : lastname,
        이름 : firstname,
        부서 : department,
        고용일 : today.toDateString()
  };
      var output='';
      output = "<h1>추가된 사원</h1>";
      with(s){
      output +='이름 : '+ 성 +',' + 이름 +'<br>';
      output +='부서 : '+ 부서 + '<br>';
      output +='고용일 : '+ 고용일 + '<br>';
      }
      document.getElementById("output").innerHTML=output;
     // alert(output);

     return false;
    }
