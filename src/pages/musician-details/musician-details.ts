import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiConsume } from '../../providers/api-consume/api-consume';
import { User } from '../../app/models/user';

/**
 * Generated class for the MusicianDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-musician-details',
  templateUrl: 'musician-details.html',
})
export class MusicianDetailsPage {
  user : User = new User(false);
  rate : number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiConsume : ApiConsume) {
    let id = this.navParams.get('musicianId');

    this.apiConsume.get(`musician/${id}`, {}, (data : User) => {
      this.user = data;
    }, null, false);

    this.apiConsume.get(`ratemusician/${id}`, {}, (data : any) => {
      if(data && data.rate_value) {
        this.rate = data.rate_value;
      }
    }, null, false);
  }

  onRating(ev : any) {
    this.apiConsume.post('ratemusician', { musician_target_id: this.user.id, rate_value: ev }, (data) => {
      console.log('data',data);
    }, null, false);
  }
}
