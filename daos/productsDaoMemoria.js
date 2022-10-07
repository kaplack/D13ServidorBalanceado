import ProductsTest from "../classes/products-test.js";
import { faker } from "@faker-js/faker";

class ApiProducts extends ProductsTest {
  constructor() {
    super();
  }

  populate(cant = 5) {
    const news = [];
    for (let i = 0; i < cant; i++) {
      const newUser = this.generateProducts();
      const saved = this.save(newUser);
      news.push(saved);
    }

    return news;
  }

  generateProducts() {
    return {
      name: faker.commerce.productName(),
      precio: faker.commerce.price(100, 300),
      thumbnail: faker.image.business(640, 480, true),
    };
  }
}

export default ApiProducts;
