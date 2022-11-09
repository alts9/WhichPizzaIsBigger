const elements = (() => {
    const pizzaList = document.querySelector('.pizzaList');
    return {
        pizzaList, 
    };
})();

class Pizza{
    constructor(diameter, quantity, price) {
        this.diameter = diameter;
        this.quantity = quantity;
        this.price = price;
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

let pizza1 = new Pizza(10, 1, 10)
console.log("diameter: " + pizza1._diameter)
console.log("qty: " + pizza1._quantity)
console.log("area: " + pizza1.countArea())
console.log("crust: " + pizza1.countCrust())
console.log("area-crust: " + pizza1.countAreaMinCrust())
console.log("price: " + pizza1._price)
console.log("$/sqin: " + pizza1.countPricePerSquareInch())

let tr = document.createElement('tr');
//diameter
let td = document.createElement('td');
td.innerText = pizza1._diameter
tr.appendChild(td);
//qty
td = document.createElement('td');
td.innerText = pizza1._quantity
tr.appendChild(td);
//area
td = document.createElement('td');
td.innerText = pizza1.countArea()
tr.appendChild(td);
//crust
td = document.createElement('td');
td.innerText = pizza1.countCrust()
tr.appendChild(td);
//area-crust
td = document.createElement('td');
td.innerText = pizza1.countAreaMinCrust()
tr.appendChild(td);
//price
td = document.createElement('td');
td.innerText = pizza1._price
tr.appendChild(td);
//price/in
td = document.createElement('td');
td.innerText = pizza1.countPricePerSquareInch()
tr.appendChild(td);
//option
td = document.createElement('td');
td.innerText = "12345"
tr.appendChild(td);

elements.pizzaList.appendChild(tr);