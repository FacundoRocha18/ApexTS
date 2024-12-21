import { autoInjectable, InjectRepository, Repository } from "@apex.ts";
import { CreateProduct, IProduct } from "./types";
import { Product } from "./product";
import { UUID } from "crypto";

@autoInjectable()
export class ProductsService {
  @InjectRepository(Product) private readonly repository: Repository<Product>;

  public listAll = async (): Promise<IProduct[]> => {
    return await this.repository.find();
  };

  public listByCategory = async (category: string): Promise<IProduct[]> => {
    return await this.repository.findBy({ category });
  };

  public findById = async (id: UUID): Promise<Product | null> => {
    return await this.repository.findOneBy({ id });
  };

  public create = async (product: CreateProduct): Promise<IProduct> => {
    const newProduct = this.repository.create(product);
    const savedProduct = await this.repository.save(newProduct, {});

    if (!savedProduct) {
      throw new Error("Failed to create new product");
    }

    console.log(savedProduct);

    return savedProduct;
  };
}
