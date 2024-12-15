import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ICustomer } from './types';

@Entity({ name: 'customers' })
export class Customer implements ICustomer {
	@PrimaryGeneratedColumn()
	customer_id: number;

	@Column()
	customer_name: string;

	@Column()
	contact_name: string;

	@Column()
	address: string;

	@Column()
	city: string;

	@Column()
	postal_code: string;

	@Column()
	country: string;
}