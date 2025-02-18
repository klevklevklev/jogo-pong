// Variáveis da bolinha (posição e tamanho)
let xBall = 300;
let yBall = 200;
let diameter = 25;

// Variáveis da raquete (posição, tamanho e largura)
let xRacket = 5;
let yRacket = 150;
let widthRacket = 10;
let heightRacket = 90;

// Variável do Git
let collisionGit = false;

// Variável raquete do oponente
let OpponentXRacket = 585;
let OpponentYRacket = 150;
let OpponentYSpeed;

// Variável com o placar do jogo
let Points = 0;
let OpponentPoints = 0;

// Função para movimentar a raquete para cima e baixo
function racketMoviment() {
    if (keyIsDown(UP_ARROW)) {
        yRacket -= 8;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRacket += 8;
    }
    yRacket = constrain(yRacket, 5, height - heightRacket);
}

// Definindo o raio do círculo para colisão
let ray = diameter / 2;

// Velocidade da bolinha
let speedBallx = 5;
let speedBally = 5;

// Disposição da tela
function setup() {
    createCanvas(600, 400);
}

// Função da raquete
function racket1(x, y) {
    rect(x, y, widthRacket, heightRacket);
}

// Cria a bolinha
function ball() {
    circle(xBall, yBall, diameter);
}

// Definindo a velocidade para bolinha de acordo com os eixos
function movimentBall() {
    xBall += speedBallx;
    yBall += speedBally;
}

// Função para as colisões em cada eixo
function collision() {
    if (xBall + ray > width || xBall - ray < 0) {
        speedBallx *= -1;
    }
    if (yBall + ray > height || yBall - ray < 0) {
        speedBally *= -1;
    }
}

// Função para ajustar a hitbox da bolinha quando bater na raquete
function racketCollision() {
    if (xBall - ray < xRacket + widthRacket && yBall - ray < yRacket + heightRacket && yBall + ray > yRacket) {
        speedBallx *= -1;
    }
}

// Função que utiliza a biblioteca para detectar colisão
function racketCollisionGit(x, y) {
    collisionGit = collideRectCircle(x, y, widthRacket, heightRacket, xBall, yBall, ray);
    if (collisionGit) {
        speedBallx *= -1;
    }
}

// Função para movimentar a raquete do oponente
function OpponentRacketMoviment() {
    OpponentYSpeed = yBall - OpponentYRacket - heightRacket / 2 - 47;
    OpponentYRacket += OpponentYSpeed;
    OpponentYRacket = constrain(OpponentYRacket, 5, height - heightRacket);
}

// Função para exibir o placar
function scoreText(pont1, pont2) {
    fill(255);
    textSize(20);
    textAlign(CENTER);
    text(pont1, width / 2 - 30, 28);
    text(pont2, width / 2 + 30, 28);
}

// Função para atualizar os pontos
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

// Função para resetar a posição da bolinha após um ponto
function resetBall() {
    xBall = width / 2;
    yBall = height / 2;
    speedBallx *= -1;
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
    racketCollisionGit(xRacket, yRacket);
    racketCollisionGit(OpponentXRacket, OpponentYRacket);
    OpponentRacketMoviment();
    scorePoints();
    scoreText(Points, OpponentPoints);
}
