import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Loading } from 'ionic-angular';

/*
  Generated class for the AlertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Alert {
  loading: Loading;
  buttonsDefault: ['OK'];

  constructor(private alertCtrl : AlertController, private loadingCtrl : LoadingController) {}

  public showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading...',
      dismissOnPageChange: true
    });

    this.loading.present();
  }

  public hideLoading() {
    this.loading.dismiss();
  }
 
  public showError(text, buttons : any = ['OK']) {
    this.showAlert('Ops', text, buttons);
  }

  public showSuccess(text, buttons : any = ['OK']) {
    this.showAlert('Success :)', text, buttons);
  }

  private showAlert(title, text, buttons) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: buttons
    });
    alert.present();
  }
}
