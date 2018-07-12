var http = require('http');
var express = require('express');

var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.get("/", function(requisicao, resposta) {
    resposta.render("pac");
});

app.get("/jogo", function (requisicao, resposta) {
    resposta.render("pagina");
});

app.use(express.static('./public/css'));
app.use(express.static('./public/js'));
app.use(express.static('./public/images'));

var server = http.createServer(app);
server.listen(8080);

console.log("beleza campeao...");
/*
function trataSol(requisicao, resp) {
    if (requisicao.url == '/1') {
        fs.readFile('home.html', 'utf8', function read(err, data) {
            resp.write(data);
            //resp.write("oi");
            resp.end();
        });
    }
    else if (requisicao.url == '/2') {
        fs.readFile('pagseg.html', 'utf8', function read(err, data) {
            resp.write(data);
            //resp.write("oi");
            resp.end();
        });
    }
    else if (requisicao.url == '/3') {
        fs.readFile('sobra.html', 'utf8', function read(err, data) {
            resp.write(data);
            //resp.write("oi");
            resp.end();
        });
    }
    else{
        fs.readFile('oi.css', 'utf8', function read(err, data) {
            resp.write(data);
            //resp.write("oi");
            resp.end();

        });
    }
}

var meuCoisa = http.createServer(trataSol);
meuCoisa.listen(8080);
*/