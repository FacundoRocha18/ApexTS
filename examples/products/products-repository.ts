import { CreateProduct, IProduct } from "./products-types";

export class ProductsRepository {
  private products: IProduct[] = [
    {
      id: "1",
      name: "Product 1",
      price: 100,
      category: "laptops",
    },
    {
      id: "2",
      name: "Product 2",
      price: 200,
      category: "laptops",
    },
  ];

  public findAll = (): IProduct[] => {
    return this.products;
  };

  public findByCategory = (category: string): IProduct[] => {
    return this.products.filter((product) => product.category === category.toLowerCase());
  };

  public findById = (id: string): IProduct | undefined => {
    return this.products.find((product) => product.id === id);
  };

  public create = (product: CreateProduct): IProduct => {
    const id: string = (this.products.length + 1).toString();
    const productToCreate: IProduct = {
      id: id,
      ...product,
    };

    this.products.push(productToCreate);

    return productToCreate;
  };
}
