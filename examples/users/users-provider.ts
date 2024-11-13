import { autoInjectable } from 'tsyringe';
import { UsersRepository } from './users-repository';
import { CreateUser, PublicUser } from './types';

@autoInjectable()
export class UsersService {
	constructor(private repository: UsersRepository) {}

	public findById = (id: string): PublicUser => {
		let foundUser: PublicUser | undefined;
	
		const user = this.repository.findById(id);

		if (user) {
			foundUser = {
				id: user.id,
				name: user.name,
				email: user.email,
			};
		}
	
		if (!foundUser) {
			throw new Error("User not found");
		}
	
		return foundUser;
	};

	public findAll = (): PublicUser[] => {
		const users = this.repository.findAll();

		return users.map((user) => {
			return {
				id: user.id,
				name: user.name,
				email: user.email,
			};
		});
	}

	public create = (userData: CreateUser) => {
		const createdUser = this.repository.create({
			name: userData.name,
			email: userData.email,
			password: userData.password,
		});
	
		return createdUser;
	};
}

