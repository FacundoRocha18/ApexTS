export interface IProduct {
  id: string;
  name: string;
  price: number;
  category: string;
}

export type CreateProduct = Omit<IProduct, "id">;
