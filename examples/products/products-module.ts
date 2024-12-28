import { Module } from '@modules';
import { Product } from './product';
import { router as productsRouter } from './products-routes';
import { ProductsService } from './products-service';

export const ProductsModule: Module = {
	entities: [Product],
	routers: [productsRouter],
	providers: [ProductsService],
}