const elements = (() => {
    const pizzaList = document.querySelector('.pizzaList');
    const addRow = document.querySelector('.addRow');
    const addButton = document.querySelector('.addButton');
    const checkboxCrust = document.getElementById('checkboxCrust');
    const checkboxPrice = document.getElementById('checkboxPrice');
    const popular1 = document.getElementById('popular1');
    const popular2 = document.getElementById('popular2');
    const popular3 = document.getElementById('popular3');
    const popular4 = document.getElementById('popular4');
    const popular5 = document.getElementById('popular5');
    const table = document.querySelector('table')
    let allDelete = document.querySelectorAll('.deleteButton');
    let allShownPizza = document.querySelectorAll('.pizza');
    let allDiameter = document.querySelectorAll('.diameterInput');
    let allQuantity = document.querySelectorAll('.quantityInput');
    let allPrice = document.querySelectorAll('.priceInput');
    return {
        pizzaList, addRow, allDelete, allShownPizza, allDiameter, allQuantity,
        allPrice, addButton, checkboxCrust, checkboxPrice, table,
        popular1, popular2, popular3, popular4, popular5
    };
})();

function generalEvent(){
    elements.addButton.onmousedown = () => addNewPizza();
    elements.checkboxCrust.oninput = () => toggleCrust(checkboxCrust);
    elements.checkboxPrice.oninput = () => togglePrice(checkboxPrice);
    elements.popular1.onmousedown = () => popular1();
    elements.popular2.onmousedown = () => popular2();
    elements.popular3.onmousedown = () => popular3();
    elements.popular4.onmousedown = () => popular4();
    elements.popular5.onmousedown = () => popular5();
}

function togglePrice(checkboxPrice){
    elements.allShownPizza = document.querySelectorAll('.pizza');
    let nextStatus = 'none';
    if(checkboxPrice.checked === true){
        nextStatus = 'table-cell'
    }
    function toggle(nextStatus){
        elements.table.childNodes[1].childNodes[1].childNodes[11].style.display = nextStatus;
        elements.table.childNodes[1].childNodes[1].childNodes[13].style.display = nextStatus;
        elements.allShownPizza.forEach((pizza) => {
            pizza.childNodes[5].style.display = nextStatus;
            pizza.childNodes[6].style.display = nextStatus;
        });
        let i = elements.table.childNodes[3].childNodes.length;
        elements.table.childNodes[3].childNodes[i-2].childNodes[11].style.display = nextStatus;
        elements.table.childNodes[3].childNodes[i-2].childNodes[13].style.display = nextStatus;
    };
    toggle(nextStatus);
}

function toggleCrust(checkboxCrust){
    elements.allShownPizza = document.querySelectorAll('.pizza');
    let nextStatus = 'none';
    if(checkboxCrust.checked === true){
        nextStatus = 'table-cell'
    }
    function toggle(nextStatus){
        elements.table.childNodes[1].childNodes[1].childNodes[7].style.display = nextStatus;
        elements.table.childNodes[1].childNodes[1].childNodes[9].style.display = nextStatus;
        elements.allShownPizza.forEach((pizza) => {
            pizza.childNodes[3].style.display = nextStatus;
            pizza.childNodes[4].style.display = nextStatus;
        });
        let i = elements.table.childNodes[3].childNodes.length;
        elements.table.childNodes[3].childNodes[i-2].childNodes[7].style.display = nextStatus;
        elements.table.childNodes[3].childNodes[i-2].childNodes[9].style.display = nextStatus;
    };
    toggle(nextStatus);
}

function addNewPizza(){
    let newPizza = new Pizza(10, 1, 10)
    allPizza.push(newPizza);
    refreshDisplayedPizza();
    diameterEvent();
    quantityEvent();
    priceEvent();
}

function deleteEvent(){
    allDelete = document.querySelectorAll('.deleteButton');
    allDelete.forEach((deleteButton) => {
        deleteButton.onmousedown = () => deletePizza(deleteButton.dataset.id);
    });
}

function deletePizza(idToDelete){
    allPizza.splice(idToDelete, 1);
    refreshDisplayedPizza();
    diameterEvent();
    quantityEvent();
    priceEvent();
}

function diameterEvent(){
    allDiameter = document.querySelectorAll('.diameterInput');
    allDiameter.forEach((diameterInput) => {
        diameterInput.oninput = () => updateDiameter(diameterInput.value, diameterInput.dataset.id);
    });
}

function updateDiameter(newValue, id){
    allPizza[id]._diameter = newValue;
    updateFixedValue(id)
}

function quantityEvent(){
    allQuantity = document.querySelectorAll('.quantityInput');
    allQuantity.forEach((quantityInput) => {
        quantityInput.oninput = () => updateQuantity(quantityInput.value, quantityInput.dataset.id);
    });
}

function updateQuantity(newValue, id){
    allPizza[id]._quantity = newValue;
    updateFixedValue(id);
}

function priceEvent(){
    allPrice = document.querySelectorAll('.priceInput');
    allPrice.forEach((priceInput) => {
        priceInput.oninput = () => updatePrice(priceInput.value, priceInput.dataset.id);
    });
}

function updatePrice(newValue, id){
    allPizza[id]._price = newValue;
    updateFixedValue(id);
}



