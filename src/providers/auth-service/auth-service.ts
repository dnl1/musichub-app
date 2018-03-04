import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { EnvVariables } from '../../app/enviroment-variables/environment-variables.token';
import { User } from '../../app/models/user'
import { ApiConsume } from '../api-consume/api-consume';
import { Alert } from '../../providers/alert/alert'

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class AuthService {
  /**
   *
   */
  constructor( @Inject(EnvVariables) public envVars, public apiConsume: ApiConsume, public alert: Alert) { }
  /**
   * login
   */
  public login(user: User) {
    return Observable.create(observer => {
      if (user.email === null || user.password === null) {
        return Observable.throw("Preencha o e-mail e a senha!");
      }
      else {
        localStorage.clear(); //FODASE
        this.apiConsume.post('login', { email: user.email, password: user.password }, (data: any): void => {
        console.log('data', data);
        let usuario: User = new User();
          usuario.name = data.name;
          usuario.email = data.email;
          usuario.birth_date = data.birth_date;
          usuario.id = data.id;

          usuario.save();

          observer.next(true);
          observer.complete();

        }, (error: any): void => {
          if (error.status == 401) {
            this.alert.showError('E-mail ou senha incorretos!');
            observer.next(false);
            observer.complete();
          }
        });
      }
    });
  }
}
