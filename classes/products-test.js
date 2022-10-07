class ProductsTest {
  constructor() {
    this.elements = [];
  }

  getAll() {
    return this.elements;
  }

  save(elem) {
    const length = this.elements.length;
    const newId = length == 0 ? 1 : this.elements[length - 1].id + 1;
    const newElem = { ...elem, id: newId };

    this.elements.push(newElem);
    return newElem;
  }
}

export default ProductsTest;
