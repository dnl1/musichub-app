import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { User } from '../../app/models/user';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user : User = new User();
  
  constructor(public nav: NavController, public navParams: NavParams, private auth: AuthService) {
  }

  public createAccount() {
    this.nav.push(RegisterPage);
  }

  public login(){
    this.auth.login(this.user).subscribe(allowed => {
      if(allowed)
      {
        this.nav.push(TabsPage);
      }
    });
  }
}
