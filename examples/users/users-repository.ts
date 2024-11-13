import { CreateUser, IUser, PublicUser } from './types';

export class UsersRepository {
	private users: IUser[] = [
		{
			id: "1",
			name: "John Doe",
			email: "",
			password: "",
		},
		{
			id: "2",
			name: "Jane Doe",
			email: "",
			password: "",
		}
	];

	public findAll = (): PublicUser[] => {
		return this.users;
	}

	public findById = (id: string): PublicUser | undefined => {
		const foundUser = this.users.find((user) => user.id === id);

		if (!foundUser) {
			return undefined;
		}

		return {
			id: foundUser.id,
			name: foundUser.name,
			email: foundUser.email,
		};
	}

	public create = (user: CreateUser): PublicUser => {
		const id: string = (this.users.length + 1).toString();

		this.users.push({
			id: id,
			...user,
		});

		return this.findById(id) as PublicUser;
	}
}