window.addEventListener('load', function(){

  let drawer = new mdc.drawer.MDCTemporaryDrawer(document.querySelector('.mdc-temporary-drawer'));
    document.getElementById('menu').addEventListener('click', () => drawer.open = true);

  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext("2d");

  var x = canvas.width/2;
  var y = canvas.height-30;
  var dx = 2;
  var dy = -2;
  var ballRadius = 10;

// Width = 720 & Heigth = 400

  var paddleHeight = 10;
  var paddleWidth = 90;
  var paddleX = (canvas.width-paddleWidth)/2;
  var rightPressed = false;
  var leftPressed = false;

  var brickRowCount =9;
  var brickColumnCount = 9;
  var brickWidth = canvas.width/10;
  var brickHeigth = canvas.height/20;
  var brickPadding = 5;
  var brickOffSetTop = 25;
  var brickOffSetLeft =15;
  var brickOffSetRight =15;
  var bricks = [];

  var score = 0;
  var lives = 3;

  document.addEventListener("keydown",keyDownHandler, false);
  document.addEventListener("keyup",keyUpHandler, false);


  for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
      bricks[c][r]= {x:0, y:0, status: 1};
    }
  }


  function drawBricks() {
    for(c = 0; c < brickColumnCount; c++) {
      for(r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status == 1) {
            var brickX = (c*(brickWidth + brickPadding))+brickOffSetLeft;
            var brickY = (r*(brickHeigth + brickPadding))+brickOffSetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX,brickY,brickWidth,brickHeigth);
            ctx.fillStyle = "#613C7F"
            ctx.fill();
            ctx.closePath();
        }
      }
    }
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#613C7F";
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle() {
      ctx.beginPath();
      ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
      ctx.fillStyle = "#613C7F";
      ctx.fill();
      ctx.closePath();
  }

  function drawScore() {
      ctx.font = "1.5em Arial";
      ctx.fillStyle = 'black';
      ctx.fillText("Score: "+score, 12, 20);
  }
  function drawLives() {
      ctx.font = "1.5em Arial";
      ctx.fillStyle = 'black';
      ctx.fillText("Lives: "+lives, canvas.width-100, 20);
  }

  function collisionDetection() {
      for(c = 0; c < brickColumnCount; c++) {
          for(r = 0; r < brickRowCount; r++) {
              var brick = bricks[c][r];
              if (brick.status == 1) {
                if(x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeigth) {
                  dy = -dy;
                  brick.status = 0;
                  score++;
                  if (score == brickRowCount*brickColumnCount) {
                    alert('GRATTIS DU KLARADE LEVEL 1!');
                    document.location.reload();

                    }
                 }
              }
          }
      }
  }

  function move() {
        ctx.clearRect (0,0,canvas.width, canvas.height);
        drawBall()
        drawPaddle();
        drawBricks();
        drawScore();
        drawLives();
        collisionDetection();


        if(y + dy < ballRadius ){
          dy = - dy;
        }
          else if(y + dy > canvas.height-ballRadius){
            if (x > paddleX && x < paddleX + paddleWidth) {
              dy = -dy;
            }
            else {
              lives--;
              if (!lives) {
                alert('GAME OVER!!');
                document.location.reload();
              }
              else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
              }
          }
        }
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if(rightPressed && paddleX < canvas.width-paddleWidth){
          paddleX += 7;
        }
        else if(leftPressed && paddleX > 0){
          paddleX += -7;
        }
        x += dx;
        y += dy;
  }

  function keyDownHandler(e) {
      if(e.keyCode == 39) {
          rightPressed = true;
      }
      else if(e.keyCode == 37) {
          leftPressed = true;
      }
  }
  function keyUpHandler(e) {
      if(e.keyCode == 39) {
          rightPressed = false;
      }
      else if(e.keyCode == 37) {
          leftPressed = false;
      }
  }
setInterval (move, 12);
});
