import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../app/models/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user : User;
  constructor(public navCtrl: NavController) {
    this.user = new User();
    this.user.pop();
  }

}
