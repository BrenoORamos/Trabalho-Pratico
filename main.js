// Implementação da estrutura de dados fila
class Queue {
    constructor() {
      this.items = [];
    }
  
    enqueue(element) {
      this.items.push(element);
    }
  
    dequeue() {
      if (this.isEmpty()) {
        return null;
      }
      return this.items.shift();
    }
  
    front() {
      if (this.isEmpty()) {
        return null;
      }
      return this.items[0];
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  
    size() {
      return this.items.length;
    }
  }
  
  // Fila para armazenar os pedidos
  let orderQueue = new Queue();
  
  // Referências aos elementos do DOM
  const orderForm = document.getElementById('order-form');
  const orderInput = document.getElementById('order-input');
  const orderList = document.getElementById('order-list');
  const serveButton = document.getElementById('serve-button');
  
  // Função para gerar uma senha numérica
  // Variável para controlar a contagem das senhas
let passwordCount = 1;

// Função para gerar uma senha numérica em ordem crescente
function generatePassword() {
  const password = passwordCount.toString().padStart(4, '0');
  passwordCount++;
  return password;
}

  
  // Função para adicionar um novo pedido à fila
  function addOrder(event) {
    event.preventDefault(); // Impede o recarregamento da página
  
    const order = {
      password: generatePassword(), // Gera uma senha numérica para o pedido
      orderItem: orderInput.value.trim() // Obtém o valor do input e remove espaços em branco desnecessários
    };
  
    if (order.orderItem !== '') {
      orderQueue.enqueue(order); // Adiciona o pedido à fila
      renderOrderList(); // Atualiza a exibição da fila de pedidos
      orderInput.value = ''; // Limpa o input
    }
  }
  
  // Função para remover um pedido da fila
  function removeOrder() {
    orderQueue.dequeue(); // Remove o pedido do início da fila
    renderOrderList(); // Atualiza a exibição da fila de pedidos
  }
  
    // Função para atender um pedido da fila
    function serveOrder() {
    if (!orderQueue.isEmpty()) {
      const servedOrder = orderQueue.dequeue();
      const alertMessage = `Senha: ${servedOrder.password}<br>Pedido: ${servedOrder.orderItem}`;
      document.getElementById('alert-message').innerHTML = alertMessage;
      $('#alert-modal').modal('show');
      renderOrderList(); // Atualiza a exibição da fila de pedidos
    }
  
    // Verifica se a fila está vazia após atender o pedido
    if (orderQueue.isEmpty()) {
      resetQueue(); // Reinicia a fila
    }
  }
  // Função para reiniciar a fila
    function resetQueue() {
    orderQueue = new Queue(); // Cria uma nova fila vazia
    passwordCount = 1; // Reinicia a contagem das senhas
  }
  // Função para renderizar a fila de pedidos no DOM
  function renderOrderList() {
    orderList.innerHTML = ''; // Limpa a lista atual de pedidos
  
    // Adiciona cada pedido à lista como um item de lista
    orderQueue.items.forEach((order) => {
      const listItem = document.createElement('li');
      listItem.className = 'order-item list-group-item';
      listItem.innerHTML = `<strong>Senha:</strong> ${order.password}<br><strong>Pedido:</strong> ${order.orderItem}`;
  
      orderList.appendChild(listItem);
    });
  
    if (orderQueue.isEmpty()) {
      const listItem = document.createElement('li');
      listItem.className = 'order-item list-group-item';
      listItem.textContent = 'Não há pedidos na fila.';
  
      orderList.appendChild(listItem);
    }
  }
  
  // Adiciona um listener de evento ao formulário para chamar a função addOrder no envio do formulário
  orderForm.addEventListener('submit', addOrder);
  
  // Adiciona um listener de evento ao botão "Atender Pedido" para chamar a função serveOrder
  serveButton.addEventListener('click', serveOrder);
  
  
  