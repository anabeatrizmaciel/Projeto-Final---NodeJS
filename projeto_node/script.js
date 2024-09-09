document.getElementById("id_form").addEventListener("submit", function(event) {
    event.preventDefault();

    const form = document.getElementById("id_form");
    const formData = new FormData(form); //API que permite criar um objeto contendo os dados do formulário

    fetch('/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.querySelector('.saida').innerHTML = data;
        console.log("Dados enviados e salvos com sucesso");
    })
    .catch(error => console.error('Erro:', error));
});
