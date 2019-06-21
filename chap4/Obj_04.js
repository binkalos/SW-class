window.onload = init;

var canvas;
var ctx;
var stuff = []; //도형이 담겨있는 배열
var thingInMotion; //마우스 다운 대상 -> 드래그 하려고 하는 대상

function init() {
    //html5에서 처음 소개
    //화면에 2d그림을 그린다.    
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    var r1 = new Rect(0,0,50,30,"red");
    //r1.draw();
    var r2 = new Rect(70,0,150,20,"pink");
    //r2.draw();
    var r3 = new Rect(0,50,40,30,"blue");
    //r3.draw();
    var r4 = new Rect(200,50,100,100,"yellow");
    //r4.draw();

    var c1 = new Circle(50,150,50,"green");
    var c2 = new Circle(200,200,30,"gray");
    var c3 = new Circle(170,120,25,"cyan");
    //c1.draw();

    stuff.push(r1);
    stuff.push(r2);
    stuff.push(r3);
    stuff.push(r4);

    stuff.push(c1);
    stuff.push(c2);
    stuff.push(c3);

    drawStuff();//그리기 전용 함수 - 한번에 그리기

     //캔버스 더블클릭 -> makeNewItem 함수 실행
    canvas.addEventListener("dblclick", makeNewItem, false); //false(기본값)/true /또는 안씀 >> 더블클릭, 복사
    canvas.addEventListener("mousedown", startDrag, false); //마우스 선택, 드래그 //mousedown : 마우스를 누르는 동안
   
}//init

function Rect(x, y, width, height, color) { // 생성자 함수를 이용한 객체 선언
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    //오버라이딩
    this.draw = function drawRect() {
        ctx.fillStyle = this.color; //canvas의 api
        ctx.fillRect(this.x, this.y, this.width, this.height); //canvas의 api
    }//drawRect

    //마우스 관련 이벤트 선언예정 = 마우스 좌표(mx, my)

    this.overCheck = function overRect(mx, my) {
        if((this.x <= mx && mx <= this.x+this.width) && (this.y <= my && my <= this.y + this.height)) {
             //this는 중요하다
            //마우스가 나를 선택함
            return true;
        }//if
         else {
            return false;
        }//else
    }//overRect
}//rect

function Circle(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;

    //오버라이딩
    this.draw = function drawCircle() { //오버라이딩 (this.drawCircle = function())
        ctx.fillStyle = this.color;
        ctx.beginPath(); //원은 패스 (한덩어리) - 패스시작
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2.0, true);
        ctx.closePath(); //패스 끝
        ctx.fill();
    }//drawCircle

    this.overCheck = function overCircle(mx,my) {
        //(x,y)에서 마우스 지점까지의 거리

        var x1 = this.x;
        var y1 = this.y;
        var x2 = mx;
        var y2 = my;

        if(((x2-x1)*(x2-x1))+((y2-y1)*(y2-y1)) <= (this.r * this.r)) {
            return true;
        }//if 
        else {
            return false;
        }//else
    }//overCircle
}//drawCircle

//객체를 캔버스에 지우기 -> 그리기
function drawStuff() {
    ctx.clearRect(0,0,800,600); //깨끗하게~
    ctx.strokeStyle = "black";  //선 다시그리기
    ctx.lineWidth = "1px";
    ctx.strokeRect(0,0,800,600);
    for(i = 0; i<stuff.length; i++) {
        stuff[i].draw();
    }//for i
}//drawstuff

//캔버스의 기본원리: 매번 새로그린다~ 모두다~

function makeNewItem(e) { //더블클릭했다는 이벤트가 넘어옴
    mx = e.offsetX; //offsetX, offsetY : 브라우저가 가지고 있는 속성값 (마우스 X, Y 좌표)
    my = e.offsetY;

    var item; //복사할 대상을 가르키는 임시 변수

    for(i =0; i<stuff.length; i++) {
        if(stuff[i].overCheck(mx, my) == true) { //대상?
            //복사를 실제로 수행하는 함수 -> clone
            item = clone(stuff[i]);
            item.x += 50; //.x : 브라우저속성값 - 대상의 x 좌표
            item.y += 50; 
            stuff.push(item);
            break;
        }//if
    }//for i
    
    drawStuff();
}//makeNewItem