//fixedValue: area, crust, area-crust, price/in
function updateFixedValue(id){
    allShownPizza = document.querySelectorAll('.pizza');
    allShownPizza[id].childNodes[2].innerText = allPizza[id].countArea();
    allShownPizza[id].childNodes[3].innerText = allPizza[id].countCrust();
    allShownPizza[id].childNodes[4].innerText = allPizza[id].countAreaMinCrust();
    allShownPizza[id].childNodes[6].innerText = allPizza[id].countPricePerSquareInch();
}



function updateIndex(){
    for (i=0; i<allPizza.length; i++){
        allPizza[i]._id = i;
    }
}

let allPizza = [];
pizzaId = 0;

class Pizza{
    constructor(diameter, quantity, price) {
        this.diameter = diameter;
        this.quantity = quantity;
        this.price = price;
        pizzaId++;
    }

    get diameter() {
        return this._diameter;
    }

    set diameter(value) {
        this._diameter = value;
    }

    get quantity() {
        return this._quantity;
    }

    set quantity(value) {
        this._quantity = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    countArea() {
        return ((3.14*(this._diameter/2)**2)*this._quantity).toFixed(0);
    }

    countCrust() {
        return (this.countArea() - this.countAreaMinCrust()).toFixed(0);
    }

    countAreaMinCrust() {
        return ((3.14*((this._diameter-1)/2)**2)*this._quantity).toFixed(0);
    }

    countPricePerSquareInch() {
        return (this._price/this.countArea()*this._quantity).toFixed(2);
    }
}

let pizza4 = new Pizza(6, 1, 6)
allPizza.push(pizza4);
let pizza3 = new Pizza(8, 1, 8)
allPizza.push(pizza3);
let pizza2 = new Pizza(10, 1, 10)
allPizza.push(pizza2);
let pizza1 = new Pizza(12, 1, 12)
allPizza.push(pizza1);

function addDisplayedPizza(pizza, i)  {
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    let input = document.createElement('input');
    let deleteButton = document.createElement('button');
    //diameter
    td = document.createElement('td');
        input = document.createElement('input');
        input.value = pizza._diameter;
        input.setAttribute("type", "number")
        input.classList.add('diameterInput');
        input.setAttribute("data-id", i)
        td.appendChild(input)
    tr.appendChild(td);
    //qty
    td = document.createElement('td');
        input = document.createElement('input');
        input.value = pizza._quantity;
        input.setAttribute("type", "number")
        input.classList.add('quantityInput');
        input.setAttribute("data-id", i)
        td.appendChild(input)
    tr.appendChild(td);
    //area
    td = document.createElement('td');
    td.innerText = pizza.countArea()
    tr.appendChild(td);
    //crust
    td = document.createElement('td');
    td.innerText = pizza.countCrust()
    tr.appendChild(td);
    //area-crust
    td = document.createElement('td');
    td.innerText = pizza.countAreaMinCrust()
    tr.appendChild(td);
    //price
    td = document.createElement('td');
        input = document.createElement('input');
        input.value = pizza._price;
        input.setAttribute("type", "number")
        input.classList.add('priceInput');
        input.setAttribute("data-id", i)
        td.appendChild(input)
    tr.appendChild(td);
    //price/in
    td = document.createElement('td');
    td.innerText = pizza.countPricePerSquareInch()
    tr.appendChild(td);
    //option
    td = document.createElement('td');
        deleteButton = document.createElement('button');
        deleteButton.innerText = "Delete"
        deleteButton.classList.add("deleteButton");
        deleteButton.setAttribute("data-id", i)
        td.appendChild(deleteButton);
    tr.classList.add('pizza')
    tr.appendChild(td);

    elements.pizzaList.insertBefore(tr, elements.addRow);
};

function removeAllShownPizza(){
    allShownPizza = document.querySelectorAll('.pizza');
    allShownPizza.forEach((pizza) => {
        pizza.remove();
    });
}

function refreshDisplayedPizza(){
    removeAllShownPizza();
    for (i=0; i<allPizza.length; i++){
        addDisplayedPizza(allPizza[i], i);
    }
    deleteEvent()
}

function popular1(){
    allPizza = [];
    let pizza2 = new Pizza(12, 2, 0)
    allPizza.push(pizza2);
    let pizza1 = new Pizza(18, 1, 0)
    allPizza.push(pizza1);
    allrefresh();
}

function popular2(){
    allPizza = [];
    let pizza2 = new Pizza(16, 1, 0)
    allPizza.push(pizza2);
    let pizza1 = new Pizza(18, 1, 0)
    allPizza.push(pizza1);
    allrefresh();
}

function popular3(){
    allPizza = [];
    let pizza2 = new Pizza(12, 2, 0)
    allPizza.push(pizza2);
    let pizza1 = new Pizza(16, 1, 0)
    allPizza.push(pizza1);
    allrefresh();
}

function popular4(){
    allPizza = [];
    let pizza2 = new Pizza(8, 4, 0)
    allPizza.push(pizza2);
    let pizza1 = new Pizza(16, 1, 0)
    allPizza.push(pizza1);
    allrefresh();
}

function popular5(){
    allPizza = [];
    let pizza2 = new Pizza(8, 2, 0)
    allPizza.push(pizza2);
    let pizza1 = new Pizza(12, 1, 0)
    allPizza.push(pizza1);
    allrefresh();
}

function allrefresh(){
    refreshDisplayedPizza();
    deleteEvent();
    diameterEvent();
    quantityEvent();
    priceEvent();
    generalEvent();
}

allrefresh();