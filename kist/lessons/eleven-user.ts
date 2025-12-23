interface User {
  username: string;
  email: string;
  age?: number;
}

function printUser(user: User): void {
  console.log(`Username: ${user.username}`);
  console.log(`Email: ${user.email}`);

  if (user.age !== undefined) {
    console.log(`Age: ${user.age}`);
  }
}

const u1: User = { username: "alice", email: "alice@example.com", age: 25 };
const u2: User = { username: "bob", email: "bob@example.com" };

printUser(u1);
printUser(u2);