function clone(obj) {
    var newItem = new Object();
    for(var info in obj) {
        newItem[info] = obj[info];
    }
    return newItem;
}//clone

function startDrag(e) {
    mx = e.offsetX;
    my = e.offsetY;

    for(var i = 0; i <stuff.length; i++) {
        if(stuff[i].overCheck(mx, my) == true) {
            //일정한 간격 유지 -> 오프셋 저장 (끈끈이 효과)
            diffx = mx-stuff[i].x;
            diffy = my-stuff[i].y;
            //누구를 moveit할지 moveit함수한테 알려줘!
           
            var item = stuff[i];
            thingInMotion = stuff.length-1;

            stuff.splice(i,1);
            stuff.push(item);

            //mousemove => 따라가라!!!!
            canvas.addEventListener("mousemove", moveit, false);
            //mouseup => 도형은 캔버스에 떨어져라!!!!
            canvas.addEventListener("mouseup", dropit, false);
        }
    }
}//startDrag

function moveit(e) {
    mx = e.offsetX;
    my = e.offsetY;

    stuff[thingInMotion].x = mx - diffx;
    stuff[thingInMotion].y = my - diffy;

    drawStuff();
}

function dropit(e) {
    canvas.removeEventListener("mousemove", moveit, false); //이벤트 제거
    canvas.removeEventListener("mouseup", dropit, false); //이벤트 제거
} 

function draw() {
    var ctx = document.getElementById('canvas').getContext('2d');
    ctx.font = '48px serif';
    ctx.strokeText('뿅뿅', 80, 80);
  }
/*function Smiledraw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
       var ctx = canvas.getContext('2d');
  
      ctx.beginPath();
      ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
      ctx.moveTo(110, 75);
      ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
      ctx.moveTo(65, 65);
      ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
      ctx.moveTo(95, 65);
      ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
      ctx.stroke();
    }
}*/

