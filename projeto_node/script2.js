document.getElementById("id_form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;

    const escolaridadeElement = document.querySelector('input[name="escolaridade"]:checked');
    const escolaridade = escolaridadeElement ? escolaridadeElement.nextSibling.textContent.trim() : '';
    const deslocamentos = [];
    document.querySelectorAll('input[name="deslocamento"]:checked').forEach(function(checkbox) {
        deslocamentos.push(checkbox.nextSibling.textContent.trim());
    });

    const pessoa = {
        nome: nome,
        idade: idade,
        escolaridade: escolaridade,
        deslocamento: deslocamentos
    };

    console.log(pessoa);

    document.querySelector('.saida').innerHTML = `
        <p><strong>Nome:</strong> ${pessoa.nome}</p>
        <p><strong>Idade:</strong> ${pessoa.idade}</p>
        <p><strong>Escolaridade:</strong> ${pessoa.escolaridade}</p>
        <p><strong>Como se desloca:</strong> ${pessoa.deslocamento.join(', ')}</p>
    `;
});