export interface ICustomer {
	customer_id: number;
	customer_name: string;
	contact_name: string;
	address: string;
	city: string;
	postal_code: string;
	country: string;
}

export type CreateCustomer = Omit<ICustomer, "id">;

export type PublicCustomer = Omit<ICustomer, "address" | "city" | "postal_code" | "country">;
