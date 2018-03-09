import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../app/models/user';
import { ApiConsume } from '../../providers/api-consume/api-consume';
import { Alert } from '../../providers/alert/alert'
import { Inject } from '@angular/core';

/**;;
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user : User = new User();

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiConsume: ApiConsume, @Inject(Alert) private alert : Alert) {
    console.log('user', this.user);
  }

  public redirectLogin(){
    this.navCtrl.push('LoginPage');
  }

  /**
   * createAccount
   */
  public createAccount() {
    this.apiConsume.post('musician', this.user, (data: any):void => {
      this.alert.showSuccess('Cadastrado com sucesso!!', [
        {
          text: 'OK',
          role: 'OK',
          handler: () => {
            this.navCtrl.push('LoginPage');
          }
        }
      ]);
    }, undefined)
  }
}
