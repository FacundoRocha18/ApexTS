interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

type PublicUser = Omit<IUser, "password">;

type CreateUser = Omit<IUser, "id">;

const users: IUser[] = [
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
  },
  {
    id: "3",
    name: "John Smith",
    email: "",
    password: "",
  },
  {
    id: "4",
    name: "Jane Smith",
    email: "",
    password: "",
  },
];

export const getUserService = (id: string): PublicUser => {
  let foundUser: PublicUser | undefined;

  users.forEach((user) => {
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

export const createUserService = (user: CreateUser) => {
  let id: string = (users.length + 1).toString();

  users.push({
    id: id,
    name: user.name,
    email: user.email,
    password: user.password,
  });

  const createdUser = getUserService(id);

  return createdUser;
};
