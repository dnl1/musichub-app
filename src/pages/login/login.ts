import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { User } from '../../app/models/user'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  envVariables: object;
  user : User = { email: '', password: '', birth_date: '', name: '' };
  
  constructor(public nav: NavController, public navParams: NavParams, private auth: AuthService, private alertCtrl : AlertController, private loadingCtrl : LoadingController) { }

  public register(){
    this.nav.push("RegisterPage");
  }

  public login(){
    this.showLoading();
    this.auth.login(this.user).subscribe(allowed => {

    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

}
