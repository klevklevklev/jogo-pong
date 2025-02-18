// Variáveis da bolinha (posição e tamanho)
let xBall = 300;
let yBall = 200;
let diameter = 25;
let ray = diameter / 2;

// Velocidade da bolinha
let speedBallx = 5;
let speedBally = 5;

// Variáveis da raquete do jogador
let xRacket = 5;
let yRacket = 150;
let widthRacket = 10;
let heightRacket = 90;

// Variáveis da raquete do oponente
let OpponentXRacket = 585;
let OpponentYRacket = 150;
let OpponentYSpeed;

// Variáveis do placar
let Points = 0;
let OpponentPoints = 0;

// Setup inicial do jogo
function setup() {
  createCanvas(600, 400);
}

// Função que desenha a bolinha
function ball() {
  circle(xBall, yBall, diameter);
}

// Função que movimenta a bolinha
function movimentBall() {
  xBall += speedBallx;
  yBall += speedBally;
}

// Função para detectar colisão com as bordas
function collision() {
  if (xBall + ray > width || xBall - ray < 0) {
    speedBallx *= -1;
  }
  if (yBall + ray > height || yBall - ray < 0) {
    speedBally *= -1;
  }
}

// Função para desenhar a raquete
function racket1(x, y) {
  rect(x, y, widthRacket, heightRacket);
}

// Função para movimentar a raquete do jogador
function racketMoviment() {
  if (keyIsDown(UP_ARROW)) {
    yRacket -= 8;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRacket += 8;
  }
  yRacket = constrain(yRacket, 5, 310);
}

// Função para detectar colisão da bolinha com a raquete
function racketCollision() {
  if (xBall - ray < xRacket + widthRacket &&
      yBall - ray < yRacket + heightRacket &&
      yBall + ray > yRacket) {
    speedBallx *= -1;
  }
}

// Função para movimentar a raquete do oponente
function OpponentRacketMoviment() {
  OpponentYSpeed = yBall - OpponentYRacket - heightRacket / 2 - 57.4;
  OpponentYRacket += OpponentYSpeed;
  OpponentYRacket = constrain(OpponentYRacket, 5, 310);
}

// Função para exibir o placar
function scoreText() {
  fill(255);
  textSize(20);
  text(Points, 278, 28);
  text(OpponentPoints, 321, 28);
}

// Função para contar os pontos
function scorePoints() {
  if (xBall > width - 15) {
    Points += 1;
    resetBall();
  }
  if (xBall < 15) {
    OpponentPoints += 1;
    resetBall();
  }
}

// Função para resetar a posição da bolinha após ponto
function resetBall() {
  xBall = width / 2;
  yBall = height / 2;
  speedBallx *= -1;
}

// Função para detectar colisão da bolinha com a raquete do oponente
function opponentRacketCollision() {
    if (xBall + ray > OpponentXRacket &&
        yBall - ray < OpponentYRacket + heightRacket &&
        yBall + ray > OpponentYRacket) {
      speedBallx *= -1;  // inverte a direção da bolinha
    }
  }

// Função principal do jogo
function draw() {
  background(0);
  ball();
  movimentBall();
  collision();
  racket1(xRacket, yRacket);
  racket1(OpponentXRacket, OpponentYRacket);
  racketMoviment();
  racketCollision();
  OpponentRacketMoviment();
  opponentRacketCollision();
  scorePoints();
  scoreText();
}
