type User = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

function createOrUpdateUser(initialValues: Partial<User>): void {}

createOrUpdateUser({ email: "user@mail.com", password: "password123" });

export { createOrUpdateUser };
export type { User };
