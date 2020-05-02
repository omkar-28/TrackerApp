const balance = document.getElementById('balance');
const plus = document.getElementById('income');
const minus = document.getElementById('expense');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const type = document.getElementById('amountType');
const form = document.getElementById('formExp');
const transList = document.getElementById('transList');

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function addTransaction(e) {
    e.preventDefault();

    if(text.value.trim() === "" || amount.value.trim() === "" || type.value.trim() === "type" ) {
        alert("Please enter All fields");
    }else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +`${type.value.trim()}${amount.value} `
        };

        transactions.push(transaction);
        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }
}

function generateID(){
    return Math.floor(Math.random() * 100000000)
}

function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const incomes = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);

    balance.innerText = `$${total}`;
    plus.innerText = `$${incomes}`;
    minus.innerText = `$${expense}`;

}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
  
    updateLocalStorage();
  
    init();
  }

function addTransactionDOM(transaction) {
    
    const sign = transaction.amount < 0 ? '-':'+';

    const list = document.createElement('li');

    list.classList.add(transaction.amount < 0 ? 'minus':'plus');
    
    list.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)} <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button></span></li>
    `;

    transList.appendChild(list)
}

function updateLocalStorage () {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

function init() {
    transList.innerHTML = '';

    transactions.map(addTransactionDOM);
    updateValues()
}

init()

form.addEventListener('submit',addTransaction)