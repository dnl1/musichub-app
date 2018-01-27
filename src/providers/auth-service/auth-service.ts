import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { EnvVariables } from '../../app/enviroment-variables/environment-variables.token';
import { User } from '../../app/models/user'
import { ApiConsume } from '../api-consume/api-consume';

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
  constructor( @Inject(EnvVariables) public envVars, public apiConsume: ApiConsume) { }
  /**
   * login
   */
  public login(user: User) {
    console.log(`user.email`, user.email);
    console.log(`user.password`, user.password);
    if (user.email === null || user.password === null) {
      return Observable.throw("Preencha o e-mail e a senha!");
    }
    else {
      this.apiConsume.post('login', { email: user.email, password: user.password }, (data: object): void => {
        console.log('data', data);
      }, (error: object): void => {
        console.log('error', error);
      });
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
}
