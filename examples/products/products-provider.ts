interface IProduct {
  id: string;
  name: string;
  price: number;
  category: string;
}

const products: IProduct[] = [
  {
    id: "1",
    name: "Product 1",
    price: 100,
    category: "Laptops",
  },
  {
    id: "2",
    name: "Product 2",
    price: 200,
    category: "Laptops",
  },
  {
    id: "3",
    name: "Product 3",
    price: 300,
    category: "Phones",
  },
];

export const getProductsService = (): IProduct[] => {
  return products;
};

export const getProductsByCategoryService = (category: string): IProduct[] => {
  return products.filter((product) => product.category === category);
};
