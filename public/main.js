/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
const form = document.getElementById('form');
const minhaTabela = document.querySelector('#minha-tabela');

async function addDataToTable() {
  const response = await fetch('http://localhost:3777/funcionario');
  const data = await response.json();
  const dadosFormatados = data.map((element) => {
    return {
      nome_completo: element.nome_completo,
      data_admissao: new Date(element.data_admissao)
        .toLocaleString('pt-BR')
        .slice(0, 10),
      salario: `R$: ${element.salario.toFixed(2)}`,
      data_pagamento: new Date(element.data_pagamento)
        .toLocaleString('pt-BR')
        .slice(0, 10),
      desempenho: element.desempenho,
      bonificacao: `R$: ${element.bonificacao.toFixed(2)}`,
    };
  });
  const dataTable = new DataTable(minhaTabela, {
    data: dadosFormatados,
    columns: [
      { data: 'nome_completo' },
      { data: 'data_admissao' },
      { data: 'salario' },
      { data: 'data_pagamento' },
      { data: 'desempenho' },
      { data: 'bonificacao' },
      {
        data: null,
        render: (_, __, rowData) => {
          return `<button class="btn-primary" onclick="editarLinha(${
            (rowData.id, dataTable)
          })">Editar</button>`;
        },
      },
      {
        data: null,
        render: (_, __, rowData) => {
          return `<button class="btn-primary" onclick="excluirLinha(${
            (rowData.id, dataTable)
          })">Excluir</button>`;
        },
      },
    ],
  });
}
addDataToTable();

async function editarLinha(id, dataTable) {
  const linha = dataTable.row(`#${id}`).node();
  console.log(linha);

  // Extrair os dados da linha
  const nomeCompleto = linha.cells[0].innerText;
  const dataAdmissao = linha.cells[1].innerText;
  const salario = linha.cells[2].innerText;
  const dataPagamento = linha.cells[3].innerText;
  const desempenho = linha.cells[4].innerText;
  const bonificacao = linha.cells[5].innerText;
}

function calcularBonificacao() {
  const funcionario = {
    matricula: Number(form.matricula.value),
    nome_completo: String(form.nome.value),
    data_admissao: new Date(form.admissao.value),
    salario: Number(form.salario.value),
    data_pagamento: new Date(form.data_pagamento.value),
    desempenho: Number(form.desempenho.value),
    bonificacao: 0,
  };

  const dataAtual = new Date();

  const tempoDeEmpresa =
    dataAtual.getFullYear() - new Date(funcionario.data_admissao.getFullYear());

  const bonificacaoCalculada =
    funcionario.salario * 0.02 * tempoDeEmpresa * funcionario.desempenho;

  form.bonificacao.value = bonificacaoCalculada;

  funcionario.bonificacao = Number(bonificacaoCalculada);

  fetch('http://localhost:3777/funcionario', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(funcionario),
  }).then(() => addDataToTable());
}
