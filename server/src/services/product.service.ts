import { ProductRepository, Product } from '../repositories/product.repository';

export class ProductService {
  private repository = new ProductRepository();

  async getProducts() {
    return this.repository.findAll();
  }

  async createProduct(data: Product) {
    if (!data.name || data.name.trim() === '') {
      throw new Error('Product name is required');
    }
    return this.repository.create({
      name: data.name.trim(),
    });
  }
}
