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
  localStorage.setItem(key, (parseInt(localStorage.getItem(key)) + sum).toString())
}

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  renderTransactions();
}

function renderTransactionStats() {
  ["expenses", "income", "balance"].forEach((key) => {
    document.getElementById(key).textContent = `${localStorage.getItem(key)} руб.`;
  });
}

function saveTransactionStats(sum, newSum) {
  if (sum == 0) return;
  else if (sum < 0) addToLocalStorage("expenses", -newSum);
  else if (sum > 0) addToLocalStorage("income", newSum);
  addToLocalStorage("balance", newSum);
  renderTransactionStats();
}

function addTransaction(data) {
  saveTransactionStats(parseInt(data.sum), parseInt(data.sum));
  transactions.push(data);
  saveTransactions();
}

function deleteTransaction(index) {
  saveTransactionStats(transactions[index].sum, -transactions[index].sum);
  transactions.splice(index, 1);
  saveTransactions();
}

function editTransaction(index, val) {
  if (val.sum) {
    saveTransactionStats(transactions[index].sum, -transactions[index].sum + val.sum);
    transactions[index].sum = val.sum;
  }
  if (val.category) transactions[index].category = val.category;
  if (val.date) transactions[index].date = val.date;
  if (val.comment) transactions[index].comment = val.comment;
  saveTransactions();
}

function renderTransactions() { // order == true means ascending order, order == false means descending order
  const filteredTransactions = transactions.slice(0, (page + 1)*50).filter((val) => {
    return (filter.category ? val.category == filter.category : true) &&
    (filter.type == "expenses" ? val.sum < 0 : (filter.type == "income" ? val.sum > 0 : true)) &&
    (filter.mindate ? val.date > filter.mindate : true) &&
    (filter.maxdate ? val.date < filter.maxdate : true)
  }).sort((a, b) => {
    return sortby == "category" ? (a.category > b.category) == order :
    sortby == "sum" ? (a.sum > b.sum) == order :
    sortby == "date" ? (a.date > b.date) == order : false;
  });
  document.getElementById("transactions").innerHTML = filteredTransactions.slice(page*50, (page + 1)*50).map((val, i) => {
    return `<tr>
      <th>${val.date}</th>
      <th>${val.category}</th>
      <th>${val.sum}</th>
      <th>${val.comment}</th>
      <th><a onclick="deleteTransaction(${i})">Удалить</a></th>
    </tr>`
  }).join("\n");
}

function changePage(newPage) {
  page = newPage;
  document.getElementById("page").textContent = page.toString();
  renderTransactions();
}

function changeSortby(newSortby) {
  console.log(123);
  if (sortby === newSortby) {
    sortby = null;
    renderTransactions();
  } else {
    sortby = newSortby;
    renderTransactions();
  }
}

function exportCsv() {
  const csv = transactions.reduce((acc, val) => {
    return acc + `${val.sum},${val.category},${val.date},${val.comment}\n`
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
  const data = Object.fromEntries(new FormData(e.target).entries());
  if (data.type == "expenses") data.sum = -data.sum;
  addTransaction(data);
  document.getElementById("addTransactionForm").reset();
});