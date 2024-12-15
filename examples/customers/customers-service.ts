import { autoInjectable, inject, DatabaseService } from "@apex.ts";
import { CreateCustomer, PublicCustomer } from "./types";
import { Customer } from './customer';

@autoInjectable()
export class CustomersService {
	constructor(
		@inject(DatabaseService) private database: DatabaseService
	) { }

	public findOneBy = async (id: number): Promise<PublicCustomer> => {
		const dataSource = this.database.getDataSource();
		const repository = dataSource.getRepository(Customer);

		const customer = await repository.findOneBy({ customer_id: id });

		if (!customer) {
			throw new Error("User not found");
		}

		const publicCustomer: PublicCustomer = {
			customer_id: customer.customer_id,
			customer_name: customer.customer_name,
			contact_name: customer.contact_name,
		};

		return publicCustomer;
	};

	public findAll = async (): Promise<PublicCustomer[]> => {
		const dataSource = this.database.getDataSource();
		const repository = dataSource.getRepository(Customer);

		const customers = await repository.find();

		if (!customers) {
			throw new Error("No customers found");
		}

		return customers.map((customer) => {
			return {
				customer_id: customer.customer_id,
				customer_name: customer.customer_name,
				contact_name: customer.contact_name,
			};
		});
	};

	public create = async (customerData: CreateCustomer): Promise<PublicCustomer> => {
		const dataSource = this.database.getDataSource();
		const repository = dataSource.getRepository(Customer);

		const newCustomer = repository.create(customerData);
		const savedCustomer = await repository.save(newCustomer);

		if (!savedCustomer) {
			throw new Error("Failed to create customer");
		}

		return savedCustomer;
	};
}
