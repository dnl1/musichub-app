import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiConsume } from "../../providers/api-consume/api-consume";
import { User } from '../../app/models/user';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user:User = new User();

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiConsume: ApiConsume) {
  }

  public put(){
    this.apiConsume.put(`musician/${this.user.id}`, this.user, (data) => {
      console.log('data', data);
    }, null);
  }

}
