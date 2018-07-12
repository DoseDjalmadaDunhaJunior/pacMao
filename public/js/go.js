var cnv = document.querySelector("canvas");
var ctx = cnv.getContext("2d");

//variaveis abaixo cervem para facilitar na hora de usar HEIGHT e WIDTH
var WIDTH = cnv.width, HEIGHT = cnv.height;

// para facilitar na hora de indentificar o botao de apertar
var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

// para poder apertar e soltar os direcionais
var mvLeft = mvUp = mvRight = mvDown = false;

// espacos do ctx ficando assim dos corredores por exemplo
var espaco = 30;
var auxMove = 50;

//para saber quando acabou as comidas
var iaux = 0;

//da linha 21 a 55 apenas para carregar imagens
var verm = new Image();
verm.src = "red.png"
verm.addEventListener("load", function () {
},false);

var aberto = new Image();
aberto.src = "aberto.png";
aberto.addEventListener("load",function(){
},false);

var preto = new Image();
preto.src = "bandido.png";
preto.addEventListener("load",function(){
},false);

var yuri = new Image();
yuri.src = "gay.png";
yuri.addEventListener("load",function(){
},false);

var nada = new Image();
nada.src = "nada.png";
nada.addEventListener("load",function(){
},false);

var comida = new Image();
comida.src = "comida.png";
comida.addEventListener("load",function(){
},false);

var azul = new Image();
azul.src = "blue.png";
azul.addEventListener("load",function(){
    requestAnimationFrame(main,cnv);
},false);


//salva as posicoes do mapa onde tem parede
var paredes = [];

//da linha 62 a 154 faz um objeto para cada personagem e comida
var pac = {
    x: espaco + 625,
    y: espaco + 270,
    width: 28,
    height: 28,
    velocidade: 2

};

var red = {
    x: espaco + 1,
    y: espaco + 1,
    batx: Math.floor(Math.random() * 4),
    
    width: 28,
    height: 28,
    velocidade: 2

};

var blue = {
    x: espaco + 1250,
    y: espaco + 1,
    batx: Math.floor(Math.random() * 4),
    
    width: 28,
    height: 28,
    velocidade: 2

};

var branco = {
    x: espaco + 1,
    y: espaco + 510,
    batx: Math.floor(Math.random() * 4),
    width: 28,
    height: 28,
    velocidade: 2


};

var  piroca = {
    x: espaco + 1250,
    y: espaco + 510,
    batx: Math.floor(Math.random() * 4),
    width: 28,
    height: 28,
    velocidade: 2

};

var food1 = {
    x: espaco + 5,
    y: espaco + 50,
    batx: 0,
    width: 15,
    height: 15

};

var food2 = {
    x: espaco + 1265,
    y: espaco + 50,
    batx: 0,
    width: 15,
    height: 15

};

var food3 = {
    x: espaco + 5,
    y: espaco + 470,
    batx: 0,
    width: 15,
    height: 15

};

var food4 = {
    x: espaco + 1265,
    y: espaco + 470,
    batx: 0,
    width: 15,
    height: 15

};

