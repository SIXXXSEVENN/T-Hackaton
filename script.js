let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let filter = {};
let sortby = undefined;
let order = true;
let page = 0;

window.onload = (event) => {
  ["expenses", "income", "balance"].forEach((key) => {
    if (localStorage.getItem(key) === null) localStorage.setItem(key, '0');
  });
  renderTransactionStats();
  renderTransactions();
};

function addToLocalStorage(key, sum) {
  localStorage.setItem(key, parseInt(localStorage.getItem(key) - sum).toString())
}

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  renderTransactions();
}

function renderTransactionStats() {
  ["expenses", "income", "balance"].forEach((key) => {
    document.getElementById(key).textContent = localStorage.getItem(key);
  });
}

function saveTransactionStats(sum) {
  console.log(sum);
  if (sum == 0) return;
  else if (sum < 0) addToLocalStorage("expenses", -sum);
  else if (sum > 0) addToLocalStorage("income", sum);
  addToLocalStorage("balance", sum);
  renderTransactionStats();
}

function addTransaction(data) {
  console.log(data);
  saveTransactionStats(parseInt(data.sum));
  transactions.push(data);
  saveTransactions();
}

function deleteTransaction(index) {
  saveTransactionStats(-transactions[index].sum);
  transactions.splice(index, 1);
  saveTransactions();
}

function editTransaction(index, val) {
  if (val.sum) {
    saveTransactionStats(-transactions[index].sum + val.sum);
    transactions[index].sum = val.sum;
  }
  if (val.category) transactions[index].category = val.category;
  if (val.date) transactions[index].date = val.date;
  if (val.comment) transactions[index].comment = val.comment;
  saveTransactions();
}

function renderTransactions() { // order == true means ascending order, order == false means descending order
  const filteredTransactions = transactions.slice(0, (page + 1)*50).filter((val) => {
    (filter.category ? val.category == filter.category : true) &&
    (filter.type == "expenses" ? val.sum < 0 : (filter.type == "income" ? val.sum > 0 : true)) &&
    (filter.mindate ? val.date > mindate : true) &&
    (filter.maxdate ? val.date < maxdate : true)
  }).sort((a, b) => {
    sortby == "category" ? (a.category > b.category) == order :
    sortby == "sum" ? (a.sum > b.sum) == order :
    sortby == "date" ? (a.date > b.date) == order : false;
  });
  document.getElementById("transactions").innerHTML = filteredTransactions.slice(page*50, (page + 1)*50).map((val) => {
    `<li>Sum: ${val.sum} Category: ${val.category} Date: ${val.date} Comment: ${comment}</li>`
  });
}

function changePage(newPage) {
  page = newPage;
  renderTransactions();
}

function exportCsv() {
  const csv = transactions.reduce((acc, val) => {
    acc += `${val.sum},${val.category},${val.date},${val.comment}\n`
  }, "");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "transactions.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const addTransactionForm = document.getElementById("addTransactionForm");
addTransactionForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  addTransaction(Object.fromEntries(formData.entries()));
});