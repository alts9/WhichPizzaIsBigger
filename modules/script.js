import { Pizza } from "./object.js";

const elements = (() => {
  const pizzaList = document.querySelector(".pizzaList");
  const addRow = document.querySelector(".addRow");
  const addButton = document.querySelector(".addButton");
  const checkboxCrust = document.getElementById("checkboxCrust");
  const checkboxPrice = document.getElementById("checkboxPrice");
  const popular1 = document.getElementById("popular1");
  const popular2 = document.getElementById("popular2");
  const popular3 = document.getElementById("popular3");
  const popular4 = document.getElementById("popular4");
  const popular5 = document.getElementById("popular5");
  const table = document.querySelector("table");
  let allDelete = document.querySelectorAll(".deleteButton");
  let allShownPizza = document.querySelectorAll(".pizza");
  let allDiameter = document.querySelectorAll(".diameterInput");
  let allQuantity = document.querySelectorAll(".quantityInput");
  let allPrice = document.querySelectorAll(".priceInput");
  return {
    pizzaList,
    addRow,
    allDelete,
    allShownPizza,
    allDiameter,
    allQuantity,
    allPrice,
    addButton,
    checkboxCrust,
    checkboxPrice,
    table,
    popular1,
    popular2,
    popular3,
    popular4,
    popular5,
  };
})();

function generalEvent() {
  //some use onclick because
  elements.addButton.onclick = () => addNewPizza();
  elements.checkboxCrust.onclick = () => toggleCrust();
  elements.checkboxPrice.onclick = () => togglePrice();
  elements.popular1.onclick = () => showPopularPizza([12, 2, 0], [18, 1, 0]);
  elements.popular2.onclick = () => showPopularPizza([16, 1, 0], [18, 1, 0]);
  elements.popular3.onclick = () => showPopularPizza([12, 2, 0], [16, 1, 0]);
  elements.popular4.onclick = () => showPopularPizza([8, 4, 0], [16, 1, 0]);
  elements.popular5.onclick = () => showPopularPizza([8, 2, 0], [12, 1, 0]);
}

//#region toggle display
function togglePrice() {
  elements.checkboxPrice.classList.contains("checked")
    ? toggleColumns(11, 13, 5, 6, "none")
    : toggleColumns(11, 13, 5, 6, "table-cell");
  elements.checkboxPrice.classList.toggle("checked");
}

function toggleCrust() {
  elements.checkboxCrust.classList.contains("checked")
    ? toggleColumns(7, 9, 3, 4, "none")
    : toggleColumns(7, 9, 3, 4, "table-cell");
  elements.checkboxCrust.classList.toggle("checked");
}

function toggleColumns(col1, col2, col1b, col2b, status) {
  toggleHeaderColumn(col1, status);
  toggleHeaderColumn(col2, status);
  //hide pizza
  togglePizzaColumn(col1b, status);
  togglePizzaColumn(col2b, status);
  //hide from last row(add pizza row)
  toggleAddColumn(col1, status);
  toggleAddColumn(col2, status);
}

function toggleHeaderColumn(col, status) {
  let headerRow = elements.table.childNodes[1].childNodes[1];
  headerRow.childNodes[col].style.display = status;
}

function togglePizzaColumn(col, status) {
  elements.allShownPizza = document.querySelectorAll(".pizza");
  elements.allShownPizza.forEach((pizza) => {
    pizza.childNodes[col].style.display = status;
  });
}

function toggleAddColumn(col, status) {
  let tableContent = elements.table.childNodes[3];
  let tableRowCount = tableContent.childNodes.length;
  tableContent.childNodes[tableRowCount - 2].childNodes[col].style.display =
    status;
}

//when refresh displayed pizza, all hidden cell will be shown
//This function used to prevent that
function keepCellHidden() {
  elements.checkboxPrice.classList.contains("checked")
    ? toggleColumns(11, 13, 5, 6, "table-cell")
    : toggleColumns(11, 13, 5, 6, "none");

  elements.checkboxCrust.classList.contains("checked")
    ? toggleColumns(7, 9, 3, 4, "table-cell")
    : toggleColumns(7, 9, 3, 4, "none");
}
//#endregion

function addNewPizza() {
  let newPizza = new Pizza(10, 1, 10);
  allPizza.push(newPizza);
  refreshDisplayedPizza();
  diameterEvent();
  quantityEvent();
  priceEvent();
}

function deleteEvent() {
  elements.allDelete = document.querySelectorAll(".deleteButton");
  elements.allDelete.forEach((deleteButton) => {
    deleteButton.onclick = () => deletePizza(deleteButton.dataset.id);
  });
}

function deletePizza(idToDelete) {
  allPizza.splice(idToDelete, 1);
  refreshDisplayedPizza();
  diameterEvent();
  quantityEvent();
  priceEvent();
}

