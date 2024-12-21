export interface ICustomer {
	id: number;
	name: string;
	email: string;
	password: string;
	address: string;
	city: string;
	postal_code: string;
	country: string;
}

export type CreateCustomer = Omit<ICustomer, "id">;

export type PublicCustomer = Pick<ICustomer, "id" | "name" | "email" | "country">;

export type FindParameters = {
	id?: number;
	email?: string;
};
