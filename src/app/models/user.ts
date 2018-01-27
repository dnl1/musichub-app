export class User {
  id: number;
  name: string;
  email: string;
  birth_date: string;
  password: string;

  /**
   *
   */
  constructor() {
    this.email = '';
    this.password = '';
  }

  public save() {
    var json = JSON.stringify(this);
    localStorage.setItem('user', json);
  }

  public pop() {
    var json = localStorage.getItem('user');
    var data = JSON.parse('user');

    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.birth_date = data.birth_date;
  }
}