export class User {
    name: string;
    email: string;
    birth_date: string;
    password: string;
  
    constructor(name: string, email: string) {
      this.name = name;
      this.email = email;
    }
}