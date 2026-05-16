transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addToLocalStorage(key, value) {
  localStorage.setItem(key, ((localStorage.getItem(key).parseInt() || 0) - sum).toString())
}

function addTransaction(sum, category, date, comment) {
  if (sum == 0) return;
  if (sum < 0) addToLocalStorage("expenses", -sum);
  else if (sum > 0) addToLocalStorage("income", sum);
  addToLocalStorage("balance", sum);
  transactions.push({ sum, category, date, comment });
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
}

function editTransaction(index, val) {
  if (val.sum) transactions[index].sum = val.sum;
  if (val.category) transactions[index].category = val.category;
  if (val.date) transactions[index].date = val.date;
  if (val.comment) transactions[index].comment = val.comment;
}

function listTransactions(filter, sortby, order) { // order == true means ascending order, order == false means descending order
  return transactions.filter((val) => {
    (filter.category ? val.category == filter.category : true) &&
    (filter.type == "expenses" ? val.sum < 0 : (filter.type == "income" ? val.sum > 0 : true)) &&
    (filter.mindate ? val.date > mindate : true) &&
    (filter.maxdate ? val.date < maxdate : true)
  }).sort((a, b) => {
    sortby == "category" ? (a.category > b.category) == order :
    sortby == "sum" ? (a.sum > b.sum) == order :
    sortby == "date" ? (a.date > b.date) == order : false;
  });
}

function stats() {
  return {
    expenses: localStorage.getItem("expenses"),
    income: localStorage.getItem("income"),
    balance: localStorage.getItem("balance")
  }
}

function exportCsv() {
  return transactions.reduce((acc, val) => {
    acc += `${val.sum},${val.category},${val.date},${val.comment}\n`
  }, "");
}