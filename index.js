
const canvas1 = document.getElementById("canvas");
const ctx = canvas1.getContext("2d");
ctx.clearRect(0,0,canvas1.width,canvas1.height);
var count=0;
var isgameStarted=0;
var animation=1;
brickarray=[];
function make_paddle(){
     ctx.fillStyle = " #66FCF1";
ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

}
function make_ball(){

     ctx.beginPath();
     ctx.arc(ball.x, ball.y, ball.size,0,2 * Math.PI);
     ctx.fillStyle = " #66FCF1";  
     ctx.fill();
}


function make_brick(){
     
   brickarray.forEach(row=>{
    row.forEach(birckk=>{
     ctx.fillStyle =birckk.visible? " #66FCF1":"transparent";
     ctx.fillRect(birckk.x, birckk.y, birckk.width, birckk.height);
     ctx.fill();
    })
   })
}
function draw_score(){
     var score="Score : "+count;
     
     ctx.font = "20px Arial";
     ctx.fillStyle=" #45A29E";
     ctx.fillText(score,590,40);
}

function make(){
     make_paddle();
     make_ball();
     make_brick();
     draw_score();
     }
 function move_paddle(){
     paddle.x+=paddle.dx;

     //WALL DETECTION
     if(paddle.x+paddle.width>canvas1.width){
          paddle.x=canvas1.width-paddle.width;
     }
     else if(paddle.x<0){
                    paddle.x=0;
     }
 }
 function move_ball(){
       ball.x+=ball.dx;
       ball.y+=ball.dy;

       // wall collision right and left
       if(ball.x+ball.size>canvas1.width||ball.x-ball.size<0){
          ball.dx*=-1;
       }
       if(ball.y-ball.size<0){
                ball.dy*=-1;
       }
       if(ball.x+ball.size>paddle.x&&ball.x-ball.size<paddle.x+paddle.width&&ball.y+ball.size>paddle.y&&ball.y-ball.size<paddle.y+paddle.height){
          console.log(ball.dy);
          ball.dy*=-1;
       }
       else if(ball.y>paddle.y+paddle.height+30){
          gameEnd();
        
       
       }      
 }
 function keydown(e){

     if(e.key==="ArrowRight"){
             isgameStarted=1;
                  paddle.dx=paddle.speed;
     }
     else if(e.key==="ArrowLeft"){
          isgameStarted=1;
                      paddle.dx=-paddle.speed;
     }
 }
 function keyup(e){
     paddle.dx=0;
 }
 function breaking_brick(){
         brickarray.forEach(row=>{
          row.forEach(brick_item=>{
              const x=brick_item.x;
              const y=brick_item.y;
              if(brick_item.visible){
                 if(ball.x-ball.size>x&&ball.x+ball.size<x+brick_item.width
                    &&ball.y+ball.size>y&&ball.y-ball.size<y+brick_item.height
                 )
                 {
                      console.log(brick_item);
                                      brick_item.visible=false;
                                      ball.dy*=-1;
                                      count++;

                 }
              }
          });
         });
     }
function gameEnd(){
     isgameStarted=0;
     if(count==45){
          $("h1").html("CONGRATULATIONS!!PRESS ANY KEY TO RESTART");
          // isgameStarted=0;
          $(document).keydown(function(){location.reload();})
     }
     else{
            animation=0;
          $("h1").html("GAME OVER!!PRESS ENTER TO RESTART");
          $("body").addClass("game-over");
          setTimeout(function() {
               $("body").removeClass("game-over");
           }, 500);
          $(document).keydown(function(e){if(e.key==="Enter")location.reload();console.log(e.key);})
     }
}
const ball={
     x:canvas1.width/2,
     y:canvas1.height/2,
     size:10,
     speed: 4,
     dx:4,dy:4

}
const paddle={
     x:canvas1.width/2-40,
     y:canvas1.height-20,
     width:80,
     height:10,
     speed:8,
     dx:0
};
const brick={
     width:70,
     height:20,
     padding:10,
offsetX:15,
    offsetY:60,
     visible:true
     
}

for(var i=0;i<5;i++){
     brickarray[i]=[];
  for(var j=0;j<9;j++){
       const x=brick.offsetX+j*(brick.width+5);
       const y=brick.offsetY+i*(brick.height+5);
  ctx.fillRect(x,y ,brick.width, brick.height);
  brickarray[i][j]={x,y,...brick};
}}

function update(){
     ctx.clearRect(0,0,canvas1.width,canvas1.height);
     move_paddle();
     make();
     if(isgameStarted)
     move_ball();
    
      breaking_brick();
     
    if(animation)
     requestAnimationFrame(update);
}

update();

//KEYBOARD FUNCTIONALITIES
document.addEventListener("keydown",keydown);
document.addEventListener("keyup",keyup);




const rule_btn=document.getElementById('rules-btn');
const collapse_btn=document.getElementById('close-btn');
const rules=document.getElementById('rules');
rule_btn.addEventListener('click',()=>{
     rules.classList.add('show');
     
})
collapse_btn.addEventListener('click',()=>{
     rules.classList.remove('show');
     
})

