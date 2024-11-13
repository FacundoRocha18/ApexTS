import { autoInjectable } from "tsyringe";
import { ProductsRepository } from "./products-repository";
import { CreateProduct, IProduct } from "./products-types";

@autoInjectable()
export class ProductsService {
  constructor(private readonly repository: ProductsRepository) {}

  public findAll = (): IProduct[] => {
    return this.repository.findAll();
  };

  public findByCategory = (category: string): IProduct[] => {
    return this.repository.findByCategory(category);
  };

  public findById = (id: string): IProduct | undefined => {
    return this.repository.findById(id);
  };

  public create = (product: CreateProduct): IProduct => {
    return this.repository.create(product);
  };
}