/*window.onload = init;
var canvas;
var ctx;
var stuff= [];//도형이 담겨있는 배열
function init(){
    //html 5에 처음 소개
    //화면에 2d그림 그린다
    canvas = document.getElementById("canvas");
    ctx =  canvas.getContext("2d");

    var r1 = new Rect(100,550,50,30,"red");
    var r2 = new Rect(600,450,150,20,"pink");
    var r3 = new Rect(200,200,30,30,"blue");
    var r4 = new Rect(0,0,100,100,"yellow");
    var c1 = new Circle(590,150,50,"green");
    var c2 = new Circle(230,100,30,"gray");
    var c3 = new Circle(170,200,25,"cyan");
    
    stuff.push(r1);
    stuff.push(r2);
    stuff.push(r3);
    stuff.push(r4);
    stuff.push(c1);
    stuff.push(c2);
    stuff.push(c3);

    drawStuff();//그리기 전용 함수

    //캔버스를 더블클릭 했을때 makeNewItem이라는 함수를 실행시키겠다고 함
    canvas.addEventListener('dbclick',makeNewItem,false);

   // c1.draw();//draw메서드 오버라이딩
   

}
function Rect(x,y,w,h,color){ 
    this.x = x;
    this.y = y; 
    this.w = width;
    this.h = height;
    this.color = color;
    this.draw = function drawRect(){//동일한draw메서드를 가지고 다른 일을 함
        //메서드 오버라이딩
        //다형성
            ctx.fillStyle = this.color;//canvas의 api 이미 만들어져있음
            ctx.fillRect(this.x,this.y,this.w,this.h);//canvas의 api 이미 만들어져있음
    }
    //마우스 관련 이벤트 선언예정 마우스 좌표(mx,my)
    this.overCheck = function overRect(mx,my){
        
        if((this.x<=mx && mx<=this.x+this.w) && (this.y<=my && my<=this.y+this.h)){
            //마우스가 나를 선택했구나
            return true;
        }
        else{
            return false;
        }
    } //마우스가 사각형 위에 있는지 체크하는 메소드
}

function Circle(x,y,r,c){
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;

    this.draw = function drawCircle(){//동일한draw메서드를 가지고 다른 일을 함
        //메서드 오버라이딩
        //다형성
        ctx.fillStyle = this.c;
        ctx.beginPath();
        ctx.arc(this.x,this.y,r,0,Math.PI*2.0,true);
        ctx.closePath();
        ctx.fill();
    }
    this.overCheck = function overCircle(mx,my){
        var x1 = this.x;
        var x2 = this.y;
        var x2 = mx;
        var y2 = my;
        if(((x2-x1)*(x2-x1)) + ((y2-y1)*(y2-y1))<=(this.r*this.r)){
            //마우스가 나를 선택했구나
            return true;
        }
        else{
            return false;
        }
    } //마우스가 원 위에 있는지 체크하는 메소드
}
function drawStuff(){//객체를 캔버스에 clearRect를 통해 지우고 그리고 지우고 그리고를 반복해서 그리는 일
    ctx.clearRect(0,0,800,600);
    ctx.strokeStyle="black";
    ctx.lineWidth="1px";
    for(i=0;i<stuff.length;i++){
        stuff[i].draw();
    }
}

function makeNewItem(e){//더블클릭했다는 이벤트e가 넘어온다.
    mx = e.offsetX;//offsetX =>속성값(마우스의 x좌표)
    my = e.offsetY;
    var item;//복사할 대상
    for(i = 0;i<stuff.length;i++){
        if(stuff[i].overCheck(mx,my) == true){// 대상이니???
            //복사를 실제로 수행하는 함수=>clone
            item=clone(stuff[i]);
            item.x += 50;//.x , .y => 속성(대상의 x좌표, y좌표)
            item.y += 50;//조금씩 떨어진 자리에 복사됨
            stuff.push(item);
            break;
        }
    }
    drawStuff();    
}

function clone(obj){
    var newItem = new Object();
    //객체를 복사하는 코드 
    for(var info in obj){
        newItem[info] = obj[info];//객체가 같는 모든 키와 value값을 복사해라~~
    }
    return newItem;

}*/
////////////////////////////////////////////////////////////////////////
/*
window.onload = init;

var canvas;
var ctx;
var stuff = [];
var thingInMotion;//마우스다운 대상=>드래그 하려고 하는 대상

function init() {
    //html5에서 처음 소개
    //화면에 2d그림을 그린다.    
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    var r1 = new Rect(0,0,50,30,"red");
    //r1.draw();
    var r2 = new Rect(70,0,150,20,"pink");
    //r2.draw();
    var r3 = new Rect(0,50,40,30,"blue");
    //r3.draw();
    var r4 = new Rect(200,50,100,100,"yellow");
    //r4.draw();

    var c1 = new Circle(50,150,50,"green");
    var c2 = new Circle(200,200,30,"gray");
    var c3 = new Circle(170,120,25,"cyan");
    //c1.draw();

    stuff.push(r1);
    stuff.push(r2);
    stuff.push(r3);
    stuff.push(r4);

    stuff.push(c1);
    stuff.push(c2);
    stuff.push(c3);

    drawStuff();//그리기 전용 함수 - 한번에 그리기

     //캔버스 더블클릭 -> makeNewItem 함수 실행
    canvas.addEventListener("dblclick", makeNewItem, false); //false(기본값)/true /또는 안씀
    //마우스 선택(마우스 누르는 동안), 드래그 
    canvas.addEventListener("dblclick", startDrag, false);

   
}

function Rect(x, y, width, height, color) { // 생성자 함수를 이용한 객체 선언
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    //오버라이딩
    this.draw = function drawRect() {
        ctx.fillStyle = this.color; //canvas의 api
        ctx.fillRect(this.x, this.y, this.width, this.height); //canvas의 api
    }

    //마우스 관련 이벤트 선언예정 = 마우스 좌표(mx, my)

    this.overCheck = function overRect(mx, my) {
        if((this.x <= mx && mx <= this.x+this.width) && (this.y <= my && my <= this.y + this.height)) { //this는 중요하다
            //마우스가 나를 선택함
            return true;
        } else {
            return false;
        }
    }
}

function Circle(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;

    //오버라이딩
    this.draw = function drawCircle() { //오버라이딩 (this.drawCircle = function())
        ctx.fillStyle = this.color;
        ctx.beginPath(); //원은 패스 (한덩어리) - 패스시작
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2.0, true);
        ctx.closePath(); //패스 끝
        ctx.fill();
    }

    this.overCheck = function overCircle(mx,my) {
        //(x,y)에서 마우스 지점까지의 거리

        var x1 = this.x;
        var y1 = this.y;
        var x2 = mx;
        var y2 = my;

        if(((x2-x1)*(x2-x1))+((y2-y1)*(y2-y1)) <= (this.r * this.r)) {
            return true;
        } else {
            return false;
        }
    }
}

//객체를 캔버스에 지우기 -> 그리기
function drawStuff() {
    ctx.clearRect(0,0,800,600); //깨끗하게~
    ctx.strokeStyle = "black";  //선 다시그리기
    ctx.lineWidth = "1px";
    ctx.strokeRect(0,0,800,600);
    for(i = 0; i<stuff.length; i++) {
        stuff[i].draw();
    }
}
//캔버스의 기본원리: 매번 새로그린다~ 모두다~

function makeNewItem(e) { //더블클릭했다는 이벤트가 넘어옴
    mx = e.offsetX; //offsetX, offsetY : 브라우저가 가지고 있는 속성값 (마우스 X, Y 좌표)
    my = e.offsetY;

    var item; //복사할 대상을 가르키는 임시 변수

    for(i =0; i<stuff.length; i++) {
        if(stuff[i].overCheck(mx, my) == true) { //대상?
            //복사를 실제로 수행하는 함수 -> clone
            item = clone(stuff[i]);
            item.x += 50; //.x : 브라우저속성값 - 대상의 x 좌표
            item.y += 50; 
            stuff.push(item);
            break;
        }
    }
    
    drawStuff();
}

function clone(obj) {
    var newItem = new Object();
    for(var info in obj) {
        newItem[info] = obj[info];
    }
    return newItem;
}
function startDrag(e){//이벤트 넘어오는 e
    mx = e.offsetX; //offsetX, offsetY : 브라우저가 가지고 있는 속성값 (마우스 X, Y 좌표)
    my = e.offsetY;

    for(i =0; i<stuff.length; i++) {
        if(stuff[i].overCheck(mx, my) == true) { //대상이니?
        //일정한 간격 유지=>오프셋 저장
        //이런걸 끈끈이 효과라고 함
            difx = mx-stuff[i].x;
            dify = my-stuff[i].y;
            //누구를 moveit할지 moveit함수한테 알려줘야함
            var item = stuff[i];
            thingInMotion = stuff.length-1;
            stuff.splice(i,1);
            stuff.push(item);
            //=>위에 네줄을 통해 선택한 도형을 배열의 맨 끝방으로 옮겨진다.
        //마우스를 누른 상태에서 움직이는 이벤트 발생하면 따라가는 함수 실행->mousemove
        canvas.addEventListener("mousemove",moveit);
        //마우스를 때면 캔버스로 도형 떨어진다 ->mouseup
        canvas.addEventListener("mouseup",dropit);
         }
    }       
}
function moveit(e){
    mx = e.offsetX; //offsetX, offsetY : 브라우저가 가지고 있는 속성값 (마우스 X, Y 좌표)
    my = e.offsetY;
    stuff[thingInMotion].x = mx - difx;
    stuff[thingInMotion].y = my - dify;
    drawStuff();
}

function dropit(e){
    canvas.removeEventListener("mousemove",moveit,false);//이벤트 제거를 함
    canvas.removeEventListener("mouseup",dropit,false);//이벤트 제거 역활
}*/

////////////////////////////////////////////////