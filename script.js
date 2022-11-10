const elements = (() => {
    const pizzaList = document.querySelector('.pizzaList');
    const addRow = document.querySelector('.addRow');
    let allDelete = document.querySelectorAll('.deleteButton');
    let allShownPizza = document.querySelectorAll('.pizza');
    return {
        pizzaList, addRow, allDelete, allShownPizza
    };
})();

function eventListener(){
    allDelete = document.querySelectorAll('.deleteButton');
    allDelete.forEach((deleteButton) => {
        deleteButton.onmousedown = () => deletePizza(deleteButton.dataset.id);
    });
}

function deletePizza(idToDelete){
    for (i=0; i<allPizza.length; i++){
        if (idToDelete == allPizza[i].id){
            allPizza.splice(i, 1);
        };
    }
    refreshDisplayedPizza();
}

let allPizza = [];
pizzaId = 0;

class Pizza{
    constructor(id, diameter, quantity, price) {
        this.id = id;
        this.diameter = diameter;
        this.quantity = quantity;
        this.price = price;
        pizzaId++;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
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
        return (3.14*(this._diameter/2)**2).toFixed(1);
    }

    countCrust() {
        return (this.countArea() - this.countAreaMinCrust()).toFixed(1);
    }

    countAreaMinCrust() {
        return (3.14*((this._diameter-1)/2)**2).toFixed(1);
    }

    countPricePerSquareInch() {
        return (pizza1._price/this.countArea()).toFixed(2);
    }
}

let pizza3 = new Pizza(pizzaId, 6, 1, 6)
allPizza.push(pizza3);
let pizza2 = new Pizza(pizzaId, 8, 1, 8)
allPizza.push(pizza2);
let pizza1 = new Pizza(pizzaId, 10, 1, 10)
allPizza.push(pizza1);
// console.log("id: " + pizza1._id)
// console.log("diameter: " + pizza1._diameter)
// console.log("qty: " + pizza1._quantity)
// console.log("area: " + pizza1.countArea())
// console.log("crust: " + pizza1.countCrust())
// console.log("area-crust: " + pizza1.countAreaMinCrust())
// console.log("price: " + pizza1._price)
// console.log("$/sqin: " + pizza1.countPricePerSquareInch())

function addDisplayedPizza(pizza)  {
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
        td.appendChild(input)
    tr.appendChild(td);
    //qty
    td = document.createElement('td');
        input = document.createElement('input');
        input.value = pizza._quantity;
        input.setAttribute("type", "number")
        input.classList.add('quantityInput');
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
        deleteButton.setAttribute("data-id", pizza._id)
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
        addDisplayedPizza(allPizza[i]);
    }
    eventListener()
}


refreshDisplayedPizza();
eventListener();