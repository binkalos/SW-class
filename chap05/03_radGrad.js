window.onload = init;

function init(){
    var canvas = document.querySelector("canvas");
    var context = canvas.getContext("2d");
    var r, cx, cy, radgrad;
    var running = null;
    canvas.onclick = function(){
        if(running){ // 실행되고 있다면
            window.clearInterval(running);
            running = null;
        } else { // 실행되고 있지 않다면
            running = window.setInterval(function(){
                context.fillStyle = 'rgba(255, 255, 255, 0.5)';
                context.fillRect(0, 0, canvas.width, canvas.height);
                // 패턴으로 변하며 원의 반지름은 random하게 얻어와 random한 위치에 그린다.
                for(var i=0; i<300; i+=15){
                    cx = Math.random()*canvas.width;
                    cy = Math.random()*canvas.height;
                    r = Math.random()*canvas.width/10.0;

                    // 그라디언트 정의. 색은 15씩 증가하며 그린다.
                    radgrad = context.createRadialGradient(0+(r*0.15), 0-(r*0.25), r/3.0, 0, 0, r);
                    radgrad.addColorStop(0.0, 'hsl('+i+', 100%, 75%');
                    radgrad.addColorStop(0.9, 'hsl('+i+', 100%, 50%');
                    radgrad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
                    //원을 그리기
                    // 이전의 속성들의 초기화 값들을 캔버스가 다시 그려질때마다 초기화 시키기는 불가능
                    // 따라서 캔버스에서 애니메이션을 구현하고 싶다면 save()와 restore()는 필수다!
                    context.save(); // save()명령 이전의 속성을 설정 -> 스냅샷을 찍는다.
                    context.translate(cx, cy); // context를 cx, cy만큼 이동하기
                    // canvas를 아예 cx, cy좌표로 이동시켜버림ㄷㄷ
                    context.beginPath();
                    context.moveTo(0+r, 0);
                    context.arc(0, 0, r, 0, Math.PI*2.0, 0); // 그래서 0,0이어도 다른 위치에 나타남
                    // x, y, r, start angle(0), end angle(360), 시계방향?
                    // degree(0,90,180,360)
                    // radian(Math.PI->180, Math.PI+2->360)
                    context.fillStyle = radgrad;
                    context.fill(); // 원을 채움
                    context.restore(); // 기본값으로 다시 되돌린다.
                }
            }, 1000); // end of setInterval Function
        } // end of else
    } // end of onclick function
}