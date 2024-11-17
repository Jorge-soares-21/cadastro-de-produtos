const formproduto = document.getElementById("form-produto");
const listaProdutos =document.getElementById("lista-produtos");
//localStorage.removeItem("produtos");
//let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
//localStorage.setItem("produtos", JSON.stringify(produtos));


//função para exibir os produtos na tabela
function exibirProdutos() {
    listaProdutos.innerHTML = "";
    produtos.forEach((produto, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${produto.nome}</tr>
            <td>R$ ${parseFloat(produto.preco).toFixed(2)}</td>
            <td>${produto.descricao}</td>
            <td>
                <button onclick="editarProduto(${index})">Editar</button>
                <button onclick="excluirProduto(${index})">Excluir</button>
                </td>
        `;
        listaProdutos.appendChild(tr);
    });
}

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
//função para adicionar um novo produto
formproduto.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const preco = document.getElementById("preco").value;
    const descricao = document.getElementById("descricao").value;

    if (nome && preco && descricao) {
        const produto = {nome, preco, descricao };
        produtos.push(produto);
        localStorage.setItem("produtos", JSON.stringify(produtos));
        exibirProdutos();
        document.getElementById("nome").value = "";
        document.getElementById("preco").value = "";
        document.getElementById("descricao").value ="";
        formProduto.reset();
        localStorage.setItem("produtos", JSON.stringify(produtos));
  

    
    }

});

// função para editar um produto
function editarProduto(index) {
    const produto = produtos[index];
    document.getElementById("nome").value = produto.nome;
    document.getElementById("preco").value = produto.preco;
    document.getElementById("descricao").valeu = produto.descricao;

    // remover o produto atual para poder substituir por um atualizado
    produtos.splice(index, 1);
    localStorage.setItem("produtos", JSON.stringify(produtos));

    // atualizar a tabela
    exibirProdutos();
}

// função para excluir um produto
function excluirProduto(index) {
    produtos.splice(index, 1);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    exibirProdutos();
}

// carregar produtos ao iniciar a página
document.addEventListener("DOMContentLoaded", exibirProdutos);
