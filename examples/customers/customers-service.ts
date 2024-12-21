import { Repository, autoInjectable, InjectRepository } from "@apex.ts";
import { CreateCustomer, FindParameters, PublicCustomer } from "./types";
import { Customer } from './customer';

@autoInjectable()
export class CustomersService {
	@InjectRepository(Customer) private repository: Repository<Customer>;

	public findOneBy = async (parameters: FindParameters): Promise<PublicCustomer> => {
		const customer = await this.repository.findOneBy(parameters);

		if (!customer) {
			throw new Error("User not found");
		}

		const publicCustomer: PublicCustomer = {
			id: customer.id,
			name: customer.name,
			email: customer.email,
			country: customer.country,
		};

		return publicCustomer;
	};

	public findAll = async (): Promise<PublicCustomer[]> => {
		const customers = await this.repository.find();

		if (!customers) {
			throw new Error("No customers found");
		}

		return customers.map((customer) => {
			return {
				id: customer.id,
				name: customer.name,
				email: customer.email,
				country: customer.country,
			};
		});
	};

	public create = async (customerData: CreateCustomer): Promise<PublicCustomer> => {
		const newCustomer = this.repository.create(customerData);
		const savedCustomer = await this.repository.save(newCustomer, {});

		if (!savedCustomer) {
			throw new Error("Failed to create customer");
		}

		return {
			id: savedCustomer.id,
			name: savedCustomer.name,
			email: savedCustomer.email,
			country: savedCustomer.country,
		};
	};

	public delete = async (id: number): Promise<void> => {
		const customer = await this.repository.findOneBy({ id });

		if (!customer) {
			throw new Error("Customer not found");
		}

		const deleteResult = await this.repository.softDelete({ id: customer.id });

		if (!deleteResult.affected) {
			throw new Error("Failed to delete customer");
		};
	};
}
