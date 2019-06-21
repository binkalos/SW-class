var a = 10;
alert(typeof(a));   //a의 타입 정수(int)같은거 없고 자바스크립트는 전부 number로 알아들음

 a = 11.7;//형변환
 alert(typeof(a));

var now = new Date();
alert(typeof(now));//시간

message = now.toString();
alert(message);
