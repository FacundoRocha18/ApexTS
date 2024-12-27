import { Module } from '@modules';
import { Product } from 'examples/products/product';
import { router as productsRouter } from 'examples/products/products-routes';
import { ProductsService } from 'examples/products/products-service';

export const ProductsModule: Module = {
	entities: [Product],
	routers: [productsRouter],
	providers: [ProductsService],
}