function diameterEvent() {
  elements.allDiameter = document.querySelectorAll(".diameterInput");
  elements.allDiameter.forEach((diameterInput) => {
    diameterInput.oninput = () =>
      updateDiameter(diameterInput.value, diameterInput.dataset.id);
  });
}

function updateDiameter(newValue, id) {
  allPizza[id]._diameter = newValue;
  updateFixedValue(id);
}

function quantityEvent() {
  elements.allQuantity = document.querySelectorAll(".quantityInput");
  elements.allQuantity.forEach((quantityInput) => {
    quantityInput.oninput = () =>
      updateQuantity(quantityInput.value, quantityInput.dataset.id);
  });
}

function updateQuantity(newValue, id) {
  allPizza[id]._quantity = newValue;
  updateFixedValue(id);
}

function priceEvent() {
  elements.allPrice = document.querySelectorAll(".priceInput");
  elements.allPrice.forEach((priceInput) => {
    priceInput.oninput = () =>
      updatePrice(priceInput.value, priceInput.dataset.id);
  });
}

function updatePrice(newValue, id) {
  allPizza[id]._price = newValue;
  updateFixedValue(id);
}

//fixedValue: area, crust, area-crust, price/in
function updateFixedValue(id) {
  let allShownPizza = document.querySelectorAll(".pizza");
  allShownPizza[id].childNodes[2].innerText = allPizza[id].countArea();
  allShownPizza[id].childNodes[3].innerText = allPizza[id].countCrust();
  allShownPizza[id].childNodes[4].innerText = allPizza[id].countAreaMinCrust();
  allShownPizza[id].childNodes[6].innerText =
    allPizza[id].countPricePerSquareInch();
}

function addDisplayedPizza(pizza, i) {
  let tr = document.createElement("tr");
  let td = document.createElement("td");
  let input = document.createElement("input");
  let deleteButton = document.createElement("button");
  //diameter
  td = document.createElement("td");
  input = document.createElement("input");
  input.value = pizza._diameter;
  input.setAttribute("type", "number");
  input.classList.add("diameterInput");
  input.setAttribute("data-id", i);
  input.min = "1";
  input.max = "99";
  td.appendChild(input);
  tr.appendChild(td);
  //qty
  td = document.createElement("td");
  input = document.createElement("input");
  input.value = pizza._quantity;
  input.setAttribute("type", "number");
  input.classList.add("quantityInput");
  input.setAttribute("data-id", i);
  input.min = "1";
  input.max = "99";
  td.appendChild(input);
  tr.appendChild(td);
  //area
  td = document.createElement("td");
  td.innerText = pizza.countArea();
  tr.appendChild(td);
  //crust
  td = document.createElement("td");
  td.innerText = pizza.countCrust();
  tr.appendChild(td);
  //area-crust
  td = document.createElement("td");
  td.innerText = pizza.countAreaMinCrust();
  tr.appendChild(td);
  //price
  td = document.createElement("td");
  input = document.createElement("input");
  input.value = pizza._price;
  input.setAttribute("type", "number");
  input.classList.add("priceInput");
  input.setAttribute("data-id", i);
  input.min = "1";
  input.max = "999";
  input.classList.add("priceInput");
  td.appendChild(input);
  tr.appendChild(td);
  //price/in
  td = document.createElement("td");
  td.innerText = pizza.countPricePerSquareInch();
  tr.appendChild(td);
  //option
  td = document.createElement("td");
  deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("deleteButton");
  deleteButton.setAttribute("data-id", i);
  td.appendChild(deleteButton);
  tr.classList.add("pizza");
  tr.appendChild(td);

  elements.pizzaList.insertBefore(tr, elements.addRow);
}

function removeAllShownPizza() {
  let allShownPizza = document.querySelectorAll(".pizza");
  allShownPizza.forEach((pizza) => {
    pizza.remove();
  });
}

function refreshDisplayedPizza() {
  removeAllShownPizza();
  for (let i = 0; i < allPizza.length; i++) {
    addDisplayedPizza(allPizza[i], i);
  }
  deleteEvent();
  keepCellHidden();
}

function showPopularPizza(p1, p2) {
  allPizza = [];
  let pizza1 = new Pizza(p1[0], p1[1], p1[2]);
  allPizza.push(pizza1);
  let pizza2 = new Pizza(p2[0], p2[1], p2[2]);
  allPizza.push(pizza2);
  refreshAll();
}

function refreshAll() {
  refreshDisplayedPizza();
  deleteEvent();
  diameterEvent();
  quantityEvent();
  priceEvent();
  generalEvent();
}

let allPizza = [];

//fill table with sample data
let pizza4 = new Pizza(6, 1, 6);
allPizza.push(pizza4);
let pizza3 = new Pizza(8, 1, 8);
allPizza.push(pizza3);
let pizza2 = new Pizza(10, 1, 10);
allPizza.push(pizza2);

refreshAll();
