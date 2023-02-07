class Pizza {
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
    return (3.14 * (this._diameter / 2) ** 2 * this._quantity).toFixed(0);
  }

  countCrust() {
    return (this.countArea() - this.countAreaMinCrust()).toFixed(0);
  }

  countAreaMinCrust() {
    return (3.14 * ((this._diameter - 1) / 2) ** 2 * this._quantity).toFixed(0);
  }

  countPricePerSquareInch() {
    return (this._price / this.countArea()).toFixed(2);
  }
}

export { Pizza };
