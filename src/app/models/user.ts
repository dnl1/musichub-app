export class User {
  id: number;
  name: string;
  email: string;
  birth_date: string;
  password: string;
  confirmation_password: string;

  /**
   *
   */
  constructor(pop: boolean = true) {
    this.email = '';
    this.password = '';
    this.confirmation_password = '';
    this.name = '';
    this.birth_date = '';

    if (pop) {
      this.pop();
    }
  }

  public save() {
    var json = JSON.stringify(this);
    localStorage.setItem('user', json);
  }

  public pop() {
    var json = localStorage.getItem('user');
    var data = JSON.parse(json);

    if (data != null) {
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.birth_date = data.birth_date;
      this.confirmation_password = data.confirmation_password;
    }
  }
}