import { IUser } from './user-entity';

type PublicUser = Omit<IUser, "password">;

type CreateUser = Omit<IUser, "id">;

export class UserService {
	constructor(private users: IUser[]) {}

	public findById = (id: string): PublicUser => {
		let foundUser: PublicUser | undefined;
	
		this.users.forEach((user) => {
			if (user.id === id) {
				foundUser = {
					id: user.id,
					name: user.name,
					email: user.email,
				};
			}
		});
	
		if (!foundUser) {
			throw new Error("User not found");
		}
	
		return foundUser;
	};

	public listAll = (): PublicUser[] => {
		return this.users.map((user) => {
			return {
				id: user.id,
				name: user.name,
				email: user.email,
			};
		});
	}

	public create = (userData: CreateUser) => {
		let id: string = (this.users.length + 1).toString();
	
		this.users.push({
			id: id,
			name: userData.name,
			email: userData.email,
			password: userData.password,
		});
	
		const createdUser = this.findById(id);
	
		return createdUser;
	};
}

