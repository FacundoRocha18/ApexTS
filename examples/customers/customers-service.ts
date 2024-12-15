import { Repository, autoInjectable, InjectRepository } from "@apex.ts";
import { CreateCustomer, PublicCustomer } from "./types";
import { Customer } from './customer';

@autoInjectable()
export class CustomersService {
	@InjectRepository(Customer) private repository: Repository<Customer>;

	public findOneBy = async (id: number): Promise<PublicCustomer> => {
		const customer = await this.repository.findOneBy({ customer_id: id });

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
		const customers = await this.repository.find();

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
		const newCustomer = this.repository.create(customerData);
		const savedCustomer = await this.repository.save(newCustomer);

		if (!savedCustomer) {
			throw new Error("Failed to create customer");
		}

		return savedCustomer;
	};
}
