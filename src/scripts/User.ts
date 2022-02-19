const CACHE = new Map();

const getUserById = (id: number): Promise<User> =>
  new Promise((resolve) => {
    const users = [
      {
        id: 1,
        firstname: "Giorgi",
        lastname: "Bazerashvili",
        age: 26,
        isActive: true,
      },
      {
        id: 2,
        firstname: "Giorgi",
        lastname: "Bazerashvili",
        age: 27,
        isActive: false,
      },
      {
        id: 3,
        firstname: "Giorgi",
        lastname: "Bazerashvili",
        age: 28,
        isActive: true,
      },
    ];
    const user = users.find((u) => u.id == id);
    if (user)
      setTimeout(() => {
        resolve(user);
      }, 3000);
  });
export interface User {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  isActive: boolean;
}

export class UsersService {
  @memo(1)
  getUserById(id: number): Promise<User> {
    return getUserById(id);
  }
}

function memo(value: number) {
  return function (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;

    descriptor.value = async function (id: number) {
      const milliseconds = value * 60000; //get milliseconds
      if (!CACHE.has(id)) {
        const result = await original.call(this, id);
        CACHE.set(id, result);
        console.log(`${id} added to cache`);
        setTimeout(() => {
          CACHE.delete(id);
          console.log("`${id} deleted from cache`");
          console.log(CACHE);
        }, milliseconds);
        console.log("got from users array");
        return result;
      } else {
        console.log("got from cache");
        return CACHE.get(id);
      }
    };
    return descriptor;
  };
}
