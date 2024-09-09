const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const folderName = './LOG';
const logFileName = path.join(folderName, 'ALUNO.LOG');

// Middleware para interpretar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Serve arquivos estáticos (HTML, CSS)
app.use(express.static(__dirname));

// Verifica se a pasta LOG existe, se não, cria
if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
}

// Serve o arquivo index.html na raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para processar os dados do formulário
app.post('/submit', (req, res) => {
    const { nome, idade, sexo, cidade, escolaridade } = req.body;
    const alunoData = `Nome: ${nome}, Idade: ${idade}, Sexo: ${sexo}, Cidade: ${cidade}, Escolaridade: ${escolaridade}\n`;

    // Checa se o arquivo ALUNO.LOG existe, se não, cria
    fs.appendFile(logFileName, alunoData, (err) => {
        if (err) {
            console.error('Erro ao gravar os dados no arquivo:', err);
            res.status(500).send('Erro ao salvar os dados');
        } else {
            console.log('Dados salvos com sucesso!');
            // Renderiza o HTML com a mensagem de confirmação
            res.send(`
                <html>
                    <head>
                        <title>Confirmação</title>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body {
                                font-family: 'Poppins', sans-serif;
                                background-color: #81b3e3;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                height: 100vh;
                                margin: 0;
                            }
                            .confirmation {
                                border: 5px solid #4c82c6;
                                border-radius: 6px;
                                background-color: #b5e3ff;
                                padding: 20px;
                                text-align: center;
                            }
                            p {
                                color: #4c82c6;
                                font-weight: 600;
                            }
                            a {
                                text-decoration: none;
                                font-weight: bold;
                                color: #4c82c6;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="confirmation">
                            <p>OK, DADOS SALVOS</p>
                            <p><a href="/">Voltar ao formulário</a></p>
                        </div>
                    </body>
                </html>
            `);
        }
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