//labirinto sendo 1 as paredes e 0 espacos vazios
var labirinto = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,0,1,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,0,1,1,0,1,0,1,1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,1,0,1,1,1,1,1,0,1],
    [1,0,1,1,1,1,1,0,1,1,0,1,0,1,1,0,1,1,1,0,0,0,1,1,0,0,0,1,1,1,0,1,0,1,0,1,1,0,1,1,1,1,1,0,1],
    [1,0,1,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,0,1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,1,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,1,0,1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,0,0,1,0,0,0,0,1,1,1,1,1,0,1],
    [1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,0,0,1,1,0,0,0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,0,1,0,1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

//aqui salvamos os numeros 1(paredes) no vetor declarado acima
for(var lin in labirinto) {
    for (var column in labirinto[lin]) {
        var celula = labirinto[lin][column];
        if (celula == 1) {
            var cerca = {
                x: espaco * column,
                y: espaco * lin,
                width: espaco,
                height: espaco
            };
            paredes.push(cerca);
        }
    }
}

//cria funcao para apertar e soltar teclas
window.addEventListener("keydown",aperta,false);
window.addEventListener("keyup",solta,false);

//apertar
function aperta(e){
    var key = e.keyCode;
    switch(key){
        case LEFT:
            mvLeft = true;
            break;
        case UP:
            mvUp = true;
            break;
        case RIGHT:
            mvRight = true;
            break;
        case DOWN:
            mvDown = true;
            break;
    }
}

//soltar
function solta(e){
    var key = e.keyCode;
    switch(key){
        case LEFT:
            mvLeft = false;
            break;
        case UP:
            mvUp = false;
            break;
        case RIGHT:
            mvRight = false;
            break;
        case DOWN:
            mvDown = false;
            break;
    }
}

//funcao para se um pato encostar no pac
function bate_pac(pat,pac){
    var X = (pat.x + pat.width / 2) - (pac.x + pac.width / 2);
    var Y = (pat.y + pat.height / 2) - (pac.y + pac.height / 2);

    var larg = (pat.width + pac.width) / 2;
    var altura = (pat.height + pac.height) / 2;

    if (Math.abs(X) < larg && Math.abs(Y) < altura) {
        return 1;
    }

}

//funcao para o pato nao passar direto pela parede
function bate_Pato(pat,parEd) {
    var X = (pat.x + pat.width / 2) - (parEd.x + parEd.width / 2);
    var Y = (pat.y + pat.height / 2) - (parEd.y + parEd.height / 2);

    var larg = (pat.width + parEd.width) / 2;
    var altura = (pat.height + parEd.height) / 2;

    if (Math.abs(X) < larg && Math.abs(Y) < altura) {
        var emx = larg - Math.abs(X);
        var emy = altura - Math.abs(Y);

        if (emx > emy) {

            if (Y > 0) {
                pat.y += emy;
            }
            else {
                pat.y -= emy;
            }
        }
        else {
            if (X > 0) {
                pat.x += emx;
            }
            else {
                pat.x -= emx;
            }
        }
    }
}

//funcao move patos de acordo com o botao que voce aperta para mover o pac(de uma forma parcialemnte aleatoria)
function moveVerm(pat){

    if(mvLeft && !mvRight){
        if(pat.batx == 0) {
            pat.x -= pat.velocidade;
        }
        else if(pat.batx == 1){
            pat.x += pat.velocidade;
        }
        else if(pat.batx == 2){
            pat.y += pat.velocidade;
        }
        else if(pat.batx == 3){
            pat.y -= pat.velocidade;
        }

    } else
    if(mvRight && !mvLeft){
        if(pat.batx == 0) {
            pat.y -= pat.velocidade;
        }
        else if(pat.batx == 1){
            pat.y += pat.velocidade;
        }
        else if(pat.batx == 2){
            pat.x += pat.velocidade;
        }
        else if(pat.batx == 3){
            pat.x -= pat.velocidade;
        }

    }
    if(mvUp && !mvDown){
        if(pat.batx == 0) {
            pat.x += pat.velocidade;
        }
        else if(pat.batx == 1){
            pat.x -= pat.velocidade;
        }
        else if(pat.batx == 2){
            pat.y -= pat.velocidade;
        }
        else if(pat.batx == 3){
            pat.y += pat.velocidade;
        }
        
    } else
    if(mvDown && !mvUp){
        if(pat.batx == 0) {
            pat.x -= pat.velocidade;
        }
        else if(pat.batx == 1){
            pat.x += pat.velocidade;
        }
        else if(pat.batx == 2){
            pat.y += pat.velocidade;
        }
        else if(pat.batx == 3){
            pat.y -= pat.velocidade;
        }

    }

}



//mover o pato vermelho
function updatePato1() {
    for (var i in paredes) {
        var cerca = paredes[i];
        bate_Pato(red, cerca);
    }
    moveVerm(red);
    return bate_pac(red, pac);
}
//mover o pato azul
function updatePato2() {
    var boix = blue.x;
    blue.x -= blue.velocidade;
    var Y = blue.y;
    for (var i in paredes) {
        //chama a funcao para saber se bateu na parede
        var cerca = paredes[i];
        bate_Pato(blue, cerca);
    }
    //move "alatorio"
    moveVerm(blue);
    //retorna para ver se bateu no pac se bateu ele sai da funcao principal(masma coisa aos posteriores)
    return bate_pac(blue, pac);
}

//mover o pato preto
function updatePato3() {
    var Y = branco.y;
    branco.y -= branco.velocidade;
    var X = branco.x;
    for (var i in paredes) {
        var cerca = paredes[i];
        bate_Pato(branco, cerca);
    }
    moveVerm(branco);
    return bate_pac(branco, pac);

}

//mover o pato rosa
function updatePato4() {
    var boiy = piroca.y;
    var X = piroca.x;
    piroca.y -= piroca.velocidade;
    for (var i in paredes) {
        var cerca = paredes[i];
        bate_Pato(piroca, cerca);
    }
    moveVerm(piroca);
    return bate_pac(piroca, pac);

}

//para saber se o pato esta batendo na parede e se estiver para-lo
function bateParede(pac,parEd){
    //calcula ate qual pixel vai
    var X = (pac.x + pac.width/2) - (parEd.x + parEd.width/2);
    var Y = (pac.y + pac.height/2) - (parEd.y + parEd.height/2);

    //calcula a area
    var largura = (pac.width + parEd.width)/2;
    var altura = (pac.height + parEd.height)/2;

    //essa linha ja afirma estar tendo colisao
    if(Math.abs(X) < largura && Math.abs(Y) < altura){
        var emx = largura - Math.abs(X);
        var emy = altura - Math.abs(Y);
        // nas linhas de baixo ve em qual eixo bate e repele o pac do mesmo
        if(emx > emy){
            pac.y = Y > 0 ? pac.y + emy : pac.y - emy;
        } else {
            pac.x = X > 0 ? pac.x + emx : pac.x - emx;
        }
    }
}

//funcao para saber se pegou a comida boa parte é igual a funcao anterior
function comunismo(pac,vegetal) {
    var X = (vegetal.x + vegetal.width / 2) - (pac.x + pac.width / 2);
    var Y = (vegetal.y + vegetal.height / 2) - (pac.y + pac.height / 2);

    var larg = (vegetal.width + pac.width) / 2;
    var altura = (vegetal.height + pac.height) / 2;
//aqui ele joga a imagem para fora do canvas e soma 1 ao iaux (explicado a cima)
    if (Math.abs(X) < larg && Math.abs(Y) < altura) {
        vegetal.x = 9000;
        vegetal.y = 9000;
        iaux += 1;
    }
}

//faz a acao para o botao movimento apertado sendo o ! uma oposicao
function update(){
    if(mvLeft && !mvRight){
        pac.x -= pac.velocidade;
        pac.srcY = auxMove + pac.height * 2;
    } else
    if(mvRight && !mvLeft){
        pac.x += pac.velocidade;
        pac.srcY = auxMove + pac.height * 3;
    }
    if(mvUp && !mvDown){
        pac.y -= pac.velocidade;

        pac.srcY = auxMove + pac.height * 1;
    } else
    if(mvDown && !mvUp){
        pac.y += pac.velocidade;

        pac.srcY = auxMove + pac.height * 0;
    }

    //ve ponto a ponto se bateu na parede
    for(var i in paredes){
        var cerca = paredes[i];
        bateParede(pac,cerca);
    }
    // para cada objeto ele ve se foi engolido
    comunismo(pac,food1);
    comunismo(pac,food2);
    comunismo(pac,food3);
    comunismo(pac,food4);
}


//mostrar na tela tudo
function renderiza(){
    //limpar o caminho feito pelos personagens
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    // anda no vetor feito anteriormente para saber onde é parede
    for(var lin in labirinto){
        for(var column in labirinto[lin]){
            var celula = labirinto[lin][column];
            var x = column*espaco;
            var y = lin*espaco;
            if(celula === 1){
                ctx.fillRect(x,y,espaco,espaco);
            }
        }
    }
    //aparecimento de cada imagem
    ctx.drawImage(aberto, pac.x, pac.y, pac.width, pac.height);
    ctx.drawImage(verm, red.x, red.y, red.width, red.height);
    ctx.drawImage(azul, blue.x, blue.y, blue.width, blue.height);
    ctx.drawImage(preto, branco.x, branco.y, branco.width, branco.height);
    ctx.drawImage(yuri, piroca.x, piroca.y, piroca.width, piroca.height);
    ctx.drawImage(comida, food1.x, food1.y, food1.width, food1.height);
    ctx.drawImage(comida, food2.x, food2.y, food2.width, food2.height);
    ctx.drawImage(comida, food3.x, food3.y, food3.width, food3.height);
    ctx.drawImage(comida, food4.x, food4.y, food4.width, food4.height);
}

//main infito ate perder ou ganhar
function main(){
    update();
    if(updatePato1() == 1 || updatePato2() == 1 || updatePato3() == 1 || updatePato4() == 1) {
        alert("Vode perdeu !!!!");
        return;
    }
    if(iaux == 4){
        alert("parabens voce ganhou!!!");
        return;
    }
    renderiza();
    requestAnimationFrame(main,cnv);

}
