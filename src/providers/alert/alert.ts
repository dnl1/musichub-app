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

  constructor(private alertCtrl : AlertController, private loadingCtrl : LoadingController) {}

  public showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  public hideLoading() {
    this.loading.dismiss();
  }
 
  public showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Ops',